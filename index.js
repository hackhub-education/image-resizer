const fs = require('fs');
const path = require('path');
const http = require('http');
const resizeImg = require('resize-img');
const chalk = require('chalk');

const dimension = require('./dimension');
const origDir = path.join(__dirname, '/images/orig/');
const distDir = path.join(__dirname, '/images/dist/');

// create dist folder if it doesn't exist
if (!fs.existsSync(distDir)){
    fs.mkdirSync(distDir);
}

const distWidth = 100;

console.log(chalk.gray('Image resizer starting...'));
console.log('Resize to WIDTH =', distWidth, 'px')

fs.readdir(origDir, (err, files) => {
    files.forEach((fileName, i) => {

        console.log(chalk.blue('LOADING: Found', fileName));

        const { ratio } = dimension(origDir, fileName);
        
        resizeImg(fs.readFileSync(origDir + fileName), {width: distWidth, height: distWidth / ratio})
            .then(buf => {
                fs.writeFileSync(distDir + fileName, buf);
                console.log(chalk.green('SUCCESS: ', fileName, 'has been resized'));
            });
    })
});
  

