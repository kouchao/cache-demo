module.exports = function getData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('this is data')
    }, 3000)
  })
}