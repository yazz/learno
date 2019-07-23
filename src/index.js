const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.send('<div style="font-size:50px;font-family: helvetica; font-weight:bold;">Learno</div>')
});

app.listen(80, () => {
  console.log('Example app listening on port 80!')
});
