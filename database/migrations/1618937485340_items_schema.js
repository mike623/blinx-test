"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ItemsSchema extends Schema {
  up() {
    this.create("items", (table) => {
      table.increments();
      table.string("name", 80).notNullable();
      table.integer("price").notNullable();
      table.string('type', 30).notNullable();
      table.string("description", 1000).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("items");
  }
}

module.exports = ItemsSchema;
