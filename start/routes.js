'use strict'

const Route = use('Route')

/* estou  escutando um post da rota users e chamando o metodo store em UserController*/
Route.post('users','UserController.store').validator('User')
Route.post('sessions','SessionController.store').validator('Session')
Route.post('passwords','ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords','ForgotPasswordController.update').validator('ResetPassword')

/* Rota para que o usuário consiga acessar o arquivo */
Route.get('/files/:id','FileController.show')

/* Configurados rotas que só sejam acessadas quando o usuário estiver logado */
Route.group(() => {
    Route.post('/files','FileController.store') 

    /* Posso ter todas as rotas de post, get, put etc.. em um comando apenas */
    /* como as rotas estão todas condensadas nesse resource o jeito dos validatores é diferente */
    /* Tenho um array dentro de outro array e dentro desse array tenho os metodos e o validator
    para aquele metodo se eu quiser validar um update repito como esta o store */
    Route.resource('projects', 'ProjectController')
        .apiOnly()
        .validator(new Map(
           [
               [
                   ['projects.store'],
                   ['Project']
               ]
           ] 
        ))
    /* colocando projects.tasks eu tenho o id do projeto mais facil */
    /* utilizar apenas em casos extremos quando o registro só pode ser criado se o pai foi criado também */
    Route.resource('projects.tasks', 'TaskController')
        .apiOnly()
        .validator(new Map(
            [
                [
                    ['projects.tasks.store'],
                    ['Task']
                ]
            ] 
        ))
}).middleware(['auth']) /* só entra nessas rotas se enviar um token de autenticação */

