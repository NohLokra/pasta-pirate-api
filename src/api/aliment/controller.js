import { success, notFound } from '../../services/response/'
import { Aliment } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Aliment.create(body)
    .then((aliment) => aliment.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Aliment.count(query)
    .then(count => Aliment.find(query, select, cursor)
      .then((aliments) => ({
        count,
        rows: aliments.map((aliment) => aliment.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Aliment.findById(params.id)
    .then(notFound(res))
    .then((aliment) => aliment ? aliment.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Aliment.findById(params.id)
    .then(notFound(res))
    .then((aliment) => aliment ? Object.assign(aliment, body).save() : null)
    .then((aliment) => aliment ? aliment.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Aliment.findById(params.id)
    .then(notFound(res))
    .then((aliment) => aliment ? aliment.remove() : null)
    .then(success(res, 204))
    .catch(next)
