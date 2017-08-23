const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 5000
});

server.register({
    register: require('hapi-mysql'),
    options: {
        host: 'localhost',
        database: 'DAILYDIARY',
        user: 'root',    // set your database username
        password: 'Djwlsznzld5090'    // set your database password
    }

}, (error) => {
    if (error) {
        throw error;
    }
});

server.register({
    register: require('yar'),
    options: {
        cookieOptions: {
            password: 'asdkfjaasdfjhawhfghusdvs9239482935',
            isSecure: false
        }
    }

}, (err) => {
    if (err) {
        throw err;
    }
});

let accountRoute = require('./lib/routes/account-route');
accountRoute(server);

let noteRoute = require('./lib/routes/note-route');
noteRoute(server);

server.start(() => {
    console.log(`server was started at: ${server.info.uri}`);
});
