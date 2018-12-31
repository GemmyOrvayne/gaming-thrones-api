require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors');
const heart = require('./routes/heart')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(cors())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .post('/heart/:post', heart.postHeartPost)
  .get('/heart/:post', heart.getHeartPost)
  .get('/heart', heart.getHearts)
  .delete('/heart/:post', heart.deleteHeartPost)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
