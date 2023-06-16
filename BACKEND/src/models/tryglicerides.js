const db = require('../util/database');

module.exports = class Triglycerides {
    constructor(colesterol, hdl, ldl, user){
        this.colesterol = colesterol;
        this.hdl = hdl;
        this.ldl = ldl;
        this.user = user;
    }

    static calculateTryglicerides(triglyceridesDetails) {
        if (isNaN(triglyceridesDetails.colesterol) || isNaN(triglyceridesDetails.hdl) || isNaN(triglyceridesDetails.ldl)) {
          throw new Error("Valori invalide");
        }
        
        const colesterol = triglyceridesDetails.colesterol;
        const triglyceridesHDL = triglyceridesDetails.ldl;
        const triglyceridesLDL = triglyceridesDetails.hdl;

        const triglycerides = 5 * (colesterol - triglyceridesHDL - triglyceridesLDL);
        let category = "";

        if (triglycerides <= 150) {
          category = "Normal";
        } else if (151 <= triglycerides && triglycerides <= 199) {
          category = "Limita Normalului";
        } else if (200 <= triglycerides && triglycerides <= 500) {
          category = "Ridicat";
        } else if (500 <= triglycerides) {
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

    static fetchAllTRResultWithParamsById(userId) {
      return db.execute(`SELECT colesterol, hdl, ldl, result, created FROM triglycerides WHERE user = ? ORDER BY id DESC`, [userId]);
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