const sql = require("sqlite3");
class SqlLite {
  constructor(dirName = __dirname) {
    this.db = new sql.Database(dirName + "database.db", (err) => {
      if (!err) {
        this.db.serialize(() => {
          this.db.run(`PRAGMA foreign_keys = ON`)
            .run(`CREATE TABLE IF NOT EXISTS users(
                          username TEXT PRIMARY KEY,
                          password TEXT
                      )`).run(`CREATE TABLE IF NOT EXISTS highscore(
                          username TEXT,
                          highscore INTEGER DEFAULT 0,
                              FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE
                      )`);
          console.log("opened database");
        });
      }
    });
  }
  static instance = new SqlLite();
}

module.exports = SqlLite;
