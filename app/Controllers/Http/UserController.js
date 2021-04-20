"use strict";
const User = use("App/Models/User");

class UserController {
  async login({ request, auth, response }) {
    const { email, password } = request.all();
    if (!auth.user) await auth.attempt(email, password);

    return response.redirect("/home");
  }
  async logout({ auth, response }) {
    await auth.logout();

    return response.redirect("/login");
  }
  me({ auth }) {
    return auth.user;
  }
}

module.exports = UserController;
