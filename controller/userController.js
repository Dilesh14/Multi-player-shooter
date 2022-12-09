const express = require("express");
const router = express.Router();

const SqlLiteHighscoreAdapter = require("../data/adapter/sqlHighscoreAdapter");
const sqlHighscoreAdapter = SqlLiteHighscoreAdapter.instance;
const SqlLiteUserAdapter = require("../data/adapter/SqlLiteUserAdapter");
const sqlUserAdapter = SqlLiteUserAdapter.instance;

router.post("/signout", (req, res) => {
  req.session = null;
  let msg = {
    location: "/",
  };
  res.send(JSON.stringify(msg));
});

router.post("/getuserhighscore", (req, res) => {
  sqlHighscoreAdapter
    .getAllHighscores()
    .then((results) => {
      res.send(results);
    })
    .catch(console.log);
});

router.post("/getallusers", (req, res) => {
  sqlUserAdapter
    .getAllUsers()
    .then((result) => {
      res.send(result);
    })
    .catch(console.log);
});

router.post("/getUser", (req, res) => {
  let name = req.session.user;
  let msg = {
    user: name,
  };
  res.send(JSON.stringify(msg));
});

router.post("/reqeditUser", (req, res) => {
  let msg = {
    location: "/userpage",
  };
  res.send(JSON.stringify(msg));
});

router.post("/adminsignout", (req, res) => {
  admin.status = false;
  let msg = {
    location: "/",
  };
  req.session = null;
  res.send(JSON.stringify(msg));
});

module.exports = router;
