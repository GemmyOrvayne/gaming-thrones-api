const { Pool } = require('pg')
const pool = new Pool()

// 1. connect to the database
// 2. connect this module to index.js
// 3. ensure that calling the /likes/Yule-Log

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// callback - checkout a client
const queryHeartCountByPost = function (postSlug, callback) {
  pool.connect((err, client, done) => {
    if (err) throw err
    client.query("select count(id) as heartCount from heart.heart where post = $1 group by post", [postSlug], callback)
    done()
  })
}
const createHeartForPost = function (postSlug, ip, device, callback) {
  pool.connect((err, client, done) => {
    if (err) throw err
    client.query("insert into heart.heart(post,ip,device) values ($1,$2,$3);", [postSlug, ip, device], callback)
    done()
  })
}

const getHeartsByIp = function (ip, callback) {
  pool.connect((err, client, done) => {
    if (err) throw err
    client.query("select * from heart.heart where ip=$1;", [ip], callback)
    done()
  })
}

const deleteHeartsByIp = function (ip, callback) {
  pool.connect((err, client, done) => {
    if (err) throw err
    client.query("delete from heart.heart where ip=$1;", [ip], callback)
    done()
  })
}

module.exports = {
  queryHeartCountByPost,
  createHeartForPost,
  getHeartsByIp,
  deleteHeartsByIp
}
