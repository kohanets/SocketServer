var usersController = require('../controllers/usersController');
var messageController = require('../controllers/messageController');

module.exports = function (io) {

  users = [];

  user_ID = ''

  io.on('connection', function(socket){

    socket.on('recognize', function(userId){

      user_ID = userId;

      usersController.addSocketSesion(userId,socket.id,io);

    });

    socket.on('getMsg', function(data){
      messageController.sendMessage(socket,data.fromId,data.toId,data.message);
    });

    socket.on('disconnect',function(){;

      usersController.deleteSocketSesion(user_ID,socket.id,io);


    });

    socket.on('logout',function () {

      usersController.killAllSocketSesion(user_ID,io);

    })

  })
}
