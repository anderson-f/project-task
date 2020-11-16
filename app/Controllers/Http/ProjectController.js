'use strict'

const Project = use('App/Models/Project')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request }) {
    const { page } =  request.get()
    /* trocando o fetch pelo paginate consigo ter uma nevagação melhor no front
    pesquisar melhor depois */
    const projects = await Project.query().with('user').paginate(page)

    return projects
  }


  /**
   * Create/save a new project.
   * POST projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.only(['title', 'description'])
    /* pegando o usuário através do auth */
    const project = await Project.create({ ...data, user_id: auth.user.id })

    return project
  }

  /**
   * Display a single project.
   * GET projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    /* mostra um projeto especifico */
    /* Aqui não uso o .with como usei anteriormente  lá eram varios aqui é só um */
    const project = await Project.findOrFail(params.id)

    await project.load('user') /* como se fosse o with */
    await project.load('tasks')

    return project

  }

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const project = await Project.findOrFail(params.id) /* buscar o prject como fiz no show */
    const data = request.only(['title', 'description']) /* buscando os dados da requisição como fiz em store */

    project.merge(data) /* colocando as informações da requisição dentro do project */

    await project.save()

    return project
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.delete()
  }
}

module.exports = ProjectController
