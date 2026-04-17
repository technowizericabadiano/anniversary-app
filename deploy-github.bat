@echo off
echo ===================================
echo   GITHUB PAGES DEPLOY
echo ===================================
echo.

cd "c:\Users\erica\Desktop\Memory"

echo Step 1: Building...
call npm run build

echo.
echo Step 2: Creating gh-pages branch...
cd dist
git init
git add .
git commit -m "Deploy to GitHub Pages"

echo.
echo Step 3: Ready to push!
echo.
echo ===================================
echo   MANUAL STEP NEEDED:
echo ===================================
echo.
echo 1. Go to https://github.com/new
echo 2. Create new repository (name: virtual-gift)
echo 3. Run these commands:
echo.
echo    cd c:\Users\erica\Desktop\Memory\dist
echo    git remote add origin https://github.com/YOUR_USERNAME/virtual-gift.git
echo    git push -f origin main
echo.
echo 4. Go to repo Settings ^> Pages
echo 5. Enable GitHub Pages (source: main branch)
echo.
echo Site will be: https://your-username.github.io/virtual-gift/
echo.
pause
