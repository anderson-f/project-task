'use strict'

class SessionController {
  async store ({ request, response, auth}) {
    /* pegando o email e asenha */
    const {email, password} = request.all()

    /* criando um token a partir desse email e senha para esse usuario */
    const token = await auth.attempt(email, password)

    return token
  }
}

module.exports = SessionController
