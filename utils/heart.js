const heartDb = require('./database/heart')
module.exports = {
  getHeartCountByPost(post, callback) {
    return heartDb.queryHeartCountByPost(post, callback)
  },
  heartPost(heartData, callback) {
    return heartDb.createHeartForPost(heartData.post, heartData.ip, heartData.device, callback)
  },
  getHeartsByIp(ip, callback) {
    return heartDb.getHeartsByIp(ip, callback)
  },
  deleteHeartsByIp(ip, callback) {
    return heartDb.deleteHeartsByIp(ip, callback)
  }
}
