"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var BACKEND_DIR = path_1.default.resolve(__dirname, "../../backend");
var FRONTEND_DIR = path_1.default.resolve(__dirname, "../");
var API_ROUTES_FILE = path_1.default.join(BACKEND_DIR, "routes/api.php");
var ENDPOINTS_FILE = path_1.default.join(FRONTEND_DIR, "lib/api/endpoints.ts");
function extractBackendRoutes() {
  if (!fs_1.default.existsSync(API_ROUTES_FILE)) return [];
  var content = fs_1.default.readFileSync(API_ROUTES_FILE, "utf-8");
  // Basic regex to find Route::get('path', ...)
  var routeRegex = /Route::(get|post|put|patch|delete)\(\s*(['"])(.*?)\2/g;
  var routes = new Set();
  var match;
  while ((match = routeRegex.exec(content)) !== null) {
    if (match[3]) {
      // Clean up parameter syntax {id} -> id
      var route = match[3].replace(/\{[^}]+\}/g, "*");
      if (!route.startsWith("/")) {
        route = "/" + route;
      }
      routes.add(route.toLowerCase());
    }
  }
  return Array.from(routes).sort();
}
function extractFrontendCoveredEndpoints() {
  if (!fs_1.default.existsSync(ENDPOINTS_FILE)) return [];
  var content = fs_1.default.readFileSync(ENDPOINTS_FILE, "utf-8");
  // Extract endpoint strings from map values
  var regex = /:\s*(?:(?:\([^)]*\)\s*=>\s*`([^`]+)`)|(?:['"]([^'"]+)['"]))/g;
  var routes = new Set();
  var match;
  while ((match = regex.exec(content)) !== null) {
    var route = match[1] || match[2];
    if (route) {
      // Simplify `${id}` or id interpolation for comparison
      route = route.replace(/\$?\{[^}]+\}/g, "*");
      if (!route.startsWith("/")) {
        route = "/" + route;
      }
      routes.add(route.toLowerCase());
    }
  }
  return Array.from(routes).sort();
}
function scanForDirectFetches(dir, issues) {
  if (issues === void 0) {
    issues = [];
  }
  var files = fs_1.default.readdirSync(dir);
  for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
    var file = files_1[_i];
    var fullPath = path_1.default.join(dir, file);
    var stat = fs_1.default.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== "node_modules" && file !== ".next") {
        scanForDirectFetches(fullPath, issues);
      }
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      var content = fs_1.default.readFileSync(fullPath, "utf-8");
      if (content.includes("fetch(") || content.includes("fetch (")) {
        // Ignore API wrapper logic files
        if (fullPath.includes("lib\\api") || fullPath.includes("lib/api")) {
          continue;
        }
        // Allow simple fetch if not pointing to our backend process.env.NEXT_PUBLIC_API_URL
        if (content.includes("process.env.NEXT_PUBLIC_API_URL")) {
          issues.push(
            "Direct backend fetch found: ".concat(
              path_1.default.relative(FRONTEND_DIR, fullPath),
            ),
          );
        }
      }
    }
  }
  return issues;
}
function main() {
  console.log("=== Endpoint Coverage Report ===");
  var backendRoutes = extractBackendRoutes();
  console.log("\nFound ".concat(backendRoutes.length, " backend API routes."));
  var coveredRoutes = extractFrontendCoveredEndpoints();
  console.log(
    "Found ".concat(coveredRoutes.length, " covered endpoint wrappers."),
  );
  // Matching - very simplified
  var coveredSet = new Set(coveredRoutes);
  var gaps = backendRoutes.filter(function (r) {
    // Try to find a matching covered route (handle exact matches or * parameter wildcard)
    return !coveredSet.has(r);
  });
  console.log(
    "\n--- Coverage Gaps (Backend routes without direct literal wrapper matching) ---",
  );
  if (gaps.length === 0) {
    console.log("✅ No gaps found or all routes covered.");
  } else {
    gaps.forEach(function (g) {
      return console.log("\u26A0\uFE0F  ".concat(g));
    });
    console.log(
      "Note: Wildcard matching might not be 100% exact in this simple script.",
    );
  }
  console.log("\n--- Direct Fetch Violations ---");
  var searchDirs = [
    path_1.default.join(FRONTEND_DIR, "app"),
    path_1.default.join(FRONTEND_DIR, "components"),
  ];
  var violations = [];
  searchDirs.forEach(function (dir) {
    if (fs_1.default.existsSync(dir)) {
      scanForDirectFetches(dir, violations);
    }
  });
  if (violations.length === 0) {
    console.log("✅ Zero direct fetches found in UI components.");
  } else {
    violations.forEach(function (v) {
      return console.log("\uD83D\uDEAB ".concat(v));
    });
  }
  console.log("\n================================");
}
main();
