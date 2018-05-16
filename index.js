const fs = require('fs');
const resizeImg = require('resize-img');
const sizeOf = require('image-size');
const chalk = require('chalk');
const readline = require('readline');

const origDir = './images/orig/';
const distDir = './images/dist/';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is the desired width that you want in px? ', (distWidth) => {
    rl.close();

    console.log(chalk.gray('Image resizer starting...'));
    console.log('Resize to WIDTH =', distWidth, 'px')

    fs.readdir(origDir, (err, files) => {
        files.forEach(fileName => {

            console.log(chalk.blue('LOADING: Found', fileName));

            const dimensions = sizeOf(origDir + fileName);
            const ratio = dimensions.width / dimensions.height;

            if (dimensions.width < distWidth) {
                console.log(chalk.yellow('WARNING:', fileName, 'is smaller than preset size'));
            }

            resizeImg(fs.readFileSync(origDir + fileName), { width: distWidth, height: distWidth / ratio }).then(buf => {
                fs.writeFileSync(distDir + fileName, buf);
                console.log(chalk.green('SUCCESS: ', fileName, 'has been resized'));
            });

        });
    })
});