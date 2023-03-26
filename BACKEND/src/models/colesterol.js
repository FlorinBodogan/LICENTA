const db = require('../util/database');

module.exports = class Colesterol {
    constructor(hdl, ldl, triglycerides, user){
        this.hdl = hdl;
        this.ldl = ldl;
        this.triglycerides = triglycerides;
        this.user = user;
    }

    static calculateColesterol(colesterolDetails) {
        if (isNaN(colesterolDetails.hdl) || isNaN(colesterolDetails.ldl || isNaN(colesterolDetails.triglycerides))) {
          throw new Error("Valori invalide");
        }
        
        const colesterolHDL = parseInt(colesterolDetails.hdl);
        const colesterolLDL = parseInt(colesterolDetails.ldl);
        const colesterolTriglycerides = parseInt(colesterolDetails.triglycerides);

        const colesterol = colesterolHDL + colesterolLDL + 0.2 * colesterolTriglycerides;
        let category = "";

        if (colesterol <= 200) {
          category = "Normal";
          console.log(category);
        } else if (200 <= colesterol && colesterol <= 239) {
          category = "Limita Normalului";
          console.log(category);
        } else if (240 <= colesterol) {
          category = "Ridicat";
        }
        return category;
    }

    static saveDetailsForCOL(col) {
        return db.execute(
            'INSERT INTO colesterol (hdl, ldl, triglycerides, user) VALUES (?, ?, ?, ?)',
            [col.hdl, col.ldl, col.triglycerides, col.user]
        );
    }
  
    static saveCOLResult(col) {
      return db.execute(
        'INSERT INTO colesterol (hdl, ldl, triglycerides, result, user) VALUES (?, ?, ?, ?, ?)',
        [col.hdl, col.ldl, col.triglycerides, col.resultCOL, col.user]
      );
    }
  
    static fetchCOLResultById(userId) {
      return db.execute(`SELECT * FROM colesterol WHERE user = ? ORDER BY id DESC LIMIT 1`, [userId]);
    }
  
    static fetchAllCOLResultById(userId) {
      return db.execute(`SELECT result FROM colesterol WHERE user = ? ORDER BY id`, [userId]);
    }
  
    static fetchAllCOLDateById(userId) {
      return db.execute(`SELECT created FROM colesterol WHERE user = ? ORDER BY id`, [userId]);
    }

    static fetchCOLResultForAll() {
      return db.execute(`
      SELECT ui.user, ui.result
      FROM colesterol ui
      INNER JOIN (
        SELECT user, MAX(id) AS max_id
        FROM colesterol
        GROUP BY user
      ) max_ids
      ON ui.user = max_ids.user AND ui.id = max_ids.max_id`
      );
    }
  
    static async getCountForCOL(result) {
      try {
        const [rows, fields] = await db.execute(
          'SELECT COUNT(*) AS count FROM colesterol WHERE result = ?',
          [result]
        );
        return rows[0].count;
      } catch (e) {
        throw new Error(`A avut loc o eroare`);
      }
    }

    static fetchCOLById(userId) {
      return db.execute(`SELECT result FROM colesterol WHERE user = ? ORDER BY id DESC LIMIT 1`, [userId]);
    }

}