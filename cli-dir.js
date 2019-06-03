const fs = require('fs')

export default new function () {
  this.scan = function (dir) {
    if (dir === '' || dir === '/') {
      console.error('Error: directory to scan cannot be empty.')
      console.error('If you want to scan your script location, please use "dir2array.Scan(__dirname);"')
      return null
    }

    if (dir.slice(-1) !== '/') {
      dir += '/'
    }

    if (this.dirExists(dir)) {
      return this.recursiveDir(dir)
    }
  }

  this.recursiveDir = function (dir) {
    const result = []

    fs.readdirSync(dir).forEach(item => {
      const dirItem = dir + item
      if (this.isDir(dirItem)) {
        const result2 = this.recursiveDir(dirItem + '/')
        result2.forEach(r => result.push(r))
      } else {
        result.push(dirItem)
      }
    })

    return result
  }

  this.isDir = function (item) {
    return fs.lstatSync(item).isDirectory()
  }

  this.dirExists = function (dir) {
    try {
      const stats = fs.lstatSync(dir)
      return stats.isDirectory()
    } catch (error) {
      return false
    }
  }
}()
