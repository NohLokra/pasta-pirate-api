import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Aliment, { schema } from './model'

const router = new Router()
const { name, picture, type, unit } = schema.tree

/**
 * @api {post} /aliments Create aliment
 * @apiName CreateAliment
 * @apiGroup Aliment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Aliment's name.
 * @apiParam picture Aliment's picture.
 * @apiParam type Aliment's type.
 * @apiParam unit Aliment's unit.
 * @apiSuccess {Object} aliment Aliment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Aliment not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, picture, type, unit }),
  create)

/**
 * @api {get} /aliments Retrieve aliments
 * @apiName RetrieveAliments
 * @apiGroup Aliment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of aliments.
 * @apiSuccess {Object[]} rows List of aliments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /aliments/:id Retrieve aliment
 * @apiName RetrieveAliment
 * @apiGroup Aliment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} aliment Aliment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Aliment not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /aliments/:id Update aliment
 * @apiName UpdateAliment
 * @apiGroup Aliment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Aliment's name.
 * @apiParam picture Aliment's picture.
 * @apiParam type Aliment's type.
 * @apiParam unit Aliment's unit.
 * @apiSuccess {Object} aliment Aliment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Aliment not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, picture, type, unit }),
  update)

/**
 * @api {delete} /aliments/:id Delete aliment
 * @apiName DeleteAliment
 * @apiGroup Aliment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Aliment not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
