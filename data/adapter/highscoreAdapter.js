/**
 * Abstract class for high score adapter
 */
class HighScoreAdapter {
  constructor() {
    if (this.constructor === HighScoreAdapter)
      throw new TypeError(`cannot instantiate an abstract class`);
  }

  getAllHighscores() {}
  getHighscoreOfUser(username) {}
  updateHighscoreOfUser(username, highscore) {}
  insertHighScore(username, highscore = 0) {}
}

module.exports = HighScoreAdapter;
