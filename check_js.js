const fs=require('fs');
const html=fs.readFileSync('C:/Users/27411/.qclaw/workspace/shangaowanren-app/index.html','utf8');
const m=html.match(/<script>([\s\S]*)<\/script>/);
if(!m){console.log('NO SCRIPT');process.exit(1)}
try{new Function(m[1]);console.log('JS OK')}catch(e){console.log('JS ERROR: '+e.message)}
