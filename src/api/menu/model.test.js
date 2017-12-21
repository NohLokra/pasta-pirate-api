import { Menu } from '.'
import { User } from '../user'

let user, menu

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  menu = await Menu.create({ user, starter: 'test', dish: 'test', dessert: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = menu.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(menu.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.starter).toBe(menu.starter)
    expect(view.dish).toBe(menu.dish)
    expect(view.dessert).toBe(menu.dessert)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = menu.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(menu.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.starter).toBe(menu.starter)
    expect(view.dish).toBe(menu.dish)
    expect(view.dessert).toBe(menu.dessert)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
