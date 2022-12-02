/**
 * This is an abstract class for implementing User Adapter
 */
class UserAdapter {
  constructor() {
    if (this.constructor === UserAdapter)
      throw new TypeError(`cannot instantiate an abstract class`);
  }

  getAllUsers() {}
  getUserDetail(username) {}
  createUser(username, email, password) {}
  deleteUser(username) {}
  updateUser(username, password) {}
}

module.exports = UserAdapter;
