const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { json, urlencoded } = require('body-parser');

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/api/hello-world', (req, res, next) => {
  res.status(200).json({ message: "Hello World!" })
});

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
