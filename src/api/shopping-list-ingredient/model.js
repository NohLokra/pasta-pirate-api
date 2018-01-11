import mongoose, { Schema } from 'mongoose'

const shoppingListIngredientSchema = new Schema({
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
  isTaken: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

shoppingListIngredientSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      aliment: this.aliment,
      quantity: this.quantity,
      isTaken: this.isTaken,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('ShoppingListIngredient', shoppingListIngredientSchema)

export const schema = model.schema
export default model
