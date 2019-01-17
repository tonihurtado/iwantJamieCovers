const googleImages = require('google-images');
const downloader = require('image-downloader');
const vision = require('@google-cloud/vision');

require('dotenv').config();

//Search Client
const imagesClient = new googleImages(process.env.CID, process.env.APIKEY);
const visionClient = new vision.ImageAnnotatorClient();

//Command line args (simple)
var args = process.argv.slice(2);
var pages = args[1] || 100;
var q = args[0] || 'Jamie XX cover';
var dominantColors = [];

//query

for (p = 1; p <= pages / 10; p++) {
  imagesClient.search(q, { size: 'xxlarge', page: p }).then(res => {
    res.forEach(img => {
      if (img.width == img.height) {
        var options = {
          url: img.url,
          dest: process.env.DEST
        };
        downloader
          .image(options)
          .then(({ filename, image }) => {
            console.log('File saved to', filename);
          })
          .catch(err => {
            console.error('Nope (' + optios.url + ')');
          });
      }
    });
  });
}

function colornoExists(color) {
  var here = dominantColors.filter(co => {
    return Math.abs(color - co) <= 20;
  });
  if (here) return false;
  else return true;
}
