#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function extractMemories() {
  console.log('🚀 Starting memory extraction...');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });

  try {
    const page = await browser.newPage();

    // Navigate to the local dev server
    console.log('📱 Opening app at http://localhost:5173...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

    // Wait a moment for the app to load
    await page.waitForTimeout(2000);

    // Extract memories from IndexedDB
    console.log('💾 Extracting memories from browser storage...');
    const memories = await page.evaluate(async () => {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open('anniversary-memory-db');
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction('memories', 'readonly');
          const store = tx.objectStore('memories');
          const getAll = store.getAll();

          getAll.onsuccess = () => {
            resolve(getAll.result);
          };
          getAll.onerror = () => reject(new Error('Failed to get memories'));
        };
        request.onerror = () => reject(new Error('Failed to open database'));
      });
    });

    console.log(`✅ Found ${memories.length} memories!`);

    // Save to embedded memories file
    const output = `export const embeddedMemories = ${JSON.stringify(memories, null, 2)};`;
    const filePath = path.join(__dirname, 'src', 'lib', 'embeddedMemories.ts');
    fs.writeFileSync(filePath, output);

    console.log(`💾 Saved memories to: ${filePath}`);

    // Close browser
    await browser.close();

    console.log('🎉 Memory extraction complete!');
    console.log('🔄 Run "npm run build && netlify deploy --prod --dir=dist" to deploy with memories');

  } catch (error) {
    console.error('❌ Error extracting memories:', error);
    await browser.close();
    process.exit(1);
  }
}

extractMemories();