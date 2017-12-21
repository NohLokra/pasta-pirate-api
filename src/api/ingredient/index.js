import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Ingredient, { schema } from './model'

const router = new Router()
const { aliment, quantity } = schema.tree

/**
 * @api {post} /ingredients Create ingredient
 * @apiName CreateIngredient
 * @apiGroup Ingredient
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam aliment Ingredient's aliment.
 * @apiParam quantity Ingredient's quantity.
 * @apiSuccess {Object} ingredient Ingredient's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ingredient not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ aliment, quantity }),
  create)

/**
 * @api {get} /ingredients Retrieve ingredients
 * @apiName RetrieveIngredients
 * @apiGroup Ingredient
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of ingredients.
 * @apiSuccess {Object[]} rows List of ingredients.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /ingredients/:id Retrieve ingredient
 * @apiName RetrieveIngredient
 * @apiGroup Ingredient
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} ingredient Ingredient's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ingredient not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /ingredients/:id Update ingredient
 * @apiName UpdateIngredient
 * @apiGroup Ingredient
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam aliment Ingredient's aliment.
 * @apiParam quantity Ingredient's quantity.
 * @apiSuccess {Object} ingredient Ingredient's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ingredient not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ aliment, quantity }),
  update)

/**
 * @api {delete} /ingredients/:id Delete ingredient
 * @apiName DeleteIngredient
 * @apiGroup Ingredient
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Ingredient not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
