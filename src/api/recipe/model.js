import mongoose, { Schema } from 'mongoose'

const recipeSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  ingredients: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  picture: {
    type: String
  },
  preparation_time: {
    type: String
  },
  cooking_time: {
    type: String
  },
  type: {
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
      user: this.user.view(full),
      ingredients: this.ingredients,
      name: this.name,
      description: this.description,
      picture: this.picture,
      preparation_time: this.preparation_time,
      cooking_time: this.cooking_time,
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
