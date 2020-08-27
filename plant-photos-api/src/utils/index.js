const fs = require('fs');
const { promisify } = require('util')

const mkdirAsync = promisify(fs.mkdir)
const rmdirAsync = promisify(fs.rmdir)

const createDirectoryRecursively = async (dirPath) => {
  return mkdirAsync(dirPath, { recursive: true })
}

const deleteDirectoryRecursively = async (dirPath) => {
  return rmdirAsync(dirPath, { recursive: true })
}

module.exports = {
  createDirectoryRecursively,
  deleteDirectoryRecursively
}
