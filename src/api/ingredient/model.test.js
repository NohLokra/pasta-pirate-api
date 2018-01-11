import { Ingredient } from '.'
import { User } from '../user'

let user, ingredient

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  ingredient = await Ingredient.create({ user, aliment: 'test', quantity: 'test', isInStock: 'test', isInShoppingList: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = ingredient.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(ingredient.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.aliment).toBe(ingredient.aliment)
    expect(view.quantity).toBe(ingredient.quantity)
    expect(view.isInStock).toBe(ingredient.isInStock)
    expect(view.isInShoppingList).toBe(ingredient.isInShoppingList)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = ingredient.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(ingredient.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.aliment).toBe(ingredient.aliment)
    expect(view.quantity).toBe(ingredient.quantity)
    expect(view.isInStock).toBe(ingredient.isInStock)
    expect(view.isInShoppingList).toBe(ingredient.isInShoppingList)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
