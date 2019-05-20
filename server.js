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
		console.log("vid done")
		io.sockets.in("Test").emit('getVideoClient', data);
	});

    //sends video list to all clients
	socket.on('display list', function(data) {
		console.log("disp done")
		io.sockets.in("Test").emit('changeListClient', data)
	});

	socket.on('change source', function(data){
		var source = data
		io.sockets.in("Test").emit('changeSourceClient', source);
	});
	// socket.on('play other', function(data) {
	// 	var roomnum = data.room
	// 	socket.broadcast.to("room-" + roomnum).emit('justPlay');
	// });
	// socket.on('pause other', function(data) {
	// 	var roomnum = data.room
	// 	socket.broadcast.to("room-" + roomnum).emit('justPause');
	// });
	// socket.on('seek other', function(data) {
	// 	var roomnum = data.room
	// 	var currTime = data.time
	// 	socket.broadcast.to("room-" + roomnum).emit('justSeek', {
	// 		time: currTime
	// 	});
	// });

	//sync
	socket.on('sync video', function(data) {
		if(io.sockets.adapter.rooms['rooms-' + socket.roomnum] !== undefined) {
			var roomnum = data.room
			var currTime = data.time
			var state = data.state
			var videoId = data.videoId
			var playerId = io.sockets.adapter.rooms['room-' + roomnum].currPlayer

			io.sockets.in('room-' + roomnum).emit('syncVideoClient', {
				time: currTime,
				state: state,
				videoId: videoId,
				playerId: playerId
			})
		}
	});

	//change video
	socket.on('change video', function(data) {
		if(io.sockets.adapter.rooms['rooms-' + socket.roomnum] !== undefined){
			var roomnum = data.room
			var time = data.time
			var videoId = data.videoId
			var host = io.sockets.adapter.rooms['rooms-' + socket.roomnum].host

			io.sockets.adapter.rooms['rooms-' + socket.roomnum].currVideo.yt = videoId

			io.sockets.in("room-" + roomnum).emit('changeVideoClient', {
				videoId: videoId
			})
		}
	});

	// //new user
	// socket.on('new user', function(data, callback)){
	// 	callback(true);
	// 	var encodedUser = data.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	// 	socket.username = encodedUser;
	// 	users.push(socket.username);
	// }

	function updateRoomUsers(roomnum) {
		if(io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined){
			var roomUsers = io.sockets.adapter.rooms['room-' + socket.roomnum].users
			io.sockets.in("room-" + roomnum).emit('get users', roomUsers)
		}
	}
})

// server.listen(port); 
// console.log('Listening on port ', port);
	