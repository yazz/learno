const express       = require('express')
const fs            = require('fs')
const compression   = require('compression')

const app = express();
app.use(compression())

app.get('/', (req, res) => {
  res.send(fs.readFileSync("public/index.html").toString())
});

app.listen(80, () => {
  console.log('Example app listening on port 80!')
});
