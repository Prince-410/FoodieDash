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

  // 1. Fix broken currency symbols from previous failed attempts (like ?)
  content = content.replace(/[?₹]\$\{/g, '₹${');
  
  // 2. Replace literal $ followed by { in JSX (e.g., <span>${total}</span>)
  // This is often used in JSX as "$ {value}"
  content = content.replace(/>\$\{/g, '>₹{');
  content = content.replace(/ \$\{/g, ' ₹{');
  content = content.replace(/>\$/g, '>₹');
  content = content.replace(/\(\$/g, '(₹');
  content = content.replace(/-\$/g, '-₹');
  content = content.replace(/Pay \$/g, 'Pay ₹');
  content = content.replace(/ '₹'/g, " '₹'"); // already done maybe
  
  // 3. Template literals in JS/JSX: `$${total}` -> `₹${total}`
  content = content.replace(/`\$(\$\{)/g, '`₹$1');
  
  // 4. Strings: '$' -> '₹'
  content = content.replace(/'\$'/g, "'₹'");
  content = content.replace(/"\$"/g, '"₹"');

  // 5. Specific case: ${order.total} or similar in JSX
  // If it's <span>${item.price}</span> -> change to <span>₹{item.price}</span>
  // This matches text nodes in JSX
  content = content.replace(/>\s*\$\{([a-zA-Z0-9.]+)\}/g, '>₹{$1}');
  content = content.replace(/,\s*\$\{([a-zA-Z0-9.]+)\}/g, ', ₹{$1}');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Processed', f);
  }
});
console.log('Done.');
