import mongoose from 'mongoose'
import { env } from './env.js'

export const connectDb = async () => {
    await mongoose.connect(env.MONGO_URL)
    
    if (mongoose.connection.readyState !== 1) {
        await new Promise((resolve, reject) => {
            mongoose.connection.once('connected', resolve)
            mongoose.connection.once('error', reject)
        })
    }
}

export const disconnectDb = async () => {
    return mongoose.disconnect().then(() => console.log("disconnected!"))
}

