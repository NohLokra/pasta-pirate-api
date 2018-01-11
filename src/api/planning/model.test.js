import { Planning } from '.'
import { User } from '../user'

let user, planning

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  planning = await Planning.create({ user, date: 'test', menu: 'test', menu_type: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = planning.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(planning.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.date).toBe(planning.date)
    expect(view.menu).toBe(planning.menu)
    expect(view.menu_type).toBe(planning.menu_type)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = planning.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(planning.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.date).toBe(planning.date)
    expect(view.menu).toBe(planning.menu)
    expect(view.menu_type).toBe(planning.menu_type)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
