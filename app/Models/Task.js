'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
    static boot () {
        super.boot()
        /* como se fosse um event listener vendo quando uma task é criada ou alterada se tem user nela */
        /* Isso é similar ao ciclo de vida do vue - before mounted mounted() */
        /* aciona o hook especificado abaixo apoós de salvar */
        this.addHook('afterCreate','TaskHook.sendNewTaskMail')
        this.addHook('beforeUpdate','TaskHook.sendNewTaskMail')
    }
    project () {
        return this.belongsTo('App/Models/Project')
    }

    user () {
        return this.belongsTo('App/Models/User')
    }
    /* se uma tarefa pudesse ter varios arquivos belongsToMany */
    file() {
        return this.belongsTo('App/Models/File')
    }
}

module.exports = Task
