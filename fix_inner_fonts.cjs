const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Regex to find content between <h[1-6] and </h[1-6]>
            const headingRegex = /(<h[1-6][^>]*>)([\s\S]*?)(<\/h[1-6]>)/gi;
            
            content = content.replace(headingRegex, (match, open, inner, close) => {
                let newInner = inner.replace(/\bfont-light\b/g, 'font-bold')
                                    .replace(/\bfont-normal\b/g, 'font-bold')
                                    .replace(/\bfont-medium\b/g, 'font-bold')
                                    .replace(/\bfont-semibold\b/g, 'font-bold')
                                    .replace(/\bfont-thin\b/g, 'font-bold');
                
                if (inner !== newInner) {
                    modified = true;
                }
                return open + newInner + close;
            });

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log('Fixed inner fonts:', fullPath);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
