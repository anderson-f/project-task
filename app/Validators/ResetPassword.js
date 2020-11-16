'use strict'

class ResetPassword {
  get validateAll () {
    /* valida cada campo, pois o comportamento padrão se ele olha o primeiro e ve erro já retorna */
    return true
  }
  get rules () {
    return {
      token: 'required',
      password: 'required|confirmed'
    }
  }
}

module.exports = ResetPassword
