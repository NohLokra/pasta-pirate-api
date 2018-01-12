import { Router } from 'express'
import user from './user'
import auth from './auth'
import aliment from './aliment'
import recipe from './recipe'
import menu from './menu'
import ingredient from './ingredient'
import planning from './planning'
import shoppingListIngredient from './shopping-list-ingredient'
import shoppingList from './shopping-list'
import stock from './stock'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user)
router.use('/auth', auth)
router.use('/aliments', aliment)
router.use('/recipes', recipe)
router.use('/menus', menu)
router.use('/ingredients', ingredient)
router.use('/plannings', planning)
router.use('/shopping-list-ingredients', shoppingListIngredient)
router.use('/shopping-lists', shoppingList)
router.use('/stocks', stock)

export default router
