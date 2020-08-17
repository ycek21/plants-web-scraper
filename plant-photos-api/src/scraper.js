const fs = require('fs');
const { promisify } = require('util')
const https = require('https');
const puppeteer = require('puppeteer');
const { PLANT_PHOTOS_DIRECTORY } = require('./constants')

const mkdirAsync = promisify(fs.mkdir)
const existsAsync = promisify(fs.exists)

const download = (url, destination) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(destination);

  https.get(url, response => {
    response.pipe(file);

    file.on('finish', () => {
      file.close(resolve(true));
    });
  }).on('error', error => {
    fs.unlink(destination);

    reject(error.message);
  });
});

const downloadPhotos = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let result;

  await page.goto(url);

  if (!await existsAsync(`./${PLANT_PHOTOS_DIRECTORY}`)) {
    await mkdirAsync(`./${PLANT_PHOTOS_DIRECTORY}`)
  }

  const photos = await page.evaluate(() => Array.from(document.images, e => e.src));

  for (let i = 0; i < photos.length; i++) {
    result = await download(photos[i], `./${PLANT_PHOTOS_DIRECTORY}/photo-${i}.png`);
    if (result === true) {
      console.log('Success:', photos[i], 'has been downloaded successfully.');
    } else {
      console.log('Error:', photos[i], 'was not downloaded.');
      console.error(result);
    }
  }

  await browser.close();
};

module.exports = {
  downloadPhotos
}
