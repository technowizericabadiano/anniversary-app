import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSON_PATH = path.join(__dirname, "..", "public", "memories", "memories.json");

const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));

// Fix image labels to "Memory 1", "Memory 2", etc.
data.images = data.images.map((img, index) => ({
  filename: img.filename,
  label: `Memory ${index + 1}`
}));

// Fix video labels to "Video 1", "Video 2", etc.
data.videos = data.videos.map((vid, index) => ({
  filename: vid.filename,
  label: `Video ${index + 1}`
}));

fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2));

console.log(`✅ Updated ${data.images.length} images with labels: Memory 1 - Memory ${data.images.length}`);
console.log(`✅ Updated ${data.videos.length} videos with labels: Video 1 - Video ${data.videos.length}`);
