import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Planning } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Planning.create({ ...body, user })
    .then((planning) => planning.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Planning.count(query)
    .then(count => Planning.find(query, select, cursor)
      .populate('user')
      .then((plannings) => ({
        count,
        rows: plannings.map((planning) => planning.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Planning.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((planning) => planning ? planning.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Planning.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((planning) => planning ? Object.assign(planning, body).save() : null)
    .then((planning) => planning ? planning.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Planning.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((planning) => planning ? planning.remove() : null)
    .then(success(res, 204))
    .catch(next)
