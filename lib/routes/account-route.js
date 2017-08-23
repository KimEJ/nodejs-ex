module.exports = (server) => {
    server.plugins['hapi-mysql'].pool.getConnection((err, connection) => {
        let accountAction = require('../actions/account-action')(connection);

        // POST /auth/signup
        server.route({
            method: 'POST',
            path: '/accounts/signup',
            handler: accountAction.signUp
        });

        // POST /auth/signin
        server.route({
            method: 'POST',
            path: '/accounts/signin',
            handler: accountAction.signIn
        });

        // DELETE /accounts/signout
        server.route({
            method: 'DELETE',
            path: '/accounts/signout',
            handler: accountAction.signOut
        });

        // DELETE /accounts/secession
        server.route({
            method: 'DELETE',
            path: '/accounts/secession',
            handler: accountAction.secession
        });
    });
}