'use strict'

class Task {
  get rules () {
    return {
      title: 'required',
      due_date: 'date' /* valida que o campo é data */
    }
  }
}

module.exports = Task
