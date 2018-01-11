import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Planning, { schema } from './model'

const router = new Router()
const { date, menu, menu_type } = schema.tree

/**
 * @api {post} /plannings Create planning
 * @apiName CreatePlanning
 * @apiGroup Planning
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam date Planning's date.
 * @apiParam menu Planning's menu.
 * @apiParam menu_type Planning's menu_type.
 * @apiSuccess {Object} planning Planning's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Planning not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ date, menu, menu_type }),
  create)

/**
 * @api {get} /plannings Retrieve plannings
 * @apiName RetrievePlannings
 * @apiGroup Planning
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of plannings.
 * @apiSuccess {Object[]} rows List of plannings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /plannings/:id Retrieve planning
 * @apiName RetrievePlanning
 * @apiGroup Planning
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} planning Planning's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Planning not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /plannings/:id Update planning
 * @apiName UpdatePlanning
 * @apiGroup Planning
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam date Planning's date.
 * @apiParam menu Planning's menu.
 * @apiParam menu_type Planning's menu_type.
 * @apiSuccess {Object} planning Planning's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Planning not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ date, menu, menu_type }),
  update)

/**
 * @api {delete} /plannings/:id Delete planning
 * @apiName DeletePlanning
 * @apiGroup Planning
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Planning not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
