import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Ingredient } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Ingredient.create({ ...body, user })
    .then((ingredient) => ingredient.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Ingredient.count(query)
    .then(count => Ingredient.find(query, select, cursor)
      .populate('user')
      .then((ingredients) => ({
        count,
        rows: ingredients.map((ingredient) => ingredient.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Ingredient.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((ingredient) => ingredient ? ingredient.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Ingredient.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((ingredient) => ingredient ? Object.assign(ingredient, body).save() : null)
    .then((ingredient) => ingredient ? ingredient.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Ingredient.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((ingredient) => ingredient ? ingredient.remove() : null)
    .then(success(res, 204))
    .catch(next)
