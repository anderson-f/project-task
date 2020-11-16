'use strict'
/* Esse handler pega todos os erros da aplicação, e dos validators também */
const Env = use('Env') /* ter acessos as variaveis de ambiente do env */
const Youch = use('youch') /* formata o erro */
const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    /* que tipo de mensagem como ela vai estar formatada */
    if (error.name === 'ValidationException'){
      console.log('teste')
      return response.status(error.status).send(error.messages)
    }

    /* se estiver no ambiente de desenvolvimento */
    if (Env.get('NODE_ENV') === 'development') {
      console.log('teste1')
      const youch = new Youch(error, request.request)
      const errorJSON = await youch.toJSON() /* transformando o erro em JSON */
      return response.status(error.status).send(errorJSON)
    }
    console.log('teste2')
    /* se não cair em nenhum if só retorna o erro */
    return response.status(error.status)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
    /* armazenar as informações do erro */
  }
}

module.exports = ExceptionHandler
