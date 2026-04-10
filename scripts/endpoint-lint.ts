const fs = require("fs");
const path = require("path");

const API_DIR = path.join(__dirname, "../lib/api");
const ENDPOINTS_FILE = path.join(API_DIR, "endpoints.ts");

let hasError = false;

console.log("🚀 Starting Endpoint Contract Linting...");

// Recursive directory traversal for TS files
function findTsFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findTsFiles(fullPath, fileList);
    } else if (fullPath.endsWith(".ts") && fullPath !== ENDPOINTS_FILE) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const tsFiles = findTsFiles(API_DIR);

for (const file of tsFiles) {
  const content = fs.readFileSync(file, "utf-8");

  // Deteksi literal path string yang diawali dengan /, seperti "/auth" "/profile"
  // Abaikan comment atau referensi lokal. Regex ini mencari string literal di dalam `apiFetch` (mencocokkan tanda kutip).
  const lines = content.split("\n");
  lines.forEach((line: string, index: number) => {
    // Pengecualian pada index.ts / import statement asli
    if (line.includes("import ") || line.includes("export ")) return;

    // Pattern: apiFetch<T>("/path" atau apiFetch("/path"
    const match = line.match(/apiFetch(?:<[^>]+>)?\s*\(\s*["'](\/[^"']+)["']/);

    if (match && match[1]) {
      console.error(`❌ [LITERAL PATH] ${path.basename(file)}:${index + 1}`);
      console.error(`   Found literal fetch path: ${match[1]}`);
      console.error(`   Please use ENDPOINTS constant instead.`);
      hasError = true;
    }
  });
}

if (hasError) {
  console.error("💥 Endpoint contract linting failed! Fix the errors above.");
  process.exit(1);
} else {
  console.log("✅ Endpoint contract linting passed! No literal paths found.");
  process.exit(0);
}
