'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class File extends Model {
    /* estou retornando a url da imagem ao front-end dessa forma se for necessário acessar
    ela em outros lugares, posso utilizar essa url*/
    static get computed () {
        return ['url']
    }

    /*  */
    getUrl({ id }) {
        return `${Env.get('APP_URL')}/files/${id}`
    }
}

module.exports = File
