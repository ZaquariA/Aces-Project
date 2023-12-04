// EVENTLISTENERS

// NEW GAME BUTTON
function startGame() {
  getEl('#btn_new_game').addEventListener('click', () => {
    console.log('start')
    shuffleCards()
      .then(data => {
        deckId = data.deck_id
  
        cleanTable()
  
        getCards(deckId, 2)
          .then(cards => showCardOnTable(cards, "#cards_player"))
      })
  })
}


// HIT BUTTON
function callHit() {
  getEl('#btn_hit').addEventListener('click', () => {

    getCards(deckId, 1)
      .then(cards => showCardOnTable(cards, "#cards_player"))
  })
}


// STAND BUTTON
function callStand() {
  getEl('#btn_stand').addEventListener('click', () => {
    userDone = true
  //   getCards(deckId, 2)
  //     .then(cards => showCardOnTable(cards, "#cards_casino"))
  })
}

// HIT BUTTON
function callDealerHit() {
    getCards(deckId, 1)
      .then(cards => showCardOnTable(cards, "#cards_casino"))
}

startGame()
callHit()
callStand()