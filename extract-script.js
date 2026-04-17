// Extract memories from IndexedDB
async function extractMemories() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('anniversary-memory-db');
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction('memories', 'readonly');
      const store = tx.objectStore('memories');
      const getAll = store.getAll();

      getAll.onsuccess = () => resolve(getAll.result);
      getAll.onerror = () => reject('Failed to get memories');
    };
    request.onerror = () => reject('Failed to open database');
  });
}

// Extract and display
extractMemories().then(memories => {
  const output = `export const embeddedMemories = ${JSON.stringify(memories, null, 2)};`;
  console.log('=== COPY THIS DATA ===');
  console.log(output);
  console.log('=== END COPY ===');
  console.log(`Found ${memories.length} memories!`);
}).catch(error => console.error('Error:', error));