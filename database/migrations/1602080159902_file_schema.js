'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments()
      table.string('file').notNullable() /* nome do arquivo gravado pelo adonis */
      table.string('name').notNullable() /* nome original do arquivo */
      table.string('type', 20) /* imagem ou pdf */
      table.string('subtype',20) /* imagem pode ser jpeg png*/

      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FileSchema
