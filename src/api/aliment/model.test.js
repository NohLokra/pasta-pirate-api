import { Aliment } from '.'

let aliment

beforeEach(async () => {
  aliment = await Aliment.create({ name: 'test', image: 'test', type: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = aliment.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(aliment.id)
    expect(view.name).toBe(aliment.name)
    expect(view.image).toBe(aliment.image)
    expect(view.type).toBe(aliment.type)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = aliment.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(aliment.id)
    expect(view.name).toBe(aliment.name)
    expect(view.image).toBe(aliment.image)
    expect(view.type).toBe(aliment.type)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
