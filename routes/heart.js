const heart = require('../utils/heart')
const {pathOr} = require('ramda')

const postHeartPost = function (req, response) {
  // heart.heartPost({post:req.params.post, ip:req.ip, device:req.cookies.device})
  const result = heart.heartPost({post:req.params.post, ip:req.ip, device:pathOr('',['cookies','device'],req)})
  response.json({'success':1})
}

const getHeartPost = function (req, response) {
  heart.getHeartCountByPost(req.params.post, (err, result) => {
    if (err) throw err
    let heartCount = 0
    if (result.hasOwnProperty('rows') && result.rows.length > 0) {
      heartCount = result.rows[0].heartcount
    }
    response.json({'heartCount':parseInt(heartCount)})
  })
}

const getHearts = function (req, response) {
  heart.getHeartsByIp(req.ip, (err, result) => {
    if (err) throw err
    const hearts = result.rows
    response.json({hearts})
  })
}

const deleteHeartPost = function (req, response) {
  heart.deleteHeartsByIp(req.ip, (err, result) => {
    if (err) throw err
    const hearts = result.rows
    response.json({hearts})
  })
}

module.exports = {
  postHeartPost,
  getHeartPost,
  getHearts,
  deleteHeartPost,
}
