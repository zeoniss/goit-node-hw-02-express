const express = require("express")
const logger = require("morgan")
const cors = require("cors")

const contactsRouter = require("./routes/api/contacts")

const app = express()

const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use("/api/contacts", contactsRouter)

app.use((req, res) => {})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app