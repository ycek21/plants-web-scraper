const fs = require('fs');
const { promisify } = require('util')

const mkdirAsync = promisify(fs.mkdir)
const existsAsync = promisify(fs.exists)

const createDirectory = async (dirPath) => {
  if (!await existsAsync(dirPath)) {
    return mkdirAsync(dirPath, { recursive: true })
  }
}

module.exports = {
  createDirectory
}
