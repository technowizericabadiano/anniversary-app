import { embeddedMemories } from "./embeddedMemories";

export type StoredMemoryRecord = {
  slotKey: string;
  slotIndex: number;
  id: string;
  name: string;
  label: string;
  kind: "image" | "video";
  mimeType: string;
  blob: Blob;
};

const DATABASE_NAME = "anniversary-memory-db";
const DATABASE_VERSION = 1;
const STORE_NAME = "memories";

let databasePromise: Promise<IDBDatabase> | null = null;

const openDatabase = () => {
  if (typeof window === "undefined" || !("indexedDB" in window)) {
    return Promise.reject(new Error("IndexedDB is not available in this browser."));
  }

  const createOpenRequest = (version: number) => window.indexedDB.open(DATABASE_NAME, version);

  if (!databasePromise) {
    databasePromise = new Promise((resolve, reject) => {
      const request = createOpenRequest(DATABASE_VERSION);

      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME, { keyPath: "slotKey" });
        }
      };

      request.onsuccess = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          const nextVersion = database.version + 1;
          database.close();

          const recreateRequest = createOpenRequest(nextVersion);
          recreateRequest.onupgradeneeded = () => {
            const reopenedDatabase = recreateRequest.result;
            if (!reopenedDatabase.objectStoreNames.contains(STORE_NAME)) {
              reopenedDatabase.createObjectStore(STORE_NAME, { keyPath: "slotKey" });
            }
          };
          recreateRequest.onsuccess = () => resolve(recreateRequest.result);
          recreateRequest.onerror = () => {
            databasePromise = null;
            reject(recreateRequest.error ?? new Error("Unable to open the memories database."));
          };
        } else {
          resolve(database);
        }
      };

      request.onerror = () => {
        databasePromise = null;
        reject(request.error ?? new Error("Unable to open the memories database."));
      };
    });
  }

  return databasePromise;
};

const getAllStoredMemories = (database: IDBDatabase) =>
  new Promise<StoredMemoryRecord[]>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve((request.result as StoredMemoryRecord[]) ?? []);
    request.onerror = () => reject(request.error ?? new Error("Unable to load saved memories."));
  });

const putStoredMemory = (database: IDBDatabase, record: StoredMemoryRecord) =>
  new Promise<void>((resolve, reject) => {
    try {
      const transaction = database.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(record);

      request.onsuccess = () => {
        transaction.oncomplete = () => resolve();
      };
      request.onerror = () => reject(request.error ?? new Error("Unable to save this memory."));
      transaction.onerror = () => reject(transaction.error ?? new Error("Unable to save this memory."));
    } catch (error) {
      reject(error instanceof Error ? error : new Error("Unable to save this memory."));
    }
  });

const recreateStoreIfNeeded = async (database: IDBDatabase) => {
  if (database.objectStoreNames.contains(STORE_NAME)) return database;

  const nextVersion = database.version + 1;
  database.close();
  databasePromise = null;
  const recreationRequest = window.indexedDB.open(DATABASE_NAME, nextVersion);

  return new Promise<IDBDatabase>((resolve, reject) => {
    recreationRequest.onupgradeneeded = () => {
      const reopenedDatabase = recreationRequest.result;
      if (!reopenedDatabase.objectStoreNames.contains(STORE_NAME)) {
        reopenedDatabase.createObjectStore(STORE_NAME, { keyPath: "slotKey" });
      }
    };
    recreationRequest.onsuccess = () => resolve(recreationRequest.result);
    recreationRequest.onerror = () => reject(recreationRequest.error ?? new Error("Unable to recreate the memories database."));
  });
};

export const loadStoredMemories = async () => {
  let database = await openDatabase();

  try {
    return await getAllStoredMemories(database);
  } catch (error) {
    if (!database.objectStoreNames.contains(STORE_NAME)) {
      database = await recreateStoreIfNeeded(database);
      return await getAllStoredMemories(database);
    }

    throw error;
  }
};

export const saveStoredMemory = async (record: StoredMemoryRecord) => {
  let database = await openDatabase();

  try {
    await putStoredMemory(database, record);
  } catch (error) {
    if (!database.objectStoreNames.contains(STORE_NAME)) {
      database = await recreateStoreIfNeeded(database);
      await putStoredMemory(database, record);
      return;
    }
    throw error;
  }
};

type ExportRecord = Omit<StoredMemoryRecord, "blob"> & {
  blobBase64: string;
};

export const exportMemoriesToFile = async () => {
  const memories = await loadStoredMemories();

  const exportData: ExportRecord[] = await Promise.all(
    memories.map(async (memory) => {
      const blobBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(",")[1] || "";
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(memory.blob);
      });

      return {
        slotKey: memory.slotKey,
        slotIndex: memory.slotIndex,
        id: memory.id,
        name: memory.name,
        label: memory.label,
        kind: memory.kind,
        mimeType: memory.mimeType,
        blobBase64,
      };
    })
  );

  const json = JSON.stringify(exportData, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `memories-backup-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importMemoriesFromFile = async (file: File) => {
  const text = await file.text();
  const exportData: ExportRecord[] = JSON.parse(text);

  for (const data of exportData) {
    const binaryString = atob(data.blobBase64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: data.mimeType });

    const record: StoredMemoryRecord = {
      slotKey: data.slotKey,
      slotIndex: data.slotIndex,
      id: data.id,
      name: data.name,
      label: data.label,
      kind: data.kind,
      mimeType: data.mimeType,
      blob,
    };

    await saveStoredMemory(record);
  }
};

export const deleteAllMemories = async () => {
  const database = await openDatabase();
  return new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onsuccess = () => {
      transaction.oncomplete = () => resolve();
    };
    request.onerror = () => reject(request.error ?? new Error("Unable to clear memories."));
    transaction.onerror = () => reject(transaction.error ?? new Error("Unable to clear memories."));
  });
};

export const autoLoadBackupIfAvailable = async () => {
  try {
    const existingMemories = await loadStoredMemories();
    if (existingMemories.length > 0) {
      return;
    }

    // Load embedded memories if available
    if (embeddedMemories.length > 0) {
      for (const memory of embeddedMemories) {
        await saveStoredMemory(memory);
      }
    }
  } catch (error) {
    console.log("Error loading embedded memories:", error);
  }
};
