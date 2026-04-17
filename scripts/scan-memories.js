import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MEMORIES_DIR = path.join(__dirname, "..", "public", "memories");
const JSON_PATH = path.join(MEMORIES_DIR, "memories.json");

const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
const videoExtensions = [".mp4", ".webm", ".mov"];

function isImage(filename) {
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
}

function isVideo(filename) {
  const ext = path.extname(filename).toLowerCase();
  return videoExtensions.includes(ext);
}

function generateLabel(filename, index, type) {
  // Remove extension and replace underscores/hyphens with spaces
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  const cleanName = nameWithoutExt.replace(/[_-]/g, " ");
  
  // Try to make it readable (capitalize first letter of each word)
  const readable = cleanName
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  
  // If it's still just a generic name like "IMG 1234" or "DSC 5678", use generic label
  if (/^(IMG|DSC|PXL|IMG_|DSC_|PXL_|PHOTO_|VID_)?\d+$/i.test(nameWithoutExt.replace(/\s/g, ""))) {
    return `${type} ${index + 1}`;
  }
  
  return readable || `${type} ${index + 1}`;
}

function scanMemories() {
  console.log("🔍 Scanning public/memories/ folder...\n");
  
  // Read existing JSON to preserve custom labels
  let existingData = { images: [], videos: [] };
  try {
    const existing = fs.readFileSync(JSON_PATH, "utf-8");
    existingData = JSON.parse(existing);
  } catch {
    // File doesn't exist or is invalid, start fresh
  }
  
  // Create a map of existing labels by filename
  const existingLabels = new Map();
  existingData.images?.forEach(img => existingLabels.set(img.filename, img.label));
  existingData.videos?.forEach(vid => existingLabels.set(vid.filename, vid.label));
  
  // Get all files in the memories folder
  let files;
  try {
    files = fs.readdirSync(MEMORIES_DIR).filter(f => {
      // Skip the JSON file and README
      if (f === "memories.json" || f === "README.txt") return false;
      // Skip hidden files
      if (f.startsWith(".")) return false;
      // Check if it's an image or video
      const ext = path.extname(f).toLowerCase();
      return imageExtensions.includes(ext) || videoExtensions.includes(ext);
    });
  } catch (error) {
    console.error("❌ Error reading memories folder:", error.message);
    console.log("   Make sure public/memories/ folder exists.");
    process.exit(1);
  }
  
  if (files.length === 0) {
    console.log("📁 No image or video files found in public/memories/");
    console.log("   Add some pictures first!\n");
    
    // Still write empty JSON
    const emptyData = { images: [], videos: [] };
    fs.writeFileSync(JSON_PATH, JSON.stringify(emptyData, null, 2));
    console.log("✅ Created empty memories.json");
    return;
  }
  
  // Sort files alphabetically
  files.sort();
  
  const images = [];
  const videos = [];
  
  files.forEach((filename, index) => {
    const isVid = isVideo(filename);
    const type = isVid ? "Video" : "Memory";
    const targetArray = isVid ? videos : images;
    
    // Use existing label if available, otherwise generate new one
    const label = existingLabels.get(filename) || generateLabel(filename, targetArray.length, type);
    
    targetArray.push({
      filename,
      label
    });
  });
  
  const data = { images, videos };
  
  // Write the JSON file
  fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2));
  
  // Print summary
  console.log(`📸 Images found: ${images.length}`);
  images.forEach(img => console.log(`   - ${img.filename} → "${img.label}"`));
  
  if (videos.length > 0) {
    console.log(`\n🎥 Videos found: ${videos.length}`);
    videos.forEach(vid => console.log(`   - ${vid.filename} → "${vid.label}"`));
  }
  
  console.log(`\n✅ Updated memories.json with ${images.length} images and ${videos.length} videos`);
  console.log("\n📝 You can edit the labels in memories.json if you want custom names");
}

scanMemories();
