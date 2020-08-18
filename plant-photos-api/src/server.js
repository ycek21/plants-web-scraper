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
      res.status(400).send({ message: `Query string parameter 'plantType' is required.` })
    } else {
      if (!PLANT_TYPES[plantType.toLowerCase()]) {
        res.status(400).send({ message: `'${plantType}' is not allowed plantType.` })
      } else {
        const downloadedPhotos = await scraper.downloadPhotos(`${UNSPLASH_URL}/${plantType.toLowerCase()}`)
        res.status(200).send(downloadedPhotos)
      }
    }
  } catch (err) {
    next(err)
  }
})

app.use(errorHandler);

const start = async () => {
  try {
    app.listen(8080, () => {
      console.log(`REST API root url: http://localhost:8080/api`);
      console.log(`Enviroment: ${process.env.NODE_ENV}`);
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  start,
};
