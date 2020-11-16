'use strict'

const moment = require('moment')
const crypto = require('crypto') // já vem no node
const User = use('App/Models/User') /* tenho que importar User para usar o findBy abaixo */
const Mail = use('Mail') /*  */

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      /* quando vou pegar apenas um campo da requisição posso usar o .input */
      const email = request.input('email')
      /* find acha um registro o by significa que vou utilizar não o id, mas o email  */
      /* const user = await User.findBy('email', email) - sem catch */
      const user = await User.findByOrFail('email', email) /* dessa forma se der erro cai no catch */
      /* ao achar o usuario cria um token e pega a dat */
      /* token de 10 bytes convertendo pra hexadecimal */
      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()
      /* no {} envio as informações que vão estar no email */
      /* O redirect_url vem como parametro na requisição dai quando retorno o link de recuperação
      concateno com o token */
      await Mail.send(
        /* utilizo o array pq posso mandar em formato texto tbm, dai duplicaria o forgot_password */
        ['emails.forgot_password'], /* template de email que a gente quer enviar */
        { email, token: user.token, link: `${request.input('redirect_url')}?token=${user.token}`}, /* quais parametros enviaremos pro template do email */
        message => {
          message
            .to(user.email) /* quem recebe o email */
            .from('anderson.freitas@teamsoft.com.br', 'Anderson | TeamSoft') /* quem vai enviar */
            .subject('Recuperação de senha') /* assunto */
        }
      )


    } catch (err) {
      /* retorna para requisição o erro status que caiu no catch e envia essa mensagem */
       return response.status(err.status).send({error: {message: 'Algo não deu certo, esse usuario existe?'}})
    }
  }

  /* quando eu dou o store para recuperar a senha, o update é o que de fato muda a senha */
  async update ({ request, response}) {
    try {
      const { token, password } = request.all()

      const user = await User.findByOrFail('token', token) /* buscando o usuario pelo token */

      const tokenExpired = moment()
        .subtract('2', 'days') /* tirando 2 dias da data atual */
        .isAfter(user.token_created_at) /* verifica se essa data está maior que a data limite no banco */

        if (tokenExpired) {
          return response
            .status(401)
            .send({error: {message: 'O token de recuperação está expirado'}})
        }

        /* seta null no token e criação do token, pois o mesmo já foi usado */
        user.token = null
        user.token_created_at = null

        /* persiste no banco a senha que foi passada na requisição */
        user.password = password
    } catch (err) {
      return response
        .status(err.status)
        .send({error: {message: 'Algo deu errado ao resetar sua senha'}})
    }
  }
}

module.exports = ForgotPasswordController
