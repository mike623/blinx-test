/**
 * TODO: clean DB
 */
"use strict";

const { test, trait } = use("Test/Suite")("Item");
const Transaction = use("App/Models/Transaction");
const User = use("App/Models/User");
const Item = use("App/Models/Item");
trait("Test/ApiClient");
trait("Auth/Client");
trait("Session/Client");

test("it should return 401 give not auth", async ({ client }) => {
  const response = await client.get("/transactions").end();
  response.assertStatus(401);
});

test("make it return transaction", async ({ client }) => {
  const user = await User.create({
    username: "username",
    email: "e@test.com",
    password: "password",
  });
  const item = await Item.create({
    name: "name",
    price: 10,
    description: "description",
    type: "phone",
  });
  const tranData = {
    item_id: item.id,
    user_id: user.id,
    settled_at: new Date(),
  };
  const trans = await Transaction.create(tranData);

  const response = await client.post("/items?q=test").loginVia(user).end();

  response.assertStatus(200);
  await trans.delete();
  await item.delete();
  await user.delete();
});
