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

    //istoric personal
    static fetchWeightById(userId) {
        return db.execute(`SELECT weight FROM userinfo WHERE user = ? ORDER BY id DESC LIMIT 1`, [userId]);
    }


    //NIVEL DE ACTIVITATE
    static fetchActivityLevelForAll() {
        return db.execute(`
          SELECT ui.user, ui.activitylevel
          FROM userinfo ui
          INNER JOIN (
            SELECT user, MAX(id) AS max_id
            FROM userinfo
            GROUP BY user
          ) max_ids
          ON ui.user = max_ids.user AND ui.id = max_ids.max_id
        `);
    }
      
    static async getCountForActivity(activity) {
        try {
          const [rows, fields] = await db.execute(
            'SELECT COUNT(*) AS count FROM userinfo WHERE activitylevel = ?',
            [activity]
          );
          return rows[0].count;
        } catch (e) {
          throw new Error(`A avut loc o eroare`);
        }
    }

    //RATA METABOLICA BAZALA
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

    static saveDetailsForRmb(rmb) {
        return db.execute(
            'INSERT INTO userinfo (gender, age, height, weight, activitylevel, user) VALUES (?, ?, ?, ?, ?, ?)',
            [rmb.gender, rmb.age, rmb.height, rmb.weight, rmb.activitylevel, rmb.user]
        );
    }

    static saveRmbResult(rmb) {
        return db.execute(
          'INSERT INTO rmb_results (result, user) VALUES (?, ?)',
          [rmb.resultRmb, rmb.user]
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

    //INDICE DE MASA CORPORALA
    static fetchBmiResultById(userId) {
        return db.execute(`SELECT * FROM bmi_results WHERE user = ? ORDER BY id DESC LIMIT 1`, [userId]);
    }

    static fetchBmiAllResultById(userId) {
        return db.execute(`SELECT result FROM bmi_results WHERE user = ? ORDER BY id`, [userId]);
    }

    static fetchBmiAllResult() {
        return db.execute(`SELECT result FROM bmi_results ORDER BY id`);
    }

    static fetchBmiAllCategories() {
        return db.execute(`SELECT br.user, br.category
        FROM bmi_results br
        INNER JOIN (
          SELECT user, MAX(id) AS max_id
          FROM bmi_results
          GROUP BY user
        ) max_ids
        ON br.user = max_ids.user AND br.id = max_ids.max_id
        `);
    }

    static fetchBmiDateById(userId) {
        return db.execute(`SELECT date FROM bmi_results WHERE user = ? ORDER BY id DESC LIMIT 1`, [userId]);
    }

    static fetchBmiAllDateById(userId) {
        return db.execute(`SELECT date FROM bmi_results WHERE user = ? ORDER BY id`, [userId]);
    }

    static saveDetailsForBmi(bmi) {
        return db.execute(
            'INSERT INTO userinfo ( weight, height, user) VALUES (?, ?, ?)',
            [bmi.weight, bmi.height, bmi.user]
        );
    }

    static saveBmiResult(bmi) {
        return db.execute(
          'INSERT INTO bmi_results (result,category, user) VALUES (?, ?, ?)',
          [bmi.resultBmi, bmi.user]
        );
    }

    static saveBmiResult(bmi) {
        return db.execute(
          'INSERT INTO bmi_results (result, category, user) VALUES (?, ?, ?)',
          [bmi.resultBmi, bmi.category, bmi.user]
        );
    }

    static calculateBmi(bmiDetails) {
        if (isNaN(bmiDetails.weight) || isNaN(bmiDetails.height)) {
          throw new Error("Valori invalide");
        }
      
        const bmi = bmiDetails.weight / (bmiDetails.height * bmiDetails.height);
        const roundedBmi = bmi.toFixed(2);
      
        let category = "";
        if (roundedBmi < 18.5) {
          category = "Subponderal";
        } else if (18.5 <= roundedBmi && roundedBmi < 25) {
          category = "Normal";
        } else if (25 <= roundedBmi && roundedBmi < 30) {
          category = "Supraponderal";
        } else if (roundedBmi >= 30) {
          category = "Obez";
        }
      
        return { bmi: roundedBmi, category };
    }

    static async getCountForBmiCategory(category) {
        try {
          const [rows, fields] = await db.execute(
            'SELECT COUNT(*) AS count FROM bmi_results WHERE category = ?',
            [category]
          );
          return rows[0].count;
        } catch (e) {
          throw new Error(`A avut loc o eroare`);
        }
    }

    static delete(id) {
        return db.execute('DELETE FROM userinfo WHERE id = ?', [id]);
    }

    //TENSIUNE ARTERIALA


    //COLESTEROL


    //TRIGLICERIDE
    
};