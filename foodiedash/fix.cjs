const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith('.jsx')) {
      results.push(filePath);
    }
  });
  return results;
}
walk('./src').forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;
  content = content.replace(/-?₹\{/g, '${'); 
  content = content.replace(/₹\{/g, '${');
  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Restored template literals in', f);
  }
});
