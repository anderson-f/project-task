'use strict'

class Project {
  get validateAll () {
    /* valida cada campo, pois o comportamento padrão se ele olha o primeiro e ve erro já retorna */
    return true
  }

  get rules () {
    return {
      title: 'required',
      description: 'required'
    }
  }
}

module.exports = Project
