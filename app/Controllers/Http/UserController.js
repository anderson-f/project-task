'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class UserController {
  async store({ request }) {
    const data = request.only(['username', 'email', 'password'])
    const addresses = request.input('addresses') /* retorna apenas uma informação do body da requisição */

    /* da forma que está aqui ele cria o usuário mesmo se der um problema na criação o user
    nós podemos fazer uma transaction para só persistir o user se a criação de endereço for 
    feita corretamente também */

/*     const user = await User.create(data)

    await user.addresses().createMany(addresses) */

    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx)

    await user.addresses().createMany(addresses, trx)

    await trx.commit() /* seele chegou aqui e não deu algum erro ai sim ele faz o commit */

    return user
  }
}

module.exports = UserController
