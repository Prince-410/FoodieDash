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

  // 1. Revert ANY logical template literal markers that were corrupted
  // e.g. className={`... ₹{...}`} -> className={`... ${...}`}
  content = content.replace(/₹\{/g, '${');
  
  // 2. Now correctly place the Rupees symbol for DISPLAY in JSX
  // If we have <span>{total}</span> -> <span>₹{total}</span>
  // This matches ">{" (start of JSX evaluator) and " {" (evaluator after space)
  content = content.replace(/>\{/g, '>₹{');
  content = content.replace(/ \{/g, ' ₹{');
  
  // 3. Fix cases where we have something like <span>₹₹{total}</span> due to double replacement
  content = content.replace(/₹₹/g, '₹');
  
  // 4. Fix template literals used for currency display specifically
  // e.g. `₹${total}` -> this is fine, but if my script made it `${total}`, I might want the ₹
  // Actually, let's look for specific currency words
  content = content.replace(/Price: \$\{/g, 'Price: ₹${');
  content = content.replace(/Total: \$\{/g, 'Total: ₹${');
  content = content.replace(/Pay \$\{/g, 'Pay ₹${');

  // 5. Cleanup for specific common patterns
  content = content.replace(/>₹₹/g, '>₹');
  content = content.replace(/ ₹₹/g, ' ₹');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Fixed', f);
  }
});
console.log('Done.');
