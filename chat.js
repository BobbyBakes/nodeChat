const server = require('net').createServer();
console.log("---Listening to Sockets---");
let sockets = {};
let socketNumber = 0;

server.on('connection', socket => {
    console.log("Client Connected");
    socket.id = socketNumber++;
    sockets[socket.id] = socket;
    socket.write("Welcome Mr. " + socket.id + "\n")

    socket.on('data', data => {
        Object.entries(sockets).forEach(([key, s]) => {
            if (!(s.id === socket.id)) {
                s.write(socket.id + ':');
                s.write(data);
            }
        });
    });

    socket.on('end', () => {
        delete sockets[socket.id];
        console.log("Mr. " + socket.id + " has disconnected.\n");
    });
});

server.listen(8000, () => console.info("Server Bound"));
