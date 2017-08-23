module.exports = function(connection) {
    let add = (title, text, writer, callback) => {
        let sql = 'INSERT INTO note (title, text, writer) VALUES (?, ?, ?)';
        let params = [ title, text, writer ];
        
        connection.query(sql, params, (err, result) => {
            if (err) {
                throw err;
            }
            
            callback(result);
        });
    };

    let find = (id, callback) => {
        let sql = 'SELECT * FROM note WHERE id = ?';
        let params = [ id ];

        connection.query(sql, params, (err, result) => {
            if (err) {
                throw err;
            }

            callback(result);
        });
    };

    let findAll = (writer, callback) => {
        let sql = 'SELECT * FROM note WHERE writer = ?';
        let params = [ writer ];

        connection.query(sql, params, (err, result) => {
            if (err) {
                throw err;
            }

            callback(result);
        });
    };

    let update = (id, title, text, callback) => {
        let sql = 'UPDATE note SET title = ?, text = ? WHERE id = ?';
        let params = [title, text, id];

        connection.query(sql, params, (err, result) => {
            if (err) {
                throw err;
            }

            callback(result);
        });
    };
    
    let remove = (id, callback) => {
        let sql = 'DELETE FROM note WHERE id = ?'
        let params = [id];

        connection.query(sql, params, (err, result) => {
            if (err) {
                throw err;
            }

            callback(result);
        });
    };

    return { 
        add, find, findAll, update, remove
    };
}