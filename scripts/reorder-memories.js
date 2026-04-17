import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSON_PATH = path.join(__dirname, "..", "public", "memories", "memories.json");

const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));

// Reorder images to match the original display order from screenshots
const correctOrder = [
  // Row 1 - Studio photos
  "854764b8-7be0-41d8-8cb3-407e4ad5c6af.jpg",     // 1. Studio - guy holding girl's face
  "3fcf15b2-2019-4d15-9f8c-c8717985d7b9.jpg",     // 2. Girl with rose
  "a066c043-9fbd-4249-9a12-9d1eb65569b9.jpg",     // 3. Couple formal standing
  "98197ce2-4449-4828-ab24-e05c8f75d069.jpg",     // 4. Couple hugging
  
  // Row 2
  "e54b2753-7f0b-401d-a251-8c581b1769ff.jpg",     // 5. Girl laughing phone
  "0ad16c43-b27d-4aef-85c7-a805d58d8963.jpg",     // 6. Girl looking up (partial)
  "a303db69-fa82-4091-b03b-6ca6d25615e4.jpg",     // 7. Couple sitting together
  "648134352_766733746239471_2623977501800547118_n.jpg", // 8. Mirror selfie
  
  // Continue with the rest based on screenshot 2 & 3...
  "0527f4bb-e765-4546-be90-2506be6828c0.jpg",     // Coffee drinks
  "01eecf5b-a009-4e54-a157-d17ea68a4b08.jpg",     // Dark photo
  "159b98c3-19fc-4aec-b4ba-f72f23124ab7.jpg",     // Bamboo background
  "668759548_3823277544474137_1009734293807348110_n_.jpg", // Coffee Zus
  "350a9dde-90a7-43fd-b8a6-6423aa6b153f.jpg",     // Food
  "381b5cff-f388-42b5-bd0e-25da07fd7245.jpg",     // Photo together
  "518791f0-c24c-4ef9-b38b-e8007e63f075.jpg",     // Outdoor dining
  "955d339b-c241-4863-a873-66e047ae5715.jpg",     // Girl with sunglasses
  "5ad65523-2c13-456e-82f0-cace9056b0a2.jpg",     // Selfie
  "19738ac8-d148-4c19-b2d2-7b0a3e26375c.jpg",     // Dark photo
  "637212360_1800677377271980_3559356081890100272_n.jpg", // Church/outdoor
  "0da857cb-f313-4ccd-8980-5ea3b928aab8.jpg",     // Sleeping
  "2fa66ec8-cc85-4ae8-b016-6fcfd56efaee.jpg",     // Selfie
  "31cff9b2-2019-4d15-9f8c-c8717985d7b9.jpg",     // Arcade
  "a45decf6-1cfb-4db6-9ed4-661afc0b0f11.jpg",     // Kusina
  "aac9316d-6a9c-490a-8563-b68ac05ace94.jpg",     // Dining
  "668625764_3279050372269689_8456103715718929288_n_.jpg", // Night car
  "15dcde55-7675-43cd-9e2d-f6775258be37.jpg",     // Car lights
  "670149561_4565786726988074_8094150056950599989_n_.jpg", // Church couple
  "670383230_941467015256392_6530614321865065104_n_.jpg", // Church single
  "670714833_1245917290910481_8643829533287209830_n.jpg", // Church couple 2
  "670754717_4258653044445917_1806252089628428312_n_.jpg", // Church couple 3
  "670894449_4230327450552828_3928047840831955425_n_.jpg", // Church single 2
  "671291858_954006703902553_4607760546705156400_n_.jpg", // Church single 3
  "672161072_1733105951380539_5753426999125525322_n_.jpg", // Restaurant
  "672816660_4455176974751543_3320409121364711523_n_.jpg", // Bedroom
  "db9e9389-4180-481e-b5be-d0ae3571691d.jpg",     // Flower
  "e1ef0d25-ea47-4cf8-a70d-69a84f145ebc.jpg",     // Selfie with filter
  "eab20edc-fc58-4142-95e1-01d3fa85f4be.jpg",     // Food (fries)
  "ec0c129e-37ab-4ac6-b64a-e656adbd478a.jpg",     // Food
  "ee9b99e2-3786-4cdb-9935-f8f21c42ca62.jpg",     // Selfie
  "eeb91b81-3414-4eab-9442-0b61b605a90d.jpg",     // Selfie
  "ef6f5e87-29cd-4991-83bf-6602ca902f75.jpg",     // Outdoor
  "f90ff24f-2b44-44be-a648-a4123fae07af.jpg",     // Food
  "fa3bf5e6-3665-4062-9b43-15b079bad332.jpg"      // Selfie
];

// Create ordered images array
const orderedImages = [];
for (let i = 0; i < correctOrder.length; i++) {
  const filename = correctOrder[i];
  const existing = data.images.find(img => img.filename === filename);
  if (existing) {
    orderedImages.push({
      filename: filename,
      label: `Memory ${i + 1}`
    });
  }
}

// Check if we missed any
const foundFilenames = new Set(orderedImages.map(img => img.filename));
const missing = data.images.filter(img => !foundFilenames.has(img.filename));
if (missing.length > 0) {
  console.log("Missing files (adding at end):", missing.map(m => m.filename));
  for (let i = 0; i < missing.length; i++) {
    orderedImages.push({
      filename: missing[i].filename,
      label: `Memory ${orderedImages.length + 1}`
    });
  }
}

data.images = orderedImages;

fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2));

console.log(`✅ Reordered ${data.images.length} images`);
console.log(`✅ Videos unchanged: ${data.videos.length} videos`);
