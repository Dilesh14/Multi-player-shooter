const UserAdapter = require("./userAdapter");
const sqlLite = require("../../bootstrap/sqlLiteDb");

class SqlLiteUserAdapter extends UserAdapter {
  constructor() {
    super();
    this.db = sqlLite.getInstance().db;
  }

  getAllUsers() {
    const result = new Promise((a, b) => {
      this.db.all(`SELECT * FROM users`, [], function (err, row) {
        if (!err) {
          a(JSON.stringify(row));
        } else {
          b("error");
        }
      });
    });
    return result;
  }

  getUserDetail(username) {
    const result = new Promise((a, b) => {
      this.db.get(
        `SELECT * FROM users WHERE username = ?`,
        [username],
        function (err, row) {
          if (!err) {
            if (row) {
              a(row);
            } else {
              b("no user in the database");
            }
          } else {
            b("error loading database");
          }
        }
      );
    });

    return result;
  }

  createUser(username, email, password) {
    const result = new Promise((a, b) => {
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
                b(JSON.stringify(msg));
              } else {
                let msg = {
                  text: true,
                  location: "/",
                };
                a(JSON.stringify(msg));
              }
            }
          )
          .get(
            `INSERT INTO highscore(username,highscore) VALUES(?,?)`,
            [username, 0],
            function (err) {}
          );
      });
    });
    return result;
  }

  deleteUser(username) {
    const result = new Promise((a, b) => {
      this.db.run(
        `DELETE FROM users WHERE username=?`,
        [username],
        function (err) {
          if (!err) {
            let msg = {
              location: "/adminpage",
            };
            a(JSON.stringify(msg));
          } else {
            b("delete failed");
          }
        }
      );
    });
    return result;
  }

  static getInstance = () => {
    return this.instance ? this.instance : new SqlLiteUserAdapter();
  };
}

module.exports = SqlLiteUserAdapter;
