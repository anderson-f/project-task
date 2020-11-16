'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table
        .integer('project_id') /* a tarefa pertence a um projeto */
        .unsigned() /* apenas positivos */
        .references('id') /* referenciando id em users */
        .inTable('projects')
        .onUpdate('CASCADE') /* se alterar em user ser refletido em projects */
        .onDelete('CASCADE') /* ao ser deletado o user id passa a ser nulo */
        .notNullable() /* essa ligação com projeto é not null */
      table
        .integer('user_id') /* tarefa também pode ser relacionada com usuário */
        .unsigned() /* apenas positivos */
        .references('id') /* referenciando id em users */
        .inTable('users')
        .onUpdate('CASCADE') /* se alterar em user ser refletido em projects */
        .onDelete('SET NULL') /* ao ser deletado o user id passa a ser nulo */
      table
        .integer('file_id') /* a tarefa pertence a um projeto */
        .unsigned() /* apenas positivos */
        .references('id') /* referenciando id em users */
        .inTable('files')
        .onUpdate('CASCADE') /* se alterar em user ser refletido em projects */
        .onDelete('SET NULL') /* ao ser deletado o user id passa a ser nulo */
      table.string('title').notNullable() /* titulo da tarefa */
      table.text('description') /* descrição tarefa */
      table.timestamp('due_date') /* data de entrega da tarefa */
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
