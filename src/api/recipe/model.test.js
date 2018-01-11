import { Recipe } from '.'
import { User } from '../user'

let user, recipe

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  recipe = await Recipe.create({ author: user, name: 'test', description: 'test', cookingTime: 'test', preparationTime: 'test', image: 'test', ingredients: 'test', type: 'test', createdAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = recipe.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(recipe.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.name).toBe(recipe.name)
    expect(view.description).toBe(recipe.description)
    expect(view.cookingTime).toBe(recipe.cookingTime)
    expect(view.preparationTime).toBe(recipe.preparationTime)
    expect(view.image).toBe(recipe.image)
    expect(view.ingredients).toBe(recipe.ingredients)
    expect(view.type).toBe(recipe.type)
    expect(view.createdAt).toBe(recipe.createdAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = recipe.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(recipe.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.name).toBe(recipe.name)
    expect(view.description).toBe(recipe.description)
    expect(view.cookingTime).toBe(recipe.cookingTime)
    expect(view.preparationTime).toBe(recipe.preparationTime)
    expect(view.image).toBe(recipe.image)
    expect(view.ingredients).toBe(recipe.ingredients)
    expect(view.type).toBe(recipe.type)
    expect(view.createdAt).toBe(recipe.createdAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
