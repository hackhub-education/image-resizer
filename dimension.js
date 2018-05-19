const sizeOf = require('image-size');

module.exports = (origDir, fileName) => {
  // get dimensions of image
  const dimensions = sizeOf(origDir + fileName);

  return {
    ratio: dimensions.width / dimensions.height,
  }
}