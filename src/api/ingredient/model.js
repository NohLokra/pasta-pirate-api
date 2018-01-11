import mongoose, { Schema } from 'mongoose'

const ingredientSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  aliment: {
    type: String
  },
  quantity: {
    type: String
  },
  isInStock: {
    type: String
  },
  isInShoppingList: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

ingredientSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      aliment: this.aliment,
      quantity: this.quantity,
      isInStock: this.isInStock,
      isInShoppingList: this.isInShoppingList,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Ingredient', ingredientSchema)

export const schema = model.schema
export default model
