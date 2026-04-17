import fs from "fs";

const backupPath = "c:\\Users\\erica\\Downloads\\memories-backup-2026-04-16 (2).json";

const backup = JSON.parse(fs.readFileSync(backupPath, "utf-8"));

const videos = [];
for (const item of backup) {
  if (item.kind === "video") {
    videos.push({
      slotIndex: item.slotIndex,
      filename: item.name
    });
  }
}

videos.sort((a, b) => a.slotIndex - b.slotIndex);

console.log("Videos in backup (in order):");
for (const v of videos) {
  console.log(`  Video ${v.slotIndex + 1}: ${v.filename}`);
}
