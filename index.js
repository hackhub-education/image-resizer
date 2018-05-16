const fs = require('fs');
const resizeImg = require('resize-img');

const origDir = './images/orig/';
const distDir = './images/dist/';

const fileName = 'pic1.jpeg';
 
resizeImg(fs.readFileSync(origDir + fileName), {width: 128, height: 128}).then(buf => {
    fs.writeFileSync(distDir + fileName, buf);
});