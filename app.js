const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// route our static
app.use('/static', express.static('public'))

// MIDDLWARE
// app.use((req, res, next) => {
//   console.log('This is how you can add middleware');
//   req.message = "This message is now accessible on the request."
//   next();
// })

// app.use((req, res, next) => {
//   console.log(req.message);
//   const err = new Error('uhoh')
//    error.status = 404;
//  // if you have an error remember to pass it into the next function
//   next(err);
// })

// app.use('/newpage', (req, res, next) => {
//   console.log('This will only show on the /newpage route.')
// })

app.set('view engine', 'pug')

const mainRoutes = require('./routes')
const cardRoutes = require('./routes/cards')

app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.listen(3000, () => {
  console.log('server running on 3000')
})