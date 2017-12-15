import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Menu } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, menu

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  menu = await Menu.create({ user })
})

test('POST /menus 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, starter: 'test', dish: 'test', dessert: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.starter).toEqual('test')
  expect(body.dish).toEqual('test')
  expect(body.dessert).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /menus 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /menus 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].user).toEqual('object')
})

test('GET /menus 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /menus/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${menu.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(menu.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /menus/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${menu.id}`)
  expect(status).toBe(401)
})

test('GET /menus/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /menus/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${menu.id}`)
    .send({ access_token: userSession, starter: 'test', dish: 'test', dessert: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(menu.id)
  expect(body.starter).toEqual('test')
  expect(body.dish).toEqual('test')
  expect(body.dessert).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /menus/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${menu.id}`)
    .send({ access_token: anotherSession, starter: 'test', dish: 'test', dessert: 'test' })
  expect(status).toBe(401)
})

test('PUT /menus/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${menu.id}`)
  expect(status).toBe(401)
})

test('PUT /menus/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, starter: 'test', dish: 'test', dessert: 'test' })
  expect(status).toBe(404)
})

test('DELETE /menus/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${menu.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /menus/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${menu.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /menus/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${menu.id}`)
  expect(status).toBe(401)
})

test('DELETE /menus/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
