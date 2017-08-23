module.exports = (connection) => {
    let noteHandle = require('../handles/note-handle')(connection);

    let addNote = (request, reply) => {
        try {
            let account = request.yar.get('account');

            if (account) {
                let { email } = account;
                let { title, text } = request.payload;

                noteHandle.add(title, text, email, (result) => {
                    reply(null).code(200);
                });
            } else {
                reply(null).code(401);
            }
        } catch (e) {
            reply(null).code(500);
        }
    };

    let findAllNotes = (request, reply) => {
        try {
            let account = request.yar.get('account');

            if (account) {
                let { email } = account;

                noteHandle.findAll(email, (result) => {
                    let notes = result.map((item) => {
                        let { id, title } = item;
                        return { id, title };
                    });

                    reply(notes).code(200);
                });
            } else {
                reply(null).code(401);
            }
        } catch (e) {
            reply(null).code(500);
        }
    };

    let findNote = (request, reply) => {
        try {
            let account = request.yar.get('account');

            if (account) {
                let { id } = request.params;
                let { email } = account;

                noteHandle.find(id, (result) => {
                    if (result.length == 1) {
                        let note = { id, title, text, writer } = result[0];

                        if (note.writer === email) {
                            reply(result).code(200);
                        } else {
                            reply(null).code(403);
                        }
                    } else {
                        reply(null).code(404);
                    }
                });
            } else {
                reply(null).code(401);
            }
        } catch (e) {
            reply(null).code(500);
        }
    };

    let updateNote = (request, reply) => {
        try {
            let account = request.yar.get('account');

            if (account) {
                let { id } = request.params;
                let { email } = account;
                let { title, text } = request.payload;

                noteHandle.find(id, (result) => {
                    if (result.length == 1) {
                        let { writer } = result[0];

                        if (writer === email) {
                            noteHandle.update(id, title, text, (result) => {
                                reply(null);
                            });
                        } else {
                            reply(null).code(403);
                        }
                    } else {
                        reply(null).code(404);
                    }
                });
            } else {
                reply(null).code(401);
            }
        } catch (e) {
            reply(e).code(500);
        }
    };

    let removeNote = (request, reply) => {
        try {
            let account = request.yar.get('account');

            if (account) {
                let { id } = request.params;
                let { email } = account;

                noteHandle.find(id, (result) => {
                    if (result.length == 1) {
                        let note = { id, title, text, writer } = result[0];

                        if (note.writer === email) {
                            noteHandle.remove(id, (result) => {
                                reply(null).code(200);
                            });
                        } else {
                            reply(null).code(403);
                        }
                    } else {
                        reply(null).code(404);
                    }
                });
            } else {
                reply(null).code(401);
            }
        } catch (e) {
            reply(null).code(500);
        }
    };

    return {
        addNote, findAllNotes, findNote, updateNote, removeNote
    }
}
