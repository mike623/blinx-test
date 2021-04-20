"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Hash = use("Hash");

Factory.blueprint("App/Models/User", async (faker, i, data) => {
  return {
    username: faker.username(),
    email: data.email || faker.email(),
    password: data.password || faker.string({ length: 5 }),
  };
});

Factory.blueprint("App/Models/Item", async (faker) => {
  return {
    name: faker.name(),
    price: faker.integer({ min: 0, max: 100 }),
    type: faker.pickone(["phone", "laptop", "earphone", "wire", "food"]),
    description: faker.paragraph({ sentences: 1 }),
  };
});

Factory.blueprint("App/Models/Transaction", async (faker, i, data) => {
  return {
    user_id: data.userId,
    item_id: data.itemId,
    settled_at: faker.date({ year: 2021 }),
  };
});
