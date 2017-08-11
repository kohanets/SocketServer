var User = require('../models/user');

module.exports.getUsers = function (io) {

  User.aggregate([
    {
      $project: {
        email: 1,
        socketIDs: 1,
        numberOfSockets: { $size: "$socketIDs" }
      }
    },
    {
      $match: {
        numberOfSockets: {$gt: 0}
      }
    }
  ], function (err, users) {
    io.emit('userList',users);
  })
}

module.exports.addSocketSesion = function (userId, socketId, io) {

  User.findOne({'_id' : userId}, function (err, user) {

    if (err) throw err;

    user.socketIDs.push(socketId);

    User.update({'_id' : userId}, user, function (err, result){
     if (err) throw err;

      exports.getUsers(io);

    });

  })

}

module.exports.killAllSocketSesion = function (userId,io) {

  User.findOne({'_id' : userId}, function (err, user) {

    if (err) throw err;

    user.socketIDs = [];

    User.update({'_id' : userId}, user, function (err, result){
      if (err) throw err;

      exports.getUsers(io);

    });

  })

}

module.exports.deleteSocketSesion = function (userId, socketId,io) {

  User.findOne({'_id' : userId}, function (err, user) {

    if (err) throw err;

    for (var i = 0; i < user.socketIDs.length; i++){
      if (user.socketIDs[i] === socketId) {
        user.socketIDs.splice(i,1);
      }
    }

    User.update({'_id' : userId}, user, function (err, result){
      if (err) throw err;

      exports.getUsers(io);

    });

  })

}
