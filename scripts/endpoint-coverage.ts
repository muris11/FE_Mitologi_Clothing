import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BACKEND_DIR = path.resolve(__dirname, "../../backend");
const FRONTEND_DIR = path.resolve(__dirname, "../");

const API_ROUTES_FILE = path.join(BACKEND_DIR, "routes/api.php");
const ENDPOINTS_FILE = path.join(FRONTEND_DIR, "lib/api/endpoints.ts");

function extractBackendRoutes(): string[] {
  if (!fs.existsSync(API_ROUTES_FILE)) return [];
  const content = fs.readFileSync(API_ROUTES_FILE, "utf-8");

  // Basic regex to find Route::get('path', ...)
  const routeRegex = /Route::(get|post|put|patch|delete)\(\s*(['"])(.*?)\2/g;
  const routes = new Set<string>();

  let match;
  while ((match = routeRegex.exec(content)) !== null) {
    if (match[3]) {
      // Clean up parameter syntax {id} -> id
      let route = match[3].replace(/\{[^}]+\}/g, "*");
      if (!route.startsWith("/")) {
        route = "/" + route;
      }
      routes.add(route.toLowerCase());
    }
  }
  return Array.from(routes).sort();
}

function extractFrontendCoveredEndpoints(): string[] {
  if (!fs.existsSync(ENDPOINTS_FILE)) return [];
  const content = fs.readFileSync(ENDPOINTS_FILE, "utf-8");

  // Extract endpoint strings from map values
  const regex = /:\s*(?:(?:\([^)]*\)\s*=>\s*`([^`]+)`)|(?:['"]([^'"]+)['"]))/g;
  const routes = new Set<string>();

  let match;
  while ((match = regex.exec(content)) !== null) {
    let route = match[1] || match[2];
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

function scanForDirectFetches(dir: string, issues: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (file !== "node_modules" && file !== ".next") {
        scanForDirectFetches(fullPath, issues);
      }
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      const content = fs.readFileSync(fullPath, "utf-8");
      if (content.includes("fetch(") || content.includes("fetch (")) {
        // Ignore API wrapper logic files
        if (fullPath.includes("lib\\api") || fullPath.includes("lib/api")) {
          continue;
        }

        // Allow simple fetch if not pointing to our backend process.env.NEXT_PUBLIC_API_URL
        if (content.includes("process.env.NEXT_PUBLIC_API_URL")) {
          issues.push(
            `Direct backend fetch found: ${path.relative(FRONTEND_DIR, fullPath)}`,
          );
        }
      }
    }
  }
  return issues;
}

function main() {
  console.log("=== Endpoint Coverage Report ===");

  const backendRoutes = extractBackendRoutes();
  console.log(`\nFound ${backendRoutes.length} backend API routes.`);

  const coveredRoutes = extractFrontendCoveredEndpoints();
  console.log(`Found ${coveredRoutes.length} covered endpoint wrappers.`);

  // Matching - very simplified
  const coveredSet = new Set(coveredRoutes);
  const gaps = backendRoutes.filter((r) => {
    // Try to find a matching covered route (handle exact matches or * parameter wildcard)
    return !coveredSet.has(r);
  });

  console.log(
    `\n--- Coverage Gaps (Backend routes without direct literal wrapper matching) ---`,
  );
  if (gaps.length === 0) {
    console.log("✅ No gaps found or all routes covered.");
  } else {
    gaps.forEach((g) => console.log(`⚠️  ${g}`));
    console.log(
      `Note: Wildcard matching might not be 100% exact in this simple script.`,
    );
  }

  console.log(`\n--- Direct Fetch Violations ---`);
  const searchDirs = [
    path.join(FRONTEND_DIR, "app"),
    path.join(FRONTEND_DIR, "components"),
  ];
  const violations: string[] = [];

  searchDirs.forEach((dir) => {
    if (fs.existsSync(dir)) {
      scanForDirectFetches(dir, violations);
    }
  });

  if (violations.length === 0) {
    console.log("✅ Zero direct fetches found in UI components.");
  } else {
    violations.forEach((v) => console.log(`🚫 ${v}`));
  }

  console.log("\n================================");
}

main();
