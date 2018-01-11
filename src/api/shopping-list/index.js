import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export ShoppingList, { schema } from './model'

const router = new Router()
const { ingredients, isDone } = schema.tree

/**
 * @api {post} /shopping-lists Create shopping list
 * @apiName CreateShoppingList
 * @apiGroup ShoppingList
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam ingredients Shopping list's ingredients.
 * @apiParam isDone Shopping list's isDone.
 * @apiSuccess {Object} shoppingList Shopping list's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shopping list not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ ingredients, isDone }),
  create)

/**
 * @api {get} /shopping-lists Retrieve shopping lists
 * @apiName RetrieveShoppingLists
 * @apiGroup ShoppingList
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of shopping lists.
 * @apiSuccess {Object[]} rows List of shopping lists.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /shopping-lists/:id Retrieve shopping list
 * @apiName RetrieveShoppingList
 * @apiGroup ShoppingList
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} shoppingList Shopping list's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shopping list not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /shopping-lists/:id Update shopping list
 * @apiName UpdateShoppingList
 * @apiGroup ShoppingList
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam ingredients Shopping list's ingredients.
 * @apiParam isDone Shopping list's isDone.
 * @apiSuccess {Object} shoppingList Shopping list's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shopping list not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ ingredients, isDone }),
  update)

/**
 * @api {delete} /shopping-lists/:id Delete shopping list
 * @apiName DeleteShoppingList
 * @apiGroup ShoppingList
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Shopping list not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
