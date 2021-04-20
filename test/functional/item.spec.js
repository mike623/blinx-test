/**
 * TODO: clean DB
 */
"use strict";

const { test, trait } = use("Test/Suite")("Item");
const Item = use("App/Models/Item");
const User = use("App/Models/User");
trait("Test/ApiClient");
trait("Auth/Client");
trait("Session/Client");

test("it should return 401 give not auth", async ({ client }) => {
  const response = await client.post("/items?q=test").end();
  response.assertStatus(401);
});

test("make it return product", async ({ client }) => {
  const user = await User.create({
    username: "username",
    email: "e@test.com",
    password: "password",
  });
  const item = await Item.create({
    name: "test",
    price: 100,
    type: "phone",
    description: "test",
  });
  const response = await client.post("/items?q=test").loginVia(user).end();

  response.assertStatus(200);
  response.assertJSONSubset([
    {
      name: "test",
      price: 100,
      type: "phone",
      description: "test",
    },
  ]);
  await user.delete();
  await item.delete();
});
