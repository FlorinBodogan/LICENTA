const db = require('../util/database');

module.exports = class UserInfo {
    constructor(gender, age, height, weight, activitylevel, date, user){
        this.gender = gender;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.activitylevel = activitylevel;
        this.date = date;
        this.user = user;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM userinfo');
    }

    static fetchRmbById(token) {
        return db.execute(`SELECT * FROM userinfo WHERE user=${token.userId}`);
    }

    static fetchRmbResultById(userId) {
        return db.execute(`SELECT * FROM rmb_results WHERE user = ? ORDER BY id DESC LIMIT 1`, [userId]);
    }

    static fetchRmbAllResultById(userId) {
        return db.execute(`SELECT result FROM rmb_results WHERE user = ? ORDER BY id`, [userId]);
    }

    static fetchRmbDateById(userId) {
        return db.execute(`SELECT date FROM rmb_results WHERE user = ? ORDER BY id DESC LIMIT 1`, [userId]);
    }

    static fetchRmbAllDateById(userId) {
        return db.execute(`SELECT date FROM rmb_results WHERE user = ? ORDER BY id`, [userId]);
    }

    static fetchBmiResultById(userId) {
        return db.execute(`SELECT * FROM bmi_results WHERE user = ? ORDER BY id DESC LIMIT 1`, [userId]);
    }

    static fetchBmiAllResultById(userId) {
        return db.execute(`SELECT result FROM bmi_results WHERE user = ? ORDER BY id`, [userId]);
    }

    static fetchBmiDateById(userId) {
        return db.execute(`SELECT date FROM bmi_results WHERE user = ? ORDER BY id DESC LIMIT 1`, [userId]);
    }

    static fetchBmiAllDateById(userId) {
        return db.execute(`SELECT date FROM bmi_results WHERE user = ? ORDER BY id`, [userId]);
    }

    static saveDetailsForRmb(rmb) {
        return db.execute(
            'INSERT INTO userinfo (gender, age, height, weight, activitylevel, user) VALUES (?, ?, ?, ?, ?, ?)',
            [rmb.gender, rmb.age, rmb.height, rmb.weight, rmb.activitylevel, rmb.user]
        );
    }

    static saveDetailsForBmi(bmi) {
        return db.execute(
            'INSERT INTO userinfo ( weight, height, user) VALUES (?, ?, ?)',
            [bmi.weight, bmi.height, bmi.user]
        );
    }
    
    static saveRmbResult(rmb) {
        return db.execute(
          'INSERT INTO rmb_results (result, user) VALUES (?, ?)',
          [rmb.resultRmb, rmb.user]
        );
    }

    static saveBmiResult(bmi) {
        return db.execute(
          'INSERT INTO bmi_results (result, user) VALUES (?, ?)',
          [bmi.resultBmi, bmi.user]
        );
    }
    
    static calculateRmb(rmbDetails) {
        if (isNaN(rmbDetails.weight) || isNaN(rmbDetails.height) || isNaN(rmbDetails.age)) {
            throw new Error("Valori invalide");
        }

        let rmb;
        if (rmbDetails.gender === "masculin") {
            rmb = 88.362 + (13.397 * rmbDetails.weight) + (4.799 * rmbDetails.height) - (5.677 * rmbDetails.age);
        } else {
            rmb = 447.593 + (9.247 * rmbDetails.weight) + (3.098 * rmbDetails.height) - (4.330 * rmbDetails.age);
        }
        if(rmbDetails.activitylevel === "sedentar") {
            return rmb * 1.2;
        } else if (rmbDetails.activitylevel === "scazut") {
            return rmb * 1.375;
        } else if (rmbDetails.activitylevel === "moderat") {
            return rmb * 1.55;
        } else if (rmbDetails.activitylevel === "ridicat") {
            return rmb * 1.725;
        } else if (rmbDetails.activitylevel === "foarteridicat") {
            return rmb * 1.9;
        }
    }

    static calculateBmi(bmiDetails) {
        if (isNaN(bmiDetails.weight) || isNaN(bmiDetails.height)) {
            throw new Error("Valori invalide");
        }
    
        const bmi = bmiDetails.weight / (bmiDetails.height * bmiDetails.height);
        return bmi.toFixed(2);
    }
    

    static delete(id) {
        return db.execute('DELETE FROM userinfo WHERE id = ?', [id]);
    }
};