//for checking if the user is in the database
//control comes here to check if the authentication is right
export function checkSignIn(req, res, stuff) {
  //TODO: remove db. add it to the data layer
  db.get(
    `SELECT * FROM users WHERE username = ?`,
    [stuff.user],
    function (err, row) {
      if (!err) {
        if (row) {
          console.log(row);
          if (stuff.pass === row.password) {
            console.log("rendering the home page.....");
            //defining the cookie
            req.session.auth = true;
            req.session.user = stuff.user;

            let obj = {
              location: "/home",
              text: true,
            };
            res.send(JSON.stringify(obj));
          } else {
            req.session.auth = false;
            let obj = {
              text: false,
              msg: "Password did not match",
            };
            res.send(JSON.stringify(obj));
            console.log("User and Pass not match");
          }
        } else {
          req.session.auth = false;
          let obj = {
            text: false,
            msg: "no user " + stuff.user + " in the database",
          };
          res.send(JSON.stringify(obj));
          console.log("NO data in database");
        }
      } else {
        console.log("Error loading database");
      }
    }
  );
}
