import { Aliment } from '.'
import { User } from '../user'

let user, aliment

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  aliment = await Aliment.create({ user, name: 'test', picture: 'test', type: 'test', unit: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = aliment.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(aliment.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(aliment.name)
    expect(view.picture).toBe(aliment.picture)
    expect(view.type).toBe(aliment.type)
    expect(view.unit).toBe(aliment.unit)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = aliment.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(aliment.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(aliment.name)
    expect(view.picture).toBe(aliment.picture)
    expect(view.type).toBe(aliment.type)
    expect(view.unit).toBe(aliment.unit)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
