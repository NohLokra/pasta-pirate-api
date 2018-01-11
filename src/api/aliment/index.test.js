import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Aliment } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, aliment

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  aliment = await Aliment.create({})
})

test('POST /aliments 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', image: 'test', type: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.type).toEqual('test')
})

test('POST /aliments 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /aliments 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /aliments 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /aliments/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${aliment.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(aliment.id)
})

test('GET /aliments/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /aliments/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${aliment.id}`)
    .send({ access_token: adminSession, name: 'test', image: 'test', type: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(aliment.id)
  expect(body.name).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.type).toEqual('test')
})

test('PUT /aliments/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${aliment.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /aliments/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${aliment.id}`)
  expect(status).toBe(401)
})

test('PUT /aliments/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', image: 'test', type: 'test' })
  expect(status).toBe(404)
})

test('DELETE /aliments/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${aliment.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /aliments/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${aliment.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /aliments/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${aliment.id}`)
  expect(status).toBe(401)
})

test('DELETE /aliments/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
