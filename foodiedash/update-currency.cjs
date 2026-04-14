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

const files = walk('./src');

let changes = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  content = content.replace(/>\$/g, '>₹');
  content = content.replace(/\$([0-9]+)/g, '₹$1');
  content = content.replace(/>  *\$/g, '> ₹');
  content = content.replace(/Pay \$/g, 'Pay ₹');
  content = content.replace(/>\$\{/g, '>₹{');
  content = content.replace(/\(-\$/g, '(-₹');
  content = content.replace(/'\$'/g, "'₹'");
  content = content.replace(/-\$/g, '-₹');
  content = content.replace(/: '\$'/g, ": '₹'");
  content = content.replace(/ \$/g, ' ₹');
  content = content.replace(/\('\$'/g, "('₹'");
  content = content.replace(/\+ '\$'/g, "+ '₹'");

  // Fix broken template literals from encoding errors
  content = content.replace(/>\?\{/g, '>₹{');
  content = content.replace(/-?\?\{/g, '-₹{');
  content = content.replace(/> \?\{/g, '> ₹{');
  content = content.replace(/className={`([^`]*) \?\{/g, "className={`$1 ${"); 
  content = content.replace(/id={`([^`]*) \?\{/g, "id={`$1 ${");
  content = content.replace(/`([^`]*)\?\{/g, '`$1${');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    changes++;
    console.log('Fixed', f);
  }
});
console.log('Updated', changes, 'files.');
