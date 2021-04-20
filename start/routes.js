"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/", async ({ auth, response, view }) => {
  if (await auth.check()) {
    return response.redirect("/overview");
  } else {
    return response.redirect("/login");
  }
});
Route.on("login").render("login");
Route.on("home").render("home");
Route.on("overview").render("overview");

Route.post("login", "UserController.login");
Route.post("logout", "UserController.logout").middleware("auth");

// not in use
Route.get("users/me", "UserController.me").middleware("auth");

// items API
Route.post("items", "ItemController.search").middleware("auth");

// transaction API
Route.get("transactions", "TransactionController.list").middleware("auth");

Route.on("*").render("login");
