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
    } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // 1. Revert ANY logical markers that were corrupted
  // This essentially removes '₹' when it's immediately before '{', '}', '/', etc.
  content = content.replace(/₹\{/g, '{');
  content = content.replace(/₹\}/g, '}');
  content = content.replace(/import ₹/g, 'import ');
  content = content.replace(/export ₹/g, 'export ');
  content = content.replace(/₹\//g, '/');
  content = content.replace(/₹\*/g, '*');
  content = content.replace(/₹\(/g, '(');
  content = content.replace(/₹\./g, '.');
  content = content.replace(/₹\[/g, '[');
  content = content.replace(/₹\`/g, '`');
  
  // 2. Fix JSX display of price that might have been lost
  // We want ₹ immediately before { when it's a price.
  // But we must be careful. Let's only do it for known price variables.
  const priceVars = [
    'total', 'subtotal', 'discount', 'deliveryFee', 'tax', 
    'item.price', 'r.price', 'partner.price', 'price', 'value'
  ];
  
  priceVars.forEach(v => {
    // Search for patterns like {v} or ${v} in text and change to ₹{v} or ₹${v}
    // Only in JSX-like contexts (surrounded by spans or spaces)
    const escapedV = v.replace('.', '\\.');
    const regex1 = new RegExp(`>\\{${escapedV}\\.toFixed`, 'g');
    content = content.replace(regex1, `>₹{${v}.toFixed`);
    
    const regex2 = new RegExp(` \\{${escapedV}\\.toFixed`, 'g');
    content = content.replace(regex2, ` ₹{${v}.toFixed`);
    
    const regex3 = new RegExp(`\\$\{${escapedV}\\.toFixed`, 'g');
    content = content.replace(regex3, `₹\$\{${v}.toFixed`);
  });

  // 3. Final cleanup of double symbols
  content = content.replace(/₹₹/g, '₹');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Fixed:', f);
  }
});
console.log('Cleanup Complete.');
