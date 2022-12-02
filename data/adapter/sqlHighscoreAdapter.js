const HighScoreAdapter = require("./highscoreAdapter");
const sql = require("../../bootstrap/sqlLiteDb");
class SqlHighscoreAdapter extends HighScoreAdapter {
  constructor() {
    super();
    this.db = sql.instance.db;
  }

  getAllHighscores() {
    const result = new Promise((a, b) => {
      this.db.get(`SELECT * FROM highscore`, [], function (err, rows) {
        if (!err) {
          a(JSON.stringify([rows]));
        } else {
          b("error");
        }
      });
    });

    return result;
  }

  getHighscoreOfUser(username) {
    return new Promise((a, b) => {
      this.db.get(
        `SELECT * FROM highscore WHERE username = ?`,
        [username],
        (err, row) => {
          if (!err) {
            a(row.highscore);
          } else {
            b("error");
          }
        }
      );
    });
  }

  updateHighscoreOfUser(username, highscore) {
    const result = new Promise((a, b) => {
      this.db.run(
        "UPDATE highscore SET highscore=? WHERE username=?",
        [highscore, username],
        (e) => {
          if (!e) a(true);
          else b("error");
        }
      );
    });

    return result;
  }

  insertHighScore(username, highscore = 0) {}

  static instance = new SqlHighscoreAdapter();
}

module.exports = SqlHighscoreAdapter;
