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

            // Regex to match <h1...6 with a string className
            const regexStringClass = /(<h[1-6][^>]*className=")([^"]*)(")/g;
            content = content.replace(regexStringClass, (match, p1, p2, p3) => {
                let classes = p2.split(/\s+/).filter(Boolean);
                classes = classes.filter(c => !['font-thin', 'font-extralight', 'font-light', 'font-normal', 'font-medium', 'font-semibold'].includes(c));
                if (!classes.some(c => ['font-bold', 'font-extrabold', 'font-black'].includes(c))) {
                    classes.push('font-bold');
                }
                modified = true;
                return p1 + classes.join(' ') + p3;
            });

            // Regex to match <h1...6 with a template literal className
            const regexTemplateClass = /(<h[1-6][^>]*className=\{`)(.*?)(`\})/g;
            content = content.replace(regexTemplateClass, (match, p1, p2, p3) => {
                let parts = p2.split(/\s+/).filter(Boolean);
                let classes = parts.filter(c => !['font-thin', 'font-extralight', 'font-light', 'font-normal', 'font-medium', 'font-semibold'].includes(c));
                if (!classes.some(c => ['font-bold', 'font-extrabold', 'font-black'].includes(c))) {
                    classes.push('font-bold');
                }
                modified = true;
                return p1 + classes.join(' ') + p3;
            });

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated:', fullPath);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
