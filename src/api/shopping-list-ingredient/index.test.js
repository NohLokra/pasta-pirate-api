import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { ShoppingListIngredient } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, shoppingListIngredient

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  shoppingListIngredient = await ShoppingListIngredient.create({ user })
})

test('POST /shopping-list-ingredients 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, aliment: 'test', quantity: 'test', isTaken: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.aliment).toEqual('test')
  expect(body.quantity).toEqual('test')
  expect(body.isTaken).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /shopping-list-ingredients 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /shopping-list-ingredients 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /shopping-list-ingredients 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /shopping-list-ingredients/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${shoppingListIngredient.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(shoppingListIngredient.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /shopping-list-ingredients/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${shoppingListIngredient.id}`)
  expect(status).toBe(401)
})

test('GET /shopping-list-ingredients/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /shopping-list-ingredients/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${shoppingListIngredient.id}`)
    .send({ access_token: userSession, aliment: 'test', quantity: 'test', isTaken: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(shoppingListIngredient.id)
  expect(body.aliment).toEqual('test')
  expect(body.quantity).toEqual('test')
  expect(body.isTaken).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /shopping-list-ingredients/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${shoppingListIngredient.id}`)
    .send({ access_token: anotherSession, aliment: 'test', quantity: 'test', isTaken: 'test' })
  expect(status).toBe(401)
})

test('PUT /shopping-list-ingredients/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${shoppingListIngredient.id}`)
  expect(status).toBe(401)
})

test('PUT /shopping-list-ingredients/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, aliment: 'test', quantity: 'test', isTaken: 'test' })
  expect(status).toBe(404)
})

test('DELETE /shopping-list-ingredients/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${shoppingListIngredient.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /shopping-list-ingredients/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${shoppingListIngredient.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /shopping-list-ingredients/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${shoppingListIngredient.id}`)
  expect(status).toBe(401)
})

test('DELETE /shopping-list-ingredients/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
