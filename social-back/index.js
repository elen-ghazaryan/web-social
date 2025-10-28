import express from 'express'
import { env } from './src/config/env.js'
import { connectDb, disconnectDb } from './src/config/db.js'
import { userRouter } from './src/routes/user.js'
import { accountRouter } from './src/routes/account.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public/uploads"))

app.use("/auth", userRouter)
app.use("/account", accountRouter)

const startServer = async () => {
  try {
    await connectDb()
    console.log("✅ MongoDB connected!")

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running at: http://localhost:${env.PORT}`)
    })
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err)
    process.exit(1)
  }
}

process.on('SIGINT', async () => {
  await disconnectDb()
  console.log("🔌 MongoDB disconnected due to app termination")
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await disconnectDb()
  console.log("🔌 MongoDB disconnected due to termination signal")
  process.exit(0)
})

startServer()