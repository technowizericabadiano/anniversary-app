import type { AlbumItem } from "../App";

export type FolderMemoryManifest = {
  images: Array<{
    filename: string;
    label?: string;
  }>;
  videos: Array<{
    filename: string;
    label?: string;
  }>;
};

export const loadFolderMemories = async (): Promise<AlbumItem[]> => {
  try {
    const response = await fetch("/memories/memories.json");
    if (!response.ok) {
      console.log("No memories manifest found");
      return [];
    }

    const manifest: FolderMemoryManifest = await response.json();
    const items: AlbumItem[] = [];

    manifest.images?.forEach((img, index) => {
      const ext = img.filename.split(".").pop()?.toLowerCase() || "jpg";
      const mimeType = ext === "png" ? "image/png" : ext === "gif" ? "image/gif" : "image/jpeg";

      items.push({
        id: `folder-img-${index}`,
        url: `/memories/${img.filename}`,
        name: img.filename,
        label: img.label || `Memory ${index + 1}`,
        kind: "image",
        mimeType,
      });
    });

    manifest.videos?.forEach((vid, index) => {
      const ext = vid.filename.split(".").pop()?.toLowerCase() || "mp4";
      const mimeType = ext === "webm" ? "video/webm" : "video/mp4";

      items.push({
        id: `folder-vid-${index}`,
        url: `/memories/${vid.filename}`,
        name: vid.filename,
        label: vid.label || `Video ${index + 1}`,
        kind: "video",
        mimeType,
      });
    });

    return items;
  } catch (error) {
    console.log("Error loading folder memories:", error);
    return [];
  }
};
