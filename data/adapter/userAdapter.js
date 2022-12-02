/**
 * This is an abstract class for implementing User Adapter
 */
class UserAdapter {
  constructor() {
    if (this.constructor === UserAdapter)
      throw new TypeError(`cannot instantiate an abstract class`);
  }

  getAllUsers() {}
  getUser(username) {}
  createUser(username, email, password) {}
  deleteUser(username) {}
}

module.exports = UserAdapter;
