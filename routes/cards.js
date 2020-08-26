const express = require('express')
const router = express.Router();
const { data } = require('../data/flashcardData.json')
const { cards } = data;

router.get('/', (req, res) => {
  // redirect the user to a random card if they visit /cards
  const cardAmount = cards.length;
  const randomCard = Math.floor(Math.random() * Math.floor(cardAmount + 1))
  res.redirect(`/cards/${randomCard}`)
})
// /cards isn't necessary because it's being routed into the cards route.
router.get('/:id', (req, res) => {
  // you can get the url parameter by using req.params
  const { side } = req.query;
  const { id } = req.params
  const text = cards[id][side]
  const { hint } = cards[id]
  const name = req.cookies.username;
  const templateData = { id, text, name }

  if (!side) {
    // remember to return a redirect.
    // this stops the execution of the rest of the functions on this file!
    // which is what we want!
    return res.redirect(`/cards/${id}?side=question`)
  }

  if (side === 'question') {
    templateData.hint = hint
    templateData.sideToShow = 'answer'
    templateData.sideToShowDisplay = 'Answer'
  } else if (side === 'answer') {
    templateData.sideToShow = 'question'
    templateData.sideToShowDisplay = 'Question'
  }

  res.render('card', templateData)
})

module.exports = router