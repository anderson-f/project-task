'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const File = use('App/Models/File') /* importando do model */
const Helpers = use('Helpers')  /* serie de funções de ajuda */

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  /**
   * Show a list of all files.
   * GET files
  */

  async show ({ params , response}) {
    /* se der erro ele retorna */
    const file = await File.findOrFail(params.id)

    /* tmpPath - é o caminho que definirmos anteriormente */
    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
    /* retornar em formato de imagem */
  }

  async store ({ request, response }) {

    try {
      /* se não existir o file não faz nada */
      if (!request.file('file')) return

      const upload = request.file('file', {size: '2mb'}) /* tamanho limite do arquivo */

      /* o nome do arquivo vai ficar a fileStamp e o tipo do arquivo */
      const fileName = `${Date.now()}.${upload.subtype}`

      /* pasta compartilhada que não vai ser compartilhada entre ambiente de produção e desenvolvimento */
      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      /* verifica se o processo anterior deu certo */
      if (!upload.moved()) {
        throw upload.error()
      }

      /* criando um novo registro na tabela file */
      /*  */
      const file = await File.create({
        file: fileName, 
        name: upload.clientName,
        type: upload.type, 
        subtype: upload.subtype
      })

      return file
    } catch(err) {
      return response
        .status(err.status)
        .send({error: {message: 'Erro no upload de arquivo'}})
    }
  }

  
}

module.exports = FileController
