import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Ingredient } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, ingredient

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  ingredient = await Ingredient.create({ user })
})

test('POST /ingredients 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, aliment: 'test', quantity: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.aliment).toEqual('test')
  expect(body.quantity).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /ingredients 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /ingredients 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].user).toEqual('object')
})

test('GET /ingredients 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /ingredients/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${ingredient.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(ingredient.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /ingredients/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${ingredient.id}`)
  expect(status).toBe(401)
})

test('GET /ingredients/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /ingredients/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${ingredient.id}`)
    .send({ access_token: userSession, aliment: 'test', quantity: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(ingredient.id)
  expect(body.aliment).toEqual('test')
  expect(body.quantity).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /ingredients/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${ingredient.id}`)
    .send({ access_token: anotherSession, aliment: 'test', quantity: 'test' })
  expect(status).toBe(401)
})

test('PUT /ingredients/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${ingredient.id}`)
  expect(status).toBe(401)
})

test('PUT /ingredients/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, aliment: 'test', quantity: 'test' })
  expect(status).toBe(404)
})

test('DELETE /ingredients/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${ingredient.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /ingredients/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${ingredient.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /ingredients/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${ingredient.id}`)
  expect(status).toBe(401)
})

test('DELETE /ingredients/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
