'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments()
      /* Vou pegar o user_id que inseriu o projeto e fazer um relacionamento com projects */
      table
        .integer('user_id')
        .unsigned() /* apenas positivos */
        .references('id') /* referenciando id em users */
        .inTable('users')
        .onUpdate('CASCADE') /* se alterar em user ser refletido em projects */
        .onDelete('SET NULL') /* ao ser deletado o user id passa a ser nulo */
      table.string('title').notNullable() /* titulo e descrição do projeto notNull */
      table.text('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
