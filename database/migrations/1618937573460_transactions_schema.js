'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionsSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.integer("user_id").references('users.id').notNullable();
      table.integer("item_id").references('items.id').notNullable();
      table.datetime("settled_at").notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('transactions')
  }
}

module.exports = TransactionsSchema
