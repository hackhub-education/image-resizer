const fs = require('fs');
const path = require('path');
const http = require('http');
const resizeImg = require('resize-img');

const dimension = require('./dimension');
const origDir = path.join(__dirname, '/images/orig/');
const distDir = path.join(__dirname, '/images/dist/');

// create dist folder if it doesn't exist
if (!fs.existsSync(distDir)){
    fs.mkdirSync(distDir);
}

const distWidth = 300;

fs.readdir(origDir, (err, files) => {
    files.forEach((fileName, i) => {

        const { ratio } = dimension(origDir, fileName);
        
        resizeImg(fs.readFileSync(origDir + fileName), {width: distWidth, height: distWidth / ratio})
            .then(buf => {
                fs.writeFileSync(distDir + fileName, buf);
            });
    })
});
  

