const db = require('../util/database');

module.exports = class User {
    constructor(name, email, password){
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static findUser(name) {
        return db.execute(
            'SELECT * FROM user WHERE name = ?', [name]
        );
    }

    static fetchUserById(token) {
        return db.execute(`SELECT * FROM user WHERE id=${token.userId}`);
    }

    static findEmail(email) {
        return db.execute(
            'SELECT * FROM user WHERE email = ?', [email]
        );
    }

    static save(user) {
        return db.execute(
            'INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
            [user.name, user.email, user.password]
        );
    }

    static getUser(id) {
        return db.execute(
            'SELECT * FROM user WHERE id = ?', [id]
        );
    }

    static updateUser() {
        return db.execute(
            'UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?',
            [user.name, user.email, user.password, user.id]
        );
    }
};