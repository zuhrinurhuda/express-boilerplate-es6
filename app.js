import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'

import index from './routes/index'
import users from './routes/users'

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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

module.exports = app
