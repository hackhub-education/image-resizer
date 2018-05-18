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

const fileName = 'pic1.jpeg';

const { ratio } = dimension(origDir, fileName);

const distWidth = 180;

// start server
http.createServer((req, res) => {
    res.write('<html><body>')
    fs.readdir(origDir, (err, files) => {
        files.forEach((fileName, i) => {
            console.log(chalk.blue('LOADING: Found', fileName));
            resizeImg(fs.readFileSync(origDir + fileName), {width: distWidth, height: distWidth / ratio})
                .then(buf => {
                    fs.writeFileSync(distDir + fileName, buf);
                    console.log(chalk.green('SUCCESS: ', fileName, 'has been resized'));
                    res.write('<img src="data:image/jpeg;base64,');
                    res.write(Buffer.from(buf).toString('base64'));
                    res.write('"/>');

                    // end the response when the last image has been wirtten into response
                    if(i === files.length -1) {
                        res.end('</body></html>');
                    }
                });
        })
    });
}).listen(8080); //the server object listens on port 8080