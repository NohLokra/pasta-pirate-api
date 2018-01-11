import { ShoppingList } from '.'
import { User } from '../user'

let user, shoppingList

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  shoppingList = await ShoppingList.create({ user, ingredients: 'test', isDone: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = shoppingList.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(shoppingList.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.ingredients).toBe(shoppingList.ingredients)
    expect(view.isDone).toBe(shoppingList.isDone)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = shoppingList.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(shoppingList.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.ingredients).toBe(shoppingList.ingredients)
    expect(view.isDone).toBe(shoppingList.isDone)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
