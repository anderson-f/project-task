'use strict'

class Session {
  get validateAll () {
    /* valida cada campo, pois o comportamento padrão se ele olha o primeiro e ve erro já retorna */
    return true
  }

  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }
}

module.exports = Session
