const server = require('net').createServer();
const randomName = require('random-name');
console.log("---Listening to Sockets---");
let sockets = {};

server.on('connection', socket => {
    console.log("Client Connected");
    socket.name = randomName.first();
    sockets[socket.name] = socket;
    socket.write("Welcome Mr. " + socket.name + "\n")

    socket.on('data', data => {
        Object.entries(sockets).forEach(([key, s]) => {
            if (!(s.name === socket.name)) {
                s.write(socket.name + ': ');
                s.write(data);
            }
        });
    });

    socket.on('end', () => {
        delete sockets[socket.name];
        console.log("Mr. " + socket.name + " has disconnected.\n");
    });
});

server.listen(8000, () => console.info("Server Bound"));
