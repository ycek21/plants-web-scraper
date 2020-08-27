const { port, enviroment, protocol, host } = require('./config');
const fs = require('fs');
const https = require('https');
const puppeteer = require('puppeteer');
const { createDirectoryRecursively, deleteDirectoryRecursively } = require('./utils/index')
const { PLANT_PHOTOS_DIRECTORY } = require('./constants')


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
  const scrapedPhotosLinks = []

  await page.goto(url);

  const plantType = url.split('/').slice(-1)[0]
  const dirPath = `./${PLANT_PHOTOS_DIRECTORY}/${plantType}`
  await deleteDirectoryRecursively(dirPath)
  await createDirectoryRecursively(dirPath)

  const photos = await page.evaluate(() => Array.from(document.images, e => e.src));

  for (let i = 0; i < photos.length - 1; i++) {
    if (photos[i].includes('profile') || photos[i].includes('placeholder-avatars')) {
      continue
    }
    const result = await download(photos[i], `${dirPath}/photo-${i}.png`);
    if (result) {
      scrapedPhotosLinks.push(`${protocol}://${host}:${port}/api/photos/${plantType}/photo-${i}.png`)
    }
    if (result === true) {
      console.log('Success:', photos[i], 'has been downloaded successfully.');
    } else {
      console.log('Error:', photos[i], 'was not downloaded.');
      console.error(result);
    }
  }

  await browser.close();
  return scrapedPhotosLinks
};

module.exports = {
  downloadPhotos
}
