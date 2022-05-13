const http = require('http');
const app = require('./app');

// port at which our project should run
//  yaa to environment khu se port egi else use 3000
const port = process.env.PORT || 3000;

// we'll pass a listener in create server which will do some ation
// when some is done.
const server = http.createServer(app);

server.listen(port);