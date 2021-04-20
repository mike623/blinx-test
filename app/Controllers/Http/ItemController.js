"use strict";
const Items = use("App/Models/Item");

class ItemController {
  async search({ request }) {
    const { q } = request.all();
    // TODO: make it more readable
    return await Items.query()
      .where("name", "ilike", `%${q}%`)
      .orWhere("description", "ilike", `%${q}%`)
      .fetch();
  }
}

module.exports = ItemController;
