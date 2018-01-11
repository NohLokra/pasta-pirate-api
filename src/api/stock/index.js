import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Stock, { schema } from './model'

const router = new Router()
const { aliment, quantity } = schema.tree

/**
 * @api {post} /stocks Create stock
 * @apiName CreateStock
 * @apiGroup Stock
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam aliment Stock's aliment.
 * @apiParam quantity Stock's quantity.
 * @apiSuccess {Object} stock Stock's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Stock not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ aliment, quantity }),
  create)

/**
 * @api {get} /stocks Retrieve stocks
 * @apiName RetrieveStocks
 * @apiGroup Stock
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of stocks.
 * @apiSuccess {Object[]} rows List of stocks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /stocks/:id Retrieve stock
 * @apiName RetrieveStock
 * @apiGroup Stock
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} stock Stock's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Stock not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /stocks/:id Update stock
 * @apiName UpdateStock
 * @apiGroup Stock
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam aliment Stock's aliment.
 * @apiParam quantity Stock's quantity.
 * @apiSuccess {Object} stock Stock's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Stock not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ aliment, quantity }),
  update)

/**
 * @api {delete} /stocks/:id Delete stock
 * @apiName DeleteStock
 * @apiGroup Stock
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Stock not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
