'use strict'

const Mail = use('Mail') /* pra enviar o email  */
const Helpers = use('Helpers') 

const TaskHook = exports = module.exports = {}

/* como se fosse um event listener vendo quando uma task é criada ou alterada se tem user nela */
TaskHook.sendNewTaskMail= async taskInstance => {
    /* verificar se a nossa task tem o campo userId e se foi editado recentemente */
    /* dirty grava novas informações que foram alteradas */
    if (!taskInstance.user_id && !taskInstance.dirty.user_id)
        return
    
    /* Preciso saber quem é o usuario a enviar o email e estou acessando o relacionamento*/
    const { email, username } = await taskInstance.user().fetch() // traz o user relacionado a essa task
    const file = await taskInstance.file().fetch() // também tenho um relacionamento com file

    const { title } = taskInstance
    /* !! truque pra variavel ser sempre booelana */
    await Mail.send(
        ['emails.new_task'],
        { username, title, hasAttachment: !!file },
        message => {
            message
                .to(email)
                .from('anderson.freitas@teamsoft.com.br', 'Anderson | TeamSoft')
                .subject('Nova tarefa para você')
        /* se ele encontrar algum relacionamento com file */
        if (file) {
            message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
                filename: file.name
            })
        }
        
        }
    )
}
