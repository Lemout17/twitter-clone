import mongoose from 'mongoose'

export async function initMongoose() {
  mongoose.set('strictQuery', true)
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise()
  }
  await mongoose.connect(process.env.MONGODB_URI)
}
