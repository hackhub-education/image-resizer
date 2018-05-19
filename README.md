# Image Resizer
### Resize images from one folder and store them into a new folder.

## Install
`npm i -S node-img-resizer`

## Dependencies
* `resize-img` [npm link](https://www.npmjs.com/package/resize-img)
* `image-size` [npm link](https://www.npmjs.com/package/image-size)
* `chalk` [npm link](https://www.npmjs.com/package/chalk)

## How to use
1. Put images into `images/orig` folder
2. Require module: `const resizer = require('node-img-resizer')`
3. Use resizer: `resizer(width)`
4. View resized images in `images/dist` folder