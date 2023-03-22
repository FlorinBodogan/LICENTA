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

        if(tryglicerides <= 150){
            category = "Normal";
        } else if(151 <= tryglicerides <= 199){
            category = "Limita Normalului";
        } else if (200 <= tryglicerides){
            category = "Ridicat";
        } else if(500 <= tryglicerides){
            category = "Foarte ridicat"
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

}