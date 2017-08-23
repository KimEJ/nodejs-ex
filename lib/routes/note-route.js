module.exports = (server) => {
    server.plugins['hapi-mysql'].pool.getConnection((err, connection) => {
        let noteAction = require('../actions/note-action')(connection);

        // GET /notes
        server.route({
            method: 'GET',
            path: '/notes',
            handler: noteAction.findAllNotes
        });

        // GET /notes/:id
        server.route({
            method: 'GET',
            path: '/notes/{id}',
            handler: noteAction.findNote
        });

        // POST /notes
        server.route({
            method: 'POST',
            path: '/notes',
            handler: noteAction.addNote
        });

        // PUT /notes/:id
        server.route({
            method: 'PUT',
            path: '/notes/{id}',
            handler: noteAction.updateNote
        });

        // DELETE /notes/:id
        server.route({
            method: 'DELETE',
            path: '/notes/{id}',
            handler: noteAction.removeNote
        });
    });
}