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

            // Regex to find heading tags: <h1... > or <motion.h1... >
            const headingRegex = /(<(?:motion\.)?h[1-6]\b[^>]*>)/gi;
            
            content = content.replace(headingRegex, (match, tag) => {
                let newTag = tag;
                
                // Remove exact style tag
                if (newTag.includes("style={{ fontFamily: 'Cormorant Garamond, serif' }}")) {
                    newTag = newTag.replace(/\s*style=\{\{\s*fontFamily:\s*'Cormorant Garamond,\s*serif'\s*\}\}/, '');
                } 
                // Remove from mixed style tag
                else if (newTag.includes("fontFamily: 'Cormorant Garamond, serif'")) {
                    newTag = newTag.replace(/fontFamily:\s*'Cormorant Garamond,\s*serif'\s*,?\s*/, '');
                    // if style became empty, remove it entirely
                    newTag = newTag.replace(/\s*style=\{\{\s*\}\}/, '');
                }

                // Add font-serif to className if not present
                if (newTag !== tag && newTag.includes('className="')) {
                    if (!newTag.includes('font-serif')) {
                        newTag = newTag.replace(/className="/, 'className="font-serif ');
                    }
                } else if (newTag !== tag && newTag.includes("className={`")) {
                    if (!newTag.includes('font-serif')) {
                        newTag = newTag.replace(/className=\{`/, 'className={`font-serif ');
                    }
                } else if (newTag !== tag && !newTag.includes('className=')) {
                    // if no classname exists, add it
                    newTag = newTag.replace(/(\/?>)$/, ' className="font-serif" $1');
                }

                if (newTag !== tag) {
                    modified = true;
                }
                
                return newTag;
            });

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log('Fixed styles in:', fullPath);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
