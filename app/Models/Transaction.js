"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Transaction extends Model {
  item() {
    return this.hasOne("App/Models/Item", "item_id", "id");
  }
}

module.exports = Transaction;
