'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAdressSchema extends Schema {
  up () {
    this.create('user_addresses', (table) => {
      table.increments()
      table
        .integer('user_id') /* tarefa também pode ser relacionada com usuário */
        .unsigned() /* apenas positivos */
        .references('id') /* referenciando id em users */
        .inTable('users')
        .onUpdate('CASCADE') /* se alterar em user ser refletido em projects */
        .onDelete('SET NULL') /* ao ser deletado o user id passa a ser nulo */
      table.string('street').notNullable
      table.integer('number').notNullable
      table.string('district')
      table.string('city').notNullable()
      table.string('state').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_adresses')
  }
}

module.exports = UserAdressSchema
