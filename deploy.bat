@echo off
echo.
echo ===================================
echo   DEPLOY TO NETLIFY
echo ===================================
echo.
echo Step 1: Building...
call npm run build
echo.
echo Step 2: Deploying to Netlify...
call npx netlify deploy --site=memory-app-90cf194c --prod --dir=dist --message="Purple flowers update"
echo.
echo ===================================
echo   DONE!
echo ===================================
echo.
echo Site: https://memory-app-90cf194c.netlify.app/
pause
