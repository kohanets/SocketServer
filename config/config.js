module.exports.setConfig = function () {
  process.env.MONGOOSE_CONNECT = "mongodb://terry:12345@ds135830.mlab.com:35830/chatio";
  process.env.SECRET = "supersecretkey";
}
