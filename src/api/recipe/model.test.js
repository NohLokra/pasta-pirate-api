import { Recipe } from '.'
import { User } from '../user'

let user, recipe

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  recipe = await Recipe.create({ user, ingredients: 'test', name: 'test', description: 'test', picture: 'test', preparation_time: 'test', cooking_time: 'test', type: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = recipe.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(recipe.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.ingredients).toBe(recipe.ingredients)
    expect(view.name).toBe(recipe.name)
    expect(view.description).toBe(recipe.description)
    expect(view.picture).toBe(recipe.picture)
    expect(view.preparation_time).toBe(recipe.preparation_time)
    expect(view.cooking_time).toBe(recipe.cooking_time)
    expect(view.type).toBe(recipe.type)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = recipe.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(recipe.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.ingredients).toBe(recipe.ingredients)
    expect(view.name).toBe(recipe.name)
    expect(view.description).toBe(recipe.description)
    expect(view.picture).toBe(recipe.picture)
    expect(view.preparation_time).toBe(recipe.preparation_time)
    expect(view.cooking_time).toBe(recipe.cooking_time)
    expect(view.type).toBe(recipe.type)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
