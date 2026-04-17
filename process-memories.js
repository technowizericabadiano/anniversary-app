#!/usr/bin/env node

// Process extracted memories data
// Usage: node process-memories.js <memories-data>

const fs = require('fs');
const path = require('path');

const memoriesData = process.argv[2];
if (!memoriesData) {
  console.log('Usage: node process-memories.js "<memories-json-string>"');
  console.log('Example: node process-memories.js \'[{"slotKey":"photo-0",...}]\'');
  process.exit(1);
}

try {
  // Parse the memories data
  const memories = JSON.parse(memoriesData);

  // Create the embedded memories file
  const output = `export const embeddedMemories = ${JSON.stringify(memories, null, 2)};`;

  // Write to the embedded memories file
  const filePath = path.join(__dirname, 'src', 'lib', 'embeddedMemories.ts');
  fs.writeFileSync(filePath, output);

  console.log(`✅ Successfully embedded ${memories.length} memories!`);
  console.log(`📁 Updated: ${filePath}`);

  // Now build and deploy
  console.log('🔄 Building and deploying...');

} catch (error) {
  console.error('❌ Error processing memories:', error.message);
  process.exit(1);
}