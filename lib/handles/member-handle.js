module.exports = (connection) => {
    let add = (email, password, callback) => {
        let sql = 'INSERT INTO member (email, password) VALUES (?, ?)';
        let params = [email, password];

        connection.query(sql, params, (error, result) => {
            if (error) {
                throw error;
            }

            callback(result);
        });
    };

    let find = (email, password, callback) => {
        let sql = 'SELECT * FROM member WHERE email=? && password=?';
        let params = [email, password];

        connection.query(sql, params, (error, result) => {
            if (error) {
                throw error;
            }

            callback(result);
        });
    };

    let remove = (email, callback) => {
        let sql = 'DELETE FROM member WHERE email=?';
        let params = [email];

        connection.query(sql, params, (error, result) => {
            if (error) {
                throw error;
            }

            callback(result);
        });
    };

    let removeAll = (email, callback) => {
        let sql = 'DELETE FROM note WHERE writer=?';
        let params = [email];

        connection.query(sql, params, (error, result) => {
            if (error) {
                throw error;
            }

            callback(result);
        });
    };

    return {
        add, find, remove, removeAll
    };
}
