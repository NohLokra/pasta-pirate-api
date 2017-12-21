import mongoose, { Schema } from 'mongoose'

const menuSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  starter: {
    type: String
  },
  dish: {
    type: String
  },
  dessert: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

menuSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      starter: this.starter,
      dish: this.dish,
      dessert: this.dessert,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Menu', menuSchema)

export const schema = model.schema
export default model
