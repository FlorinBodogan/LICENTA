const db = require('../util/database');
const multer = require('multer');

module.exports = class Images {
    constructor(image, user){
        this.image = image;
        this.user = user;
    }

    static insertImage() {
        return db.execute(
            'INSERT INTO images (name) VALUES (?)'
        );
    }

    static saveImage(images) {
        return db.execute('INSERT INTO images (image, user) VALUES (?, ?)', [images.image, images.user]);
    }

    static fetchById(token) {
        return db.execute(`SELECT * FROM images WHERE user=${token.userId}`);
    }
};