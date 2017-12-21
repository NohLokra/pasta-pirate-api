import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Menu } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Menu.create({ ...body, user })
    .then((menu) => menu.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Menu.count(query)
    .then(count => Menu.find(query, select, cursor)
      .populate('user')
      .then((menus) => ({
        count,
        rows: menus.map((menu) => menu.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Menu.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((menu) => menu ? menu.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Menu.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((menu) => menu ? Object.assign(menu, body).save() : null)
    .then((menu) => menu ? menu.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Menu.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((menu) => menu ? menu.remove() : null)
    .then(success(res, 204))
    .catch(next)
