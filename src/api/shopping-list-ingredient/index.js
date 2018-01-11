import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export ShoppingListIngredient, { schema } from './model'

const router = new Router()
const { aliment, quantity, isTaken } = schema.tree

/**
 * @api {post} /shopping-list-ingredients Create shopping list ingredient
 * @apiName CreateShoppingListIngredient
 * @apiGroup ShoppingListIngredient
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam aliment Shopping list ingredient's aliment.
 * @apiParam quantity Shopping list ingredient's quantity.
 * @apiParam isTaken Shopping list ingredient's isTaken.
 * @apiSuccess {Object} shoppingListIngredient Shopping list ingredient's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shopping list ingredient not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ aliment, quantity, isTaken }),
  create)

/**
 * @api {get} /shopping-list-ingredients Retrieve shopping list ingredients
 * @apiName RetrieveShoppingListIngredients
 * @apiGroup ShoppingListIngredient
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} shoppingListIngredients List of shopping list ingredients.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /shopping-list-ingredients/:id Retrieve shopping list ingredient
 * @apiName RetrieveShoppingListIngredient
 * @apiGroup ShoppingListIngredient
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} shoppingListIngredient Shopping list ingredient's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shopping list ingredient not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /shopping-list-ingredients/:id Update shopping list ingredient
 * @apiName UpdateShoppingListIngredient
 * @apiGroup ShoppingListIngredient
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam aliment Shopping list ingredient's aliment.
 * @apiParam quantity Shopping list ingredient's quantity.
 * @apiParam isTaken Shopping list ingredient's isTaken.
 * @apiSuccess {Object} shoppingListIngredient Shopping list ingredient's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shopping list ingredient not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ aliment, quantity, isTaken }),
  update)

/**
 * @api {delete} /shopping-list-ingredients/:id Delete shopping list ingredient
 * @apiName DeleteShoppingListIngredient
 * @apiGroup ShoppingListIngredient
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Shopping list ingredient not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
