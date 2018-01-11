import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { ShoppingList } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, shoppingList

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  shoppingList = await ShoppingList.create({ user })
})

test('POST /shopping-lists 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, ingredients: 'test', isDone: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.ingredients).toEqual('test')
  expect(body.isDone).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /shopping-lists 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /shopping-lists 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].user).toEqual('object')
})

test('GET /shopping-lists 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /shopping-lists/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${shoppingList.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(shoppingList.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /shopping-lists/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${shoppingList.id}`)
  expect(status).toBe(401)
})

test('GET /shopping-lists/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /shopping-lists/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${shoppingList.id}`)
    .send({ access_token: userSession, ingredients: 'test', isDone: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(shoppingList.id)
  expect(body.ingredients).toEqual('test')
  expect(body.isDone).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /shopping-lists/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${shoppingList.id}`)
    .send({ access_token: anotherSession, ingredients: 'test', isDone: 'test' })
  expect(status).toBe(401)
})

test('PUT /shopping-lists/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${shoppingList.id}`)
  expect(status).toBe(401)
})

test('PUT /shopping-lists/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, ingredients: 'test', isDone: 'test' })
  expect(status).toBe(404)
})

test('DELETE /shopping-lists/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${shoppingList.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /shopping-lists/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${shoppingList.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /shopping-lists/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${shoppingList.id}`)
  expect(status).toBe(401)
})

test('DELETE /shopping-lists/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
