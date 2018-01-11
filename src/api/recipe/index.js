import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Recipe, { schema } from './model'

const router = new Router()
const { name, description, cookingTime, preparationTime, image, ingredients, type, createdAt } = schema.tree

/**
 * @api {post} /recipes Create recipe
 * @apiName CreateRecipe
 * @apiGroup Recipe
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Recipe's name.
 * @apiParam description Recipe's description.
 * @apiParam cookingTime Recipe's cookingTime.
 * @apiParam preparationTime Recipe's preparationTime.
 * @apiParam image Recipe's image.
 * @apiParam ingredients Recipe's ingredients.
 * @apiParam type Recipe's type.
 * @apiParam createdAt Recipe's createdAt.
 * @apiSuccess {Object} recipe Recipe's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Recipe not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, description, cookingTime, preparationTime, image, ingredients, type, createdAt }),
  create)

/**
 * @api {get} /recipes Retrieve recipes
 * @apiName RetrieveRecipes
 * @apiGroup Recipe
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of recipes.
 * @apiSuccess {Object[]} rows List of recipes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /recipes/:id Retrieve recipe
 * @apiName RetrieveRecipe
 * @apiGroup Recipe
 * @apiSuccess {Object} recipe Recipe's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Recipe not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /recipes/:id Update recipe
 * @apiName UpdateRecipe
 * @apiGroup Recipe
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Recipe's name.
 * @apiParam description Recipe's description.
 * @apiParam cookingTime Recipe's cookingTime.
 * @apiParam preparationTime Recipe's preparationTime.
 * @apiParam image Recipe's image.
 * @apiParam ingredients Recipe's ingredients.
 * @apiParam type Recipe's type.
 * @apiParam createdAt Recipe's createdAt.
 * @apiSuccess {Object} recipe Recipe's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Recipe not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, description, cookingTime, preparationTime, image, ingredients, type, createdAt }),
  update)

/**
 * @api {delete} /recipes/:id Delete recipe
 * @apiName DeleteRecipe
 * @apiGroup Recipe
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Recipe not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
