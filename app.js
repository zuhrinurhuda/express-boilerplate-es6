// import libraries
import {} from 'dotenv/config'
import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

// import routes
import index from './routes/index'
import users from './routes/users'

// set up db
mongoose.connect(`${process.env.MONGO_ATLAS}`, { useMongoClient: true })
mongoose.Promise = global.Promise

const app = express()

// middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// website routes
app.use('/', index)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send('error')
})

export default app
