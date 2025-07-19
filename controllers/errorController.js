const errorController = {}

errorController.triggerError = async function (req, res, next) {
  // Intentionally throw a 500 error
  throw new Error("Intentional Server Error for testing purposes.")
}

module.exports = errorController
