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

const files = walk('./src/pages');

let changes = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Replace $ followed by { (e.g. ${...})
  // Wait, no. We WANT ${...} to remain as is in template literals!
  // BUT in JSX, ${item.price} is actually rendering the currency.
  // We want to replace $ when it represents dollars.

  // Let's replace ONLY specific patterns:
  // 1. >$ -> >₹
  content = content.replace(/>\$/g, '>₹');
  content = content.replace(/\$([0-9]+)/g, '₹$1');
  content = content.replace(/>  *\$/g, '> ₹');
  content = content.replace(/Pay \$/g, 'Pay ₹');
  // the tricky part: in JSX text: <span>${item.price}</span> -> <span>₹{item.price}</span>
  // wait, earlier I replaced $ inside template literals! 
  // Let's replace >${ -> >₹{
  content = content.replace(/>\$\{/g, '>₹{');
  content = content.replace(/\(-\$/g, '(-₹');
  content = content.replace(/'\$'/g, "'₹'");
  content = content.replace(/-\$/g, '-₹');
  content = content.replace(/: '\$'/g, ": '₹'");
  content = content.replace(/ \$/g, ' ₹');
  content = content.replace(/\('\$'/g, "('₹'");
  content = content.replace(/\+ '\$'/g, "+ '₹'");

  // Also replace those weird ? marks that might have been caused by encoding issues
  // Wait, if it really became ?, we'd see >?{item.price.toFixed(2)}
  content = content.replace(/>\?\{/g, '>₹{');
  content = content.replace(/-?\?\{/g, '-₹{');
  content = content.replace(/> \?\{/g, '> ₹{');
  content = content.replace(/className={`([^`]*) \?\{/g, "className={`$1 ${"); // Fix filter-chip ?{activeCategory template literal issue!!
  content = content.replace(/id={`([^`]*) \?\{/g, "id={`$1 ${");

  // Actually, ANY ?{ that isn't part of a ternary operator might be a broken ${}.
  // Let's fix template literals
  // if something looks like `... ?{...}` -> `... ${...}`
  content = content.replace(/`([^`]*)\?\{/g, '`$1${');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    changes++;
    console.log('Fixed', f);
  }
});
console.log('Updated', changes, 'files.');
