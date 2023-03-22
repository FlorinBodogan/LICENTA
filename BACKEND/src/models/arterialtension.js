const db = require('../util/database');

module.exports = class ArterialTension {
    constructor(spb, dpb, date, user){
        this.spb = spb;
        this.dpb = dpb;
        this.date = date;
        this.user = user;
    }

    static calculateArterialTension(arterialTensionDetails) {
        if (isNaN(arterialTensionDetails.spb) || isNaN(arterialTensionDetails.dpb)) {
          throw new Error("Valori invalide");
        }
      
        const arterialTensionSPB = arterialTensionDetails.spb;
        const arterialTensionDPB = arterialTensionDetails.dpb;
      
        let category = "";
        if (arterialTensionSPB <= 120 && arterialTensionDPB <= 80) {
          category = "Optim";
        } else if (120 <= arterialTensionSPB <= 129 && 80 <= arterialTensionDPB <= 84) {
          category = "Normal";
        } else if (130 <= arterialTensionSPB <= 139 && 85 <= arterialTensionDPB <= 89) {
          category = "Normal crescut";
        } else if (140 <= arterialTensionSPB <= 159 && 90 <= arterialTensionDPB <= 99) {
          category = "Gradul I de hipertensiune";
        } else if (160 <= arterialTensionSPB <= 179 && 100 <= arterialTensionDPB <= 109) {
          category = "Gradul II de hipertensiune";
        } else if (180 <= arterialTensionSPB && 110 <= arterialTensionDPB) {
          category = "Gradul III de hipertensiune";
        } else if (140 <= arterialTensionSPB && arterialTensionDPB <= 90) {
          category = "Hipertensiune izolata sistolica";
        }
        return category;
  }

  static saveDetailsForAT(at) {
      return db.execute(
          'INSERT INTO arterialtension (spb, dpb, user) VALUES (?, ?, ?)',
          [at.spb, at.dpb, at.user]
      );
  }

  static saveATResult(at) {
    return db.execute(
      'INSERT INTO arterialtension (spb, dpb, result, user) VALUES (?, ?, ?, ?)',
      [at.spb, at.dpb, at.resultAT, at.user]
    );
  }

  static fetchATResultById(userId) {
    return db.execute(`SELECT * FROM arterialtension WHERE user = ? ORDER BY id DESC LIMIT 1`, [userId]);
  }

  static fetchAllATResultById(userId) {
    return db.execute(`SELECT result FROM arterialtension WHERE user = ? ORDER BY id`, [userId]);
  }

  static fetchAllATDateById(userId) {
    return db.execute(`SELECT created FROM arterialtension WHERE user = ? ORDER BY id`, [userId]);
  }

}