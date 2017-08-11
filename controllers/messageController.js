var User = require('../models/user');

module.exports.sendMessage = function (socket, fromId, toId, message) {

  User.findOne({'_id' : toId}, function (err, user) {

    if (err) throw err;

    for (var i = 0; i < user.socketIDs.length; i++){
      socket.broadcast.to(user.socketIDs[i]).emit('sendMsg',{
        message: message,
        fromId: fromId
      });
    }
  })
}
