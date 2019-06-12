const fs = require('fs')

export default new function () {
  this.scan = async function (rootDir, handleFile) {
    if (rootDir === '' || rootDir === '/') {
      console.error('Error: directory to scan cannot be empty.')
      console.error('If you want to scan your script location, please use "dir2array.Scan(__dirname);"')
      return null
    }

    if (rootDir.slice(-1) !== '/') {
      rootDir += '/'
    }

    if (!this.dirExists(rootDir)) {
      return
    }

    const recursiveDir = async dir => {
      return fs.readdirSync(dir).sort().reduce(async (handleFilePromise, item) => {
        await handleFilePromise

        const dirItem = dir + item

        if (this.dirExists(dirItem)) {
          return recursiveDir(dirItem + '/')
        }

        return handleFile(dirItem)
      }, Promise.resolve())
    }

    return recursiveDir(rootDir)
  }

  this.dirExists = function (dir) {
    try {
      return fs.lstatSync(dir).isDirectory()
    } catch (error) {
      return false
    }
  }

  this.fileExists = function (filename) {
    try {
      return fs.existsSync(filename)
    } catch (error) {
      return false
    }
  }
}()
