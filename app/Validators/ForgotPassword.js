'use strict'

class ForgotPassword {
  get validateAll () {
    /* valida cada campo, pois o comportamento padrão se ele olha o primeiro e ve erro já retorna */
    return true
  }

  get rules () {
    return {
      email:'required|email',
      redirect_url: 'required|url'
    }
  }
}

module.exports = ForgotPassword
