import { success, notFound, authorOrAdmin } from '../../services/response/'
import { ShoppingList } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  ShoppingList.create({ ...body, user })
    .then((shoppingList) => shoppingList.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  ShoppingList.count(query)
    .then(count => ShoppingList.find(query, select, cursor)
      .populate('user')
      .then((shoppingLists) => ({
        count,
        rows: shoppingLists.map((shoppingList) => shoppingList.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  ShoppingList.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((shoppingList) => shoppingList ? shoppingList.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  ShoppingList.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((shoppingList) => shoppingList ? Object.assign(shoppingList, body).save() : null)
    .then((shoppingList) => shoppingList ? shoppingList.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  ShoppingList.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((shoppingList) => shoppingList ? shoppingList.remove() : null)
    .then(success(res, 204))
    .catch(next)
