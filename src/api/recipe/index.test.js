import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Recipe } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, recipe

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  recipe = await Recipe.create({ user })
})

test('POST /recipes 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, ingredients: 'test', name: 'test', description: 'test', picture: 'test', preparation_time: 'test', cooking_time: 'test', type: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.ingredients).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.picture).toEqual('test')
  expect(body.preparation_time).toEqual('test')
  expect(body.cooking_time).toEqual('test')
  expect(body.type).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /recipes 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /recipes 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].user).toEqual('object')
})

test('GET /recipes 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /recipes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${recipe.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(recipe.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /recipes/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${recipe.id}`)
  expect(status).toBe(401)
})

test('GET /recipes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /recipes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${recipe.id}`)
    .send({ access_token: userSession, ingredients: 'test', name: 'test', description: 'test', picture: 'test', preparation_time: 'test', cooking_time: 'test', type: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(recipe.id)
  expect(body.ingredients).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.picture).toEqual('test')
  expect(body.preparation_time).toEqual('test')
  expect(body.cooking_time).toEqual('test')
  expect(body.type).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /recipes/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${recipe.id}`)
    .send({ access_token: anotherSession, ingredients: 'test', name: 'test', description: 'test', picture: 'test', preparation_time: 'test', cooking_time: 'test', type: 'test' })
  expect(status).toBe(401)
})

test('PUT /recipes/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${recipe.id}`)
  expect(status).toBe(401)
})

test('PUT /recipes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, ingredients: 'test', name: 'test', description: 'test', picture: 'test', preparation_time: 'test', cooking_time: 'test', type: 'test' })
  expect(status).toBe(404)
})

test('DELETE /recipes/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${recipe.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /recipes/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${recipe.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /recipes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${recipe.id}`)
  expect(status).toBe(401)
})

test('DELETE /recipes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
