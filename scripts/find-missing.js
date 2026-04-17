import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backupPath = "c:\\Users\\erica\\Downloads\\memories-backup-2026-04-16 (2).json";
const memoriesDir = path.join(__dirname, "..", "public", "memories");

const backup = JSON.parse(fs.readFileSync(backupPath, "utf-8"));

// Get all image filenames from backup (ordered by slotIndex)
const backupImages = [];
for (const item of backup) {
  if (item.kind === "image") {
    backupImages.push({
      slotIndex: item.slotIndex,
      filename: item.name
    });
  }
}
backupImages.sort((a, b) => a.slotIndex - b.slotIndex);

// Get current files
const currentFiles = fs.readdirSync(memoriesDir).filter(f => 
  f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png')
);

// Find missing
const missing = [];
for (const img of backupImages) {
  if (!currentFiles.includes(img.filename)) {
    missing.push({
      slotIndex: img.slotIndex,
      filename: img.filename,
      position: img.slotIndex + 1
    });
  }
}

console.log("✅ Found " + missing.length + " missing photos:\n");
for (const m of missing) {
  console.log("  Position " + m.position + " (Memory " + m.position + "): " + m.filename);
}

// Save missing list
const missingPath = path.join(__dirname, "..", "missing-photos.txt");
fs.writeFileSync(missingPath, missing.map(m => 
  "Memory " + m.position + " (slot " + m.slotIndex + "): " + m.filename
).join("\n"));
console.log("\n📝 Saved to missing-photos.txt");
