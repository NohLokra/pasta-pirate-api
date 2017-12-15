import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Recipe } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Recipe.create({ ...body, user })
    .then((recipe) => recipe.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Recipe.count(query)
    .then(count => Recipe.find(query, select, cursor)
      .populate('user')
      .then((recipes) => ({
        count,
        rows: recipes.map((recipe) => recipe.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Recipe.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((recipe) => recipe ? recipe.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Recipe.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((recipe) => recipe ? Object.assign(recipe, body).save() : null)
    .then((recipe) => recipe ? recipe.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Recipe.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((recipe) => recipe ? recipe.remove() : null)
    .then(success(res, 204))
    .catch(next)
