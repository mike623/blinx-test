"use strict";

/*
|--------------------------------------------------------------------------
| ItemSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class ItemSeeder {
  async run() {
    await Factory.model("App/Models/Item").createMany(10);
  }
}

module.exports = ItemSeeder;
