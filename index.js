const fs = require('fs');
const resizeImg = require('resize-img');
const sizeOf = require('image-size');

const origDir = './images/orig/';
const distDir = './images/dist/';

const fileName = 'pic1.jpeg';

const dimensions = sizeOf(origDir + fileName);
const ratio = dimensions.width / dimensions.height;
const distWidth = 128;
 
resizeImg(fs.readFileSync(origDir + fileName), {width: distWidth, height: distWidth / ratio}).then(buf => {
    fs.writeFileSync(distDir + fileName, buf);
});