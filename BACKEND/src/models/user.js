const db = require('../util/database');

module.exports = class User {
    constructor(name, email, password, role){
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
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
            'INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)',
            [user.name, user.email, user.password, user.role]
        );
    }

    //FOR ADMIN 
    static getUser(id) {
        return db.execute(
            'SELECT * FROM user WHERE id = ?', [id]
        );
    }

    static getAllUsers() {
        return db.execute(
            'SELECT name, email, role, status FROM user WHERE name <> "admin"'
        ).then(([rows]) => {
            return rows.map(row => ({
            name: row.name.toString(),
            email: row.email.toString(),
            role: row.role.toString(),
            status: row.status.toString()
            }));
        });
    }

    static updateUser(userId, user) {
        return db.execute(
            'UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?',
            [user.name, user.email, user.password, userId]
        );
    }

    static updateUserByAdmin(update) {
    let query = 'UPDATE user SET';
    const params = [];

    if (update.name) {
        query += ' name = ?,';
        params.push(update.name);
    }

    if (update.email) {
        query += ' email = ?,';
        params.push(update.email);
    }

    if (params.length === 0) {
        throw new Error('No update parameters provided');
    }
    query = query.slice(0, -1);

    query += ' WHERE name = ?';
    params.push(update.userName);

    return db.execute(query, params);
    }

    static banUser(userName) {
        return db.execute(
            'UPDATE user SET status = "banat" WHERE name = ?',
            [userName]
        );
    }

    static unBanUser(userName) {
        return db.execute(
            'UPDATE user SET status = "activ" WHERE name = ?',
            [userName]
        );
    }

    static deleteUserByAdmin(userName) {
        return db.execute(
            'DELETE FROM user WHERE name = ?',
            [userName]
        );
    }
};