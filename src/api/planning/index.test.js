import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Planning } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, planning

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  planning = await Planning.create({ user })
})

test('POST /plannings 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, date: 'test', menu: 'test', menu_type: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.date).toEqual('test')
  expect(body.menu).toEqual('test')
  expect(body.menu_type).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /plannings 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /plannings 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].user).toEqual('object')
})

test('GET /plannings 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /plannings/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${planning.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(planning.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /plannings/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${planning.id}`)
  expect(status).toBe(401)
})

test('GET /plannings/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /plannings/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${planning.id}`)
    .send({ access_token: userSession, date: 'test', menu: 'test', menu_type: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(planning.id)
  expect(body.date).toEqual('test')
  expect(body.menu).toEqual('test')
  expect(body.menu_type).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /plannings/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${planning.id}`)
    .send({ access_token: anotherSession, date: 'test', menu: 'test', menu_type: 'test' })
  expect(status).toBe(401)
})

test('PUT /plannings/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${planning.id}`)
  expect(status).toBe(401)
})

test('PUT /plannings/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, date: 'test', menu: 'test', menu_type: 'test' })
  expect(status).toBe(404)
})

test('DELETE /plannings/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${planning.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /plannings/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${planning.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /plannings/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${planning.id}`)
  expect(status).toBe(401)
})

test('DELETE /plannings/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
