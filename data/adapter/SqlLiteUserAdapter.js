import { UserAdapter } from "./userAdapter";
import { Database } from "sqlite3";

class SqlLiteUserAdapter extends UserAdapter {
  constructor() {
    this.db = new Database(__dirname + "database.db", (err) => {
      if (!err) {
        db.serialize(() => {
          db.run(`PRAGMA foreign_keys = ON`)
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

  getAllUsers() {
    db.all(`SELECT * FROM users`, [], function (err, row) {
      if (!err) {
        console.log(row);
        res.send(JSON.stringify(row));
      } else {
        console.log("error");
      }
    });
  }

  getUser(username) {}

  createUser(username, email, password) {
    this.db.serialize(() => {
      this.db
        .get(
          `INSERT INTO users(username,password) VALUES(?,?)`,
          [username, password],
          function (err) {
            if (err) {
              let msg = {
                text: false,
              };
              res.send(JSON.stringify(msg));
            } else {
              let msg = {
                text: true,
                location: "/",
              };
              res.send(JSON.stringify(msg));
            }
          }
        )
        .get(
          `INSERT INTO highscore(username,highscore) VALUES(?,?)`,
          [username, 0],
          function (err) {}
        );
    });
  }

  deleteUser(username) {
    db.run(`DELETE FROM users WHERE username=?`, [username], function (err) {
      if (!err) {
        let msg = {
          location: "/adminpage",
        };
        res.send(JSON.stringify(msg));
      }
    });
  }
}
