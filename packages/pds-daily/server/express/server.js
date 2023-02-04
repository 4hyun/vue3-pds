const express = require('express')

const app = express()
const port = 3034

app.get('/', (req, res) => {
  const { headers } = req
  res
    .header({
      'x-custom-stuff': 'custom stuff here',
      'Access-Control-Allow-Origin': '*',
    })
    .send({ headers, result: 'OK' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
