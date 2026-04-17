HOW TO ADD PICTURES AND VIDEOS (EASY WAY)
==========================================

1. Copy all your pictures/videos to this folder:
   - public/memories/

2. Run this command:
   npm run scan-memories

   This will auto-generate memories.json with all your files!

3. Run "npm run build" then deploy

MANUAL WAY (if you want custom labels)
======================================
Edit memories.json directly:
{
  "images": [
    { "filename": "photo1.jpg", "label": "Our first date" },
    { "filename": "photo2.png", "label": "Beach trip 2024" }
  ],
  "videos": [
    { "filename": "video1.mp4", "label": "Birthday celebration" }
  ]
}

NOTES:
- Supported formats: jpg, png, gif, webp for images; mp4, webm, mov for videos
- The scan-memories script will try to create nice labels from filenames
- Pictures will appear in BOTH local dev and deployed site
- You can edit labels anytime in memories.json after scanning
- User uploads via the browser still work (saved in browser, not in this folder)
