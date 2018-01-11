import { Stock } from '.'
import { User } from '../user'

let user, stock

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  stock = await Stock.create({ user, aliment: 'test', quantity: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = stock.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(stock.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.aliment).toBe(stock.aliment)
    expect(view.quantity).toBe(stock.quantity)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = stock.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(stock.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.aliment).toBe(stock.aliment)
    expect(view.quantity).toBe(stock.quantity)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
