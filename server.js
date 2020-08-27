require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (err) => { if(err) console.log(err) } )
db.once('open', () => console.log('Successfully connected.'))

const usersRouter = require('./routes/users')
app.use('/api/users', usersRouter)

const ingredientListsRouter = require('./routes/ingredientsLists')
app.use('/api/ingredientsList', ingredientListsRouter)

app.listen(process.env.PORT)
