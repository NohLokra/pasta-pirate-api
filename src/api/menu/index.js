import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Menu, { schema } from './model'

const router = new Router()
const { starter, dish, dessert } = schema.tree

/**
 * @api {post} /menus Create menu
 * @apiName CreateMenu
 * @apiGroup Menu
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam starter Menu's starter.
 * @apiParam dish Menu's dish.
 * @apiParam dessert Menu's dessert.
 * @apiSuccess {Object} menu Menu's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Menu not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ starter, dish, dessert }),
  create)

/**
 * @api {get} /menus Retrieve menus
 * @apiName RetrieveMenus
 * @apiGroup Menu
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of menus.
 * @apiSuccess {Object[]} rows List of menus.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /menus/:id Retrieve menu
 * @apiName RetrieveMenu
 * @apiGroup Menu
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} menu Menu's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Menu not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /menus/:id Update menu
 * @apiName UpdateMenu
 * @apiGroup Menu
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam starter Menu's starter.
 * @apiParam dish Menu's dish.
 * @apiParam dessert Menu's dessert.
 * @apiSuccess {Object} menu Menu's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Menu not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ starter, dish, dessert }),
  update)

/**
 * @api {delete} /menus/:id Delete menu
 * @apiName DeleteMenu
 * @apiGroup Menu
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Menu not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
