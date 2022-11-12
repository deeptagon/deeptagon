const etag = require('etag')
const sample = require("./mock/sample.json")
const ETag = `W/${etag(JSON.stringify(sample))}`

module.exports = (req, res) => {
  if (req.headers["if-none-match"] === ETag) {
    res.status(304).send()
    return
  } else {
    res.setHeader('ETag', ETag)
      .status(200)
      .send(sample);
  }

}