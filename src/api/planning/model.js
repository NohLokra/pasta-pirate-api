import mongoose, { Schema } from 'mongoose'

const planningSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String
  },
  menu: {
    type: String
  },
  menu_type: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

planningSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      date: this.date,
      menu: this.menu,
      menu_type: this.menu_type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Planning', planningSchema)

export const schema = model.schema
export default model
