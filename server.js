var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

connections = [];
// userrooms = {};

app.use(express.static(__dirname + '/'));

//set up port for server
const port = 4001;
server.listen(port);
console.log('Server Started');

app.get('/:room', function(req, res) {
    //given_room = req.params.room
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
    //connect socket
	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);
	//joining room
	console.log(socket.username + " joined room Test")
	socket.join("Test");

	//disconnect
	socket.on('disconnect', function(data) {
		connections.splice(connections.indexOf(socket), 1)
		console.log('Disconnected: %s sockets connected', connections.length);
	});

	// //change vid
	// var currVideo = io.sockets.adapter.rooms['est'].currVideo.yt
	// socket.emit('changeVideoClient', {
	// 	videoId: currVideo
	// });

	//------------------------Video Functions------------------------
	//sends video to all clients
	socket.on('get video', function(data) {
		//console.log("vid done")
		io.sockets.in("Test").emit('getVideoClient', data);
	});

    //sends video list to all clients
	socket.on('display list', function(data) {
		//console.log("disp done")
		io.sockets.in("Test").emit('getListClient', data)
	});

	socket.on('changePP', function(data) {
		console.log("PP changed")
		io.sockets.in("Test").emit('changePPClient', data)
	})

	socket.on('update history', function(data) {
		console.log("history updated")
		io.sockets.in("Test").emit('updateHistoryClient', data);
	});

	socket.on('update queue', function(data) {
		console.log("queue updated")
		io.sockets.in("Test").emit('updateQueueClient', data);
	})

	socket.on('update volume', function(data) {
		console.log("volume updated")
		io.sockets.in("Test").emit('updateVolumeClient', data);
	})

	// function updateRoomUsers(roomnum) {
	// 	if(io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined){
	// 		var roomUsers = io.sockets.adapter.rooms['room-' + socket.roomnum].users
	// 		io.sockets.in("room-" + roomnum).emit('get users', roomUsers)
	// 	}
	// }
})

// server.listen(port); 
// console.log('Listening on port ', port);
	