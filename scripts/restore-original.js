import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appPath = path.join(__dirname, "..", "src", "App.tsx");

let content = fs.readFileSync(appPath, "utf-8");

// Replace all modified min-h values back to original
content = content.replace(/min-h-\[22rem\] sm:min-h-0/g, "min-h-[16rem] sm:min-h-0");
content = content.replace(/min-h-\[24rem\] sm:min-h-0/g, "min-h-[20rem] sm:min-h-0");

// Change object-top back to object-center
content = content.replace(/object-cover object-top/g, "object-cover object-center");

fs.writeFileSync(appPath, content);
console.log("✅ Restored to original backup values");
