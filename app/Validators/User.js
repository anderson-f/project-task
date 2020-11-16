'use strict'

class User {
  get validateAll () {
    /* valida cada campo, pois o comportamento padrão se ele olha o primeiro e ve erro já retorna */
    return true
  }
  get rules () {
    return {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      email: 'required|confirmed'
    }
  }
}

module.exports = User
