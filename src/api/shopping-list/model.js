import mongoose, { Schema } from 'mongoose'

const shoppingListSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  ingredients: {
    type: String
  },
  isDone: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

shoppingListSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      ingredients: this.ingredients,
      isDone: this.isDone,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('ShoppingList', shoppingListSchema)

export const schema = model.schema
export default model
