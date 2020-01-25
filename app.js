'use strict'

const createError = require('http-errors')
const express = require('express')
const sassMiddleware = require('node-sass-middleware')
const postcssMiddleware = require('postcss-middleware')
const autoprefixer = require('autoprefixer')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./controllers/routes')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// add the sass middleware
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public/stylesheets'),
    prefix: '/stylesheets',
    /* outputStyle: 'compressed', */ // will be used at production
    debug: true
  })
)
// add the autoprefixer via postcss middleware
app.use(
  '/stylesheets', postcssMiddleware({
    src: function (req) {
      return path.join(__dirname, 'public', 'stylesheets', req.path)
    },
    plugins: [
      autoprefixer({
        Browserslist: ['last 4 versions']
      })
    ]
  })
)

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
