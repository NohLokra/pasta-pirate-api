import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Aliment, { schema } from './model'

const router = new Router()
const { name, image, type } = schema.tree

/**
 * @api {post} /aliments Create aliment
 * @apiName CreateAliment
 * @apiGroup Aliment
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Aliment's name.
 * @apiParam image Aliment's image.
 * @apiParam type Aliment's type.
 * @apiSuccess {Object} aliment Aliment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Aliment not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, image, type }),
  create)

/**
 * @api {get} /aliments Retrieve aliments
 * @apiName RetrieveAliments
 * @apiGroup Aliment
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of aliments.
 * @apiSuccess {Object[]} rows List of aliments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /aliments/:id Retrieve aliment
 * @apiName RetrieveAliment
 * @apiGroup Aliment
 * @apiSuccess {Object} aliment Aliment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Aliment not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /aliments/:id Update aliment
 * @apiName UpdateAliment
 * @apiGroup Aliment
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Aliment's name.
 * @apiParam image Aliment's image.
 * @apiParam type Aliment's type.
 * @apiSuccess {Object} aliment Aliment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Aliment not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, image, type }),
  update)

/**
 * @api {delete} /aliments/:id Delete aliment
 * @apiName DeleteAliment
 * @apiGroup Aliment
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Aliment not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
