import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the backup file
const backupPath = "c:\\Users\\erica\\Downloads\\memories-backup-2026-04-16 (2).json";
const memoriesJsonPath = path.join(__dirname, "..", "public", "memories", "memories.json");

const backup = JSON.parse(fs.readFileSync(backupPath, "utf-8"));
const currentData = JSON.parse(fs.readFileSync(memoriesJsonPath, "utf-8"));

// Extract the original order from backup
const originalOrder = [];
for (const item of backup) {
  if (item.kind === "image") {
    originalOrder.push({
      slotIndex: item.slotIndex,
      filename: item.name,
      label: `Memory ${item.slotIndex + 1}`
    });
  }
}

// Sort by slotIndex
originalOrder.sort((a, b) => a.slotIndex - b.slotIndex);

// Create new images array in correct order
const orderedImages = [];
let memoryNum = 1;
for (const item of originalOrder) {
  // Check if file exists in current folder
  const exists = currentData.images.some(img => img.filename === item.filename);
  if (exists) {
    orderedImages.push({
      filename: item.filename,
      label: `Memory ${memoryNum++}`
    });
  }
}

// Update the JSON
currentData.images = orderedImages;

fs.writeFileSync(memoriesJsonPath, JSON.stringify(currentData, null, 2));

console.log(`✅ Restored original order: ${orderedImages.length} images`);
console.log("\nFirst 10 in order:");
for (let i = 0; i < Math.min(10, orderedImages.length); i++) {
  console.log(`  ${i+1}. ${orderedImages[i].filename}`);
}
