import { success, notFound, authorOrAdmin } from '../../services/response/'
import { ShoppingListIngredient } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  ShoppingListIngredient.create({ ...body, user })
    .then((shoppingListIngredient) => shoppingListIngredient.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  ShoppingListIngredient.find(query, select, cursor)
    .populate('user')
    .then((shoppingListIngredients) => shoppingListIngredients.map((shoppingListIngredient) => shoppingListIngredient.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  ShoppingListIngredient.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((shoppingListIngredient) => shoppingListIngredient ? shoppingListIngredient.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  ShoppingListIngredient.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((shoppingListIngredient) => shoppingListIngredient ? Object.assign(shoppingListIngredient, body).save() : null)
    .then((shoppingListIngredient) => shoppingListIngredient ? shoppingListIngredient.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  ShoppingListIngredient.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((shoppingListIngredient) => shoppingListIngredient ? shoppingListIngredient.remove() : null)
    .then(success(res, 204))
    .catch(next)
