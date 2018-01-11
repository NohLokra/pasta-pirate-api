import mongoose, { Schema } from 'mongoose'

const recipeSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  cookingTime: {
    type: String
  },
  preparationTime: {
    type: String
  },
  image: {
    type: String
  },
  ingredients: {
    type: Array
  },
  type: {
    type: String
  },
  createdAt: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

recipeSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      author: this.author.view(full),
      name: this.name,
      description: this.description,
      cookingTime: this.cookingTime,
      preparationTime: this.preparationTime,
      image: this.image,
      ingredients: this.ingredients,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Recipe', recipeSchema)

export const schema = model.schema
export default model
