const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🌸 Deploying Anniversary Website...\n');

// Step 1: Build
console.log('📦 Step 1: Building...');
try {
  execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
  console.log('✅ Build successful!\n');
} catch (e) {
  console.error('❌ Build failed:', e.message);
  process.exit(1);
}

// Step 2: Deploy
console.log('🚀 Step 2: Deploying to Netlify...');
console.log('Site: memory-app-90cf194c\n');

try {
  execSync('npx netlify deploy --prod --dir=dist --site=memory-app-90cf194c', {
    stdio: 'inherit',
    cwd: __dirname,
    env: { ...process.env, NETLIFY_AUTH_TOKEN: process.env.NETLIFY_AUTH_TOKEN }
  });
  console.log('\n✅ Deploy successful!');
  console.log('🌐 https://memory-app-90cf194c.netlify.app/');
} catch (e) {
  console.error('\n❌ Deploy failed:', e.message);
  console.log('\n💡 Manual deploy needed:');
  console.log('   1. Go to https://app.netlify.com/sites/memory-app-90cf194c/deploys');
  console.log('   2. Drag the dist folder');
  process.exit(1);
}
