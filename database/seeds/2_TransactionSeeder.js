"use strict";

/*
|--------------------------------------------------------------------------
| TransactionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Database = use("Database");

class TransactionSeeder {
  async run() {
    const users = await Database.table("users");
    const items = await Database.table("items");
    console.log('users', users.length)
    console.log('items', items.length)
    for (let index = 0; index < 300; index++) {
      await Factory.model("App/Models/Transaction").create({
        userId: users[Math.floor(Math.random() * users.length)].id,
        itemId: items[Math.floor(Math.random() * items.length)].id,
      });
    }
  }
}

module.exports = TransactionSeeder;
