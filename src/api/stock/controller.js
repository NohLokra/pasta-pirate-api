import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Stock } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Stock.create({ ...body, user })
    .then((stock) => stock.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Stock.count(query)
    .then(count => Stock.find(query, select, cursor)
      .populate('user')
      .then((stocks) => ({
        count,
        rows: stocks.map((stock) => stock.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Stock.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((stock) => stock ? stock.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Stock.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((stock) => stock ? Object.assign(stock, body).save() : null)
    .then((stock) => stock ? stock.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Stock.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((stock) => stock ? stock.remove() : null)
    .then(success(res, 204))
    .catch(next)
