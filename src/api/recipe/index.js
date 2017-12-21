import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Recipe, { schema } from './model'

const router = new Router()
const { ingredients, name, description, picture, preparation_time, cooking_time, type } = schema.tree

/**
 * @api {post} /recipes Create recipe
 * @apiName CreateRecipe
 * @apiGroup Recipe
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam ingredients Recipe's ingredients.
 * @apiParam name Recipe's name.
 * @apiParam description Recipe's description.
 * @apiParam picture Recipe's picture.
 * @apiParam preparation_time Recipe's preparation_time.
 * @apiParam cooking_time Recipe's cooking_time.
 * @apiParam type Recipe's type.
 * @apiSuccess {Object} recipe Recipe's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Recipe not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ ingredients, name, description, picture, preparation_time, cooking_time, type }),
  create)

/**
 * @api {get} /recipes Retrieve recipes
 * @apiName RetrieveRecipes
 * @apiGroup Recipe
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of recipes.
 * @apiSuccess {Object[]} rows List of recipes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /recipes/:id Retrieve recipe
 * @apiName RetrieveRecipe
 * @apiGroup Recipe
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} recipe Recipe's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Recipe not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /recipes/:id Update recipe
 * @apiName UpdateRecipe
 * @apiGroup Recipe
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam ingredients Recipe's ingredients.
 * @apiParam name Recipe's name.
 * @apiParam description Recipe's description.
 * @apiParam picture Recipe's picture.
 * @apiParam preparation_time Recipe's preparation_time.
 * @apiParam cooking_time Recipe's cooking_time.
 * @apiParam type Recipe's type.
 * @apiSuccess {Object} recipe Recipe's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Recipe not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ ingredients, name, description, picture, preparation_time, cooking_time, type }),
  update)

/**
 * @api {delete} /recipes/:id Delete recipe
 * @apiName DeleteRecipe
 * @apiGroup Recipe
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Recipe not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
