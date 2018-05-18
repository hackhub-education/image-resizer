const fs = require('fs');
const path = require('path');
const resizeImg = require('resize-img');

const origDir = path.join(__dirname, '/images/orig/');
const distDir = path.join(__dirname, '/images/dist/');

// create dist folder if it doesn't exist
if (!fs.existsSync(distDir)){
    fs.mkdirSync(distDir);
}

const fileName = 'pic1.jpeg';

resizeImg(fs.readFileSync(origDir + fileName), { width: 128, height: 128 })
    .then(buf => {
        fs.writeFileSync(distDir + fileName, buf);
    });
console.log(new Buffer(10));