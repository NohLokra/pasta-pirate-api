import { ShoppingListIngredient } from '.'
import { User } from '../user'

let user, shoppingListIngredient

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  shoppingListIngredient = await ShoppingListIngredient.create({ user, aliment: 'test', quantity: 'test', isTaken: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = shoppingListIngredient.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(shoppingListIngredient.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.aliment).toBe(shoppingListIngredient.aliment)
    expect(view.quantity).toBe(shoppingListIngredient.quantity)
    expect(view.isTaken).toBe(shoppingListIngredient.isTaken)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = shoppingListIngredient.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(shoppingListIngredient.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.aliment).toBe(shoppingListIngredient.aliment)
    expect(view.quantity).toBe(shoppingListIngredient.quantity)
    expect(view.isTaken).toBe(shoppingListIngredient.isTaken)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
