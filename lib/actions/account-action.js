module.exports = (connection) => {
    let memberHandle = require('../handles/member-handle')(connection);

    let signIn = (request, reply) => {
        try {
            if (!request.yar.get('account')) {
                let { email, password } = request.payload;

                memberHandle.find(email, password, (result) => {
                    if (result.length == 1) {
                        request.yar.set('account', { email, password });
                        reply(null).code(200);
                    } else {
                        reply(null).code(404);
                    }
                });
            } else {
                reply(null).code(403);
            }
        } catch (e) {
            console.error(e);
            reply(null).code(500);
        }
    };

    let signUp = (request, reply) => {
        try {
            let { email, password } = request.payload;

            memberHandle.find(email, password, (result) => {
                if (result.length > 0) {
                    reply(null).code(403);
                } else {
                    memberHandle.add(email, password, (result) => {
                        reply(null).code(200);
                    });
                }
            });
        } catch (e) {
            console.error(e);
            reply(null).code(500);
        }
    };

    let signOut = (request, reply) => {
        try {
            let account = request.yar.get('account');

            if (account) {
                request.yar.reset();
                reply(null).code(200);
            } else {
                reply(null).code(401);
            }
        } catch (e) {
            console.error(e);
            reply(null).code(500);
        }
    };

    let secession = (request, reply) => {
        try {
            let account = request.yar.get('account');

            if (account) {
                let { email } = account;

                memberHandle.removeAll(email, (result) =>{
                    memberHandle.remove(email, (result) =>{
                        request.yar.reset();
                    });
                });
            }else{
                reply(null).code(401);
            }
        } catch (e) {
            console.error(e);
            reply(null).code(500);
        }
    };

    return {
        signIn, signUp, signOut, secession
    };
};
