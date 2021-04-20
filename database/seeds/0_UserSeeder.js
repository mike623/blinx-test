"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Database = use("Database");

class UserSeeder {
  async run() {
    const user = await Database.table("users").where({
      email: "test@example.com",
    });
    //  generate test user
    if (user.length === 0)
      await Factory.model("App/Models/User").create({
        email: "test@example.com",
        password: "password",
      });
    await Factory.model("App/Models/User").createMany(10);
  }
}

module.exports = UserSeeder;
