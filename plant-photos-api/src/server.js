const { port, enviroment, protocol, host } = require('./config');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { json, urlencoded } = require('body-parser');
const errorHandler = require('./middlewares/error-handler');
const scraper = require('./scraper')
const { UNSPLASH_URL, PLANT_TYPES } = require('./constants')

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/photos', express.static('photos'));

app.get('/api/plant-photos/scrape', async (req, res, next) => {
  try {
    const { plantType } = req.query
    if (!plantType) {
      res.status(400).json({ message: `Query string parameter 'plantType' is required.` })
    } else {
      if (!PLANT_TYPES[plantType.toLowerCase()]) {
        res.status(400).json({ message: `'${plantType}' is not allowed plantType.` })
      } else {
        const scrapedPhotosLinks = await scraper.downloadPhotos(`${UNSPLASH_URL}/${plantType.toLowerCase()}`)
        res.status(200).json({
          scrapedPhotosLinks: scrapedPhotosLinks
        })
      }
    }
  } catch (err) {
    next(err)
  }
})

app.use(errorHandler);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`REST API root url: ${protocol}://${host}:${port}/api`);
      console.log(`Enviroment: ${enviroment}`);
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  start,
};
