import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Aliment } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, aliment

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  aliment = await Aliment.create({ user })
})

test('POST /aliments 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', picture: 'test', type: 'test', unit: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.picture).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.unit).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /aliments 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /aliments 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].user).toEqual('object')
})

test('GET /aliments 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /aliments/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${aliment.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(aliment.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /aliments/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${aliment.id}`)
  expect(status).toBe(401)
})

test('GET /aliments/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /aliments/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${aliment.id}`)
    .send({ access_token: userSession, name: 'test', picture: 'test', type: 'test', unit: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(aliment.id)
  expect(body.name).toEqual('test')
  expect(body.picture).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.unit).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /aliments/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${aliment.id}`)
    .send({ access_token: anotherSession, name: 'test', picture: 'test', type: 'test', unit: 'test' })
  expect(status).toBe(401)
})

test('PUT /aliments/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${aliment.id}`)
  expect(status).toBe(401)
})

test('PUT /aliments/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', picture: 'test', type: 'test', unit: 'test' })
  expect(status).toBe(404)
})

test('DELETE /aliments/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${aliment.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /aliments/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${aliment.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /aliments/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${aliment.id}`)
  expect(status).toBe(401)
})

test('DELETE /aliments/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
