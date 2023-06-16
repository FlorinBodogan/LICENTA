const db = require('../util/database');

module.exports = class ArterialTension {
    constructor(sbp, dbp, date, user){
        this.sbp = sbp;
        this.dbp = dbp;
        this.date = date;
        this.user = user;
    }

    static calculateArterialTension(arterialTensionDetails) {
        if (isNaN(arterialTensionDetails.sbp) || isNaN(arterialTensionDetails.dbp)) {
          throw new Error("Valori invalide");
        }
      
        const arterialTensionSBP = arterialTensionDetails.sbp;
        const arterialTensionDBP = arterialTensionDetails.dbp;
      
        let category = "";
        if (arterialTensionSBP <= 120 && arterialTensionDBP <= 80) {
            category = "Optim";
        } else if (arterialTensionSBP >= 120 && arterialTensionSBP <= 129 && arterialTensionDBP >= 80 && arterialTensionDBP <= 84) {
            category = "Normal";
        } else if (arterialTensionSBP >= 130 && arterialTensionSBP <= 139 && arterialTensionDBP >= 85 && arterialTensionDBP <= 89) {
            category = "Normal crescut";
        } else if (arterialTensionSBP >= 140 && arterialTensionSBP <= 159 && arterialTensionDBP >= 90 && arterialTensionDBP <= 99) {
            category = "Gradul I de hipertensiune";
        } else if (arterialTensionSBP >= 160 && arterialTensionSBP <= 179 && arterialTensionDBP >= 100 && arterialTensionDBP <= 109) {
            category = "Gradul II de hipertensiune";
        } else if (arterialTensionSBP >= 180 && arterialTensionDBP >= 110) {
            category = "Gradul III de hipertensiune";
        } else if (arterialTensionSBP >= 140 && arterialTensionDBP < 90) {
            category = "Hipertensiune izolata sistolica";
        } else  {

          category = "Nedeterminat";
        }
        return category;    
  }

  static saveDetailsForAT(at) {
      return db.execute(
          'INSERT INTO arterialtension (sbp, dbp, user) VALUES (?, ?, ?)',
          [at.sbp, at.dbp, at.user]
      );
  }

  static saveATResult(at) {
    return db.execute(
      'INSERT INTO arterialtension (sbp, dbp, result, user) VALUES (?, ?, ?, ?)',
      [at.sbp, at.dbp, at.resultAT, at.user]
    );
  }

  static fetchATResultById(userId) {
    return db.execute(`SELECT * FROM arterialtension WHERE user = ? ORDER BY id DESC LIMIT 1`, [userId]);
  }

  static fetchAllATResultById(userId) {
    return db.execute(`SELECT result FROM arterialtension WHERE user = ? ORDER BY id`, [userId]);
  }

  static fetchAllATResultWithParamsById(userId) {
    return db.execute(`SELECT sbp, dbp, result, created FROM arterialtension WHERE user = ? ORDER BY id DESC`, [userId]);
  }

  static fetchAllATResultWithParamsById(userId) {
    return db.execute(`SELECT sbp, dbp, result, created FROM arterialtension WHERE user = ? AND result <> 'nedeterminat' ORDER BY id DESC`, [userId]);
  }

  static fetchATResultForAll() {
    return db.execute(`
    SELECT ui.user, ui.result
    FROM arterialtension ui
    INNER JOIN (
      SELECT user, MAX(id) AS max_id
      FROM arterialtension
      GROUP BY user
    ) max_ids
    ON ui.user = max_ids.user AND ui.id = max_ids.max_id`
    );
  }

  static async getCountForAT(result) {
    try {
      const [rows, fields] = await db.execute(
        'SELECT COUNT(*) AS count FROM arterialtension WHERE result = ?',
        [result]
      );
      return rows[0].count;
    } catch (e) {
      throw new Error(`A avut loc o eroare`);
    }
  }

  static fetchATById(userId) {
    return db.execute(`SELECT result FROM arterialtension WHERE user = ? ORDER BY id DESC LIMIT 1`, [userId]);
  }

}