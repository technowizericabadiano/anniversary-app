import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backupPath = "c:\\Users\\erica\\Downloads\\memories-backup-2026-04-16 (2).json";
const outputDir = path.join(__dirname, "..", "public", "memories");

const backup = JSON.parse(fs.readFileSync(backupPath, "utf-8"));

// Find the missing photo
const missingFilename = "9af49424-bc4b-499e-87f1-14f4e1c08b58.jpg";
const missingItem = backup.find(item => item.name === missingFilename);

if (!missingItem) {
  console.log("❌ Missing photo not found in backup");
  process.exit(1);
}

// Decode base64 and save
const base64Data = missingItem.blobBase64;
const buffer = Buffer.from(base64Data, 'base64');
const outputPath = path.join(outputDir, missingFilename);

fs.writeFileSync(outputPath, buffer);
console.log("✅ Extracted: " + missingFilename);
console.log("   Size: " + (buffer.length / 1024).toFixed(1) + " KB");
console.log("   Slot: " + missingItem.slotIndex + " (Memory " + (missingItem.slotIndex + 1) + ")");
