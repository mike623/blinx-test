"use strict";
const Trans = use("App/Models/Transaction");

class TransactionController {
  /**
   * TODO: check admin right access
   * TODO: filter cancelled
   */
  list() {
    return Trans.query().with('item').fetch();
  }
}

module.exports = TransactionController;
