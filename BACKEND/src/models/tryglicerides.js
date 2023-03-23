const db = require('../util/database');

module.exports = class Tryglicerides {
    constructor(colesterol, hdl, ldl, user){
        this.colesterol = colesterol;
        this.hdl = hdl;
        this.ldl = ldl;
        this.user = user;
    }

    static calculateTryglicerides(trygliceridesDetails) {
        if (isNaN(trygliceridesDetails.colesterol) || isNaN(trygliceridesDetails.hdl) || isNaN(trygliceridesDetails.ldl)) {
          throw new Error("Valori invalide");
        }
        
        const colesterol = trygliceridesDetails.colesterol;
        const trygliceridesHDL = trygliceridesDetails.ldl;
        const trygliceridesLDL = trygliceridesDetails.hdl;

        const tryglicerides = 5 * (colesterol - trygliceridesHDL - trygliceridesLDL);
        let category = "";

        if (tryglicerides <= 150) {
          category = "Normal";
        } else if (151 <= tryglicerides && tryglicerides <= 199) {
          category = "Limita Normalului";
        } else if (200 <= tryglicerides && tryglicerides <= 500) {
          category = "Ridicat";
        } else if (500 <= tryglicerides) {
          category = "Foarte Ridicat";
        }
        return category;
    }

    static saveDetailsForTR(tr) {
        return db.execute(
            'INSERT INTO tryglicerides (colesterol, hdl, ldl, user) VALUES (?, ?, ?, ?)',
            [tr.colesterol, tr.hdl, tr.ldl, tr.user]
        );
    }
  
    static saveTRResult(tr) {
      return db.execute(
        'INSERT INTO triglycerides (colesterol, hdl, ldl, result, user) VALUES (?, ?, ?, ?, ?)',
        [tr.colesterol, tr.hdl, tr.ldl, tr.resultTR, tr.user]
      );
    }
  
    static fetchTRResultById(userId) {
      return db.execute(`SELECT * FROM triglycerides WHERE user = ? ORDER BY id DESC LIMIT 1`, [userId]);
    }
  
    static fetchAllTRResultById(userId) {
      return db.execute(`SELECT result FROM triglycerides WHERE user = ? ORDER BY id`, [userId]);
    }
  
    static fetchAllTRDateById(userId) {
      return db.execute(`SELECT created FROM triglycerides WHERE user = ? ORDER BY id`, [userId]);
    }

    static fetchTRResultForAll() {
      return db.execute(`
      SELECT ui.user, ui.result
      FROM triglycerides ui
      INNER JOIN (
        SELECT user, MAX(id) AS max_id
        FROM triglycerides
        GROUP BY user
      ) max_ids
      ON ui.user = max_ids.user AND ui.id = max_ids.max_id`
      );
    }
  
    static async getCountForTR(result) {
      try {
        const [rows, fields] = await db.execute(
          'SELECT COUNT(*) AS count FROM triglycerides WHERE result = ?',
          [result]
        );
        return rows[0].count;
      } catch (e) {
        throw new Error(`A avut loc o eroare`);
      }
    }

    static fetchTRById(userId) {
      return db.execute(`SELECT result FROM triglycerides WHERE user = ? ORDER BY id DESC LIMIT 1`, [userId]);
    }

}