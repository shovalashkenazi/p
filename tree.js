// tree.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// רשימת תיקיות שנדלג עליהן
const EXCLUDED_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
]);

function printTree(dirPath, prefix = "") {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  items.forEach((item, index) => {
    if (EXCLUDED_DIRS.has(item.name)) return; // דילוג על תיקיות לא רלוונטיות

    const isLast = index === items.length - 1;
    const connector = isLast ? "└── " : "├── ";
    console.log(prefix + connector + item.name);

    if (item.isDirectory()) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      printTree(path.join(dirPath, item.name), newPrefix);
    }
  });
}

const targetDir = process.argv[2] || ".";
console.log(`\n📁 מבנה תיקיות: ${targetDir}\n`);
printTree(path.resolve(__dirname, targetDir));
