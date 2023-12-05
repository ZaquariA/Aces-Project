// EVENTLISTENERS

// NEW GAME BUTTON
function startGame() {
  getEl('#btn_new_game').addEventListener('click', () => {
    console.log('start')
    shuffleCards()
      .then(data => {
        deckId = data.deck_id

        cleanDataForNewGame()
        // showBackOfCards()
  
        getCards(deckId, 2)
          .then(cards => showCardOnTable(cards, "#cards_player"))
      })
  })
}

function cleanDataForNewGame() {
  cleanTable()

  userDone = false
  getEl('#game_status').textContent = "In process..."
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
    console.log('STAND')
    userDone = true
    getCards(deckId, 1)
      .then(cards => showCardOnTable(cards, "#cards_casino"))
  })
}

// HIT BUTTON
function callDealerHit() {
  console.log('callDealerHit')
    getCards(deckId, 1)
      .then(cards => showCardOnTable(cards, "#cards_casino"))
}

startGame()   
callHit()
callStand()



getEl('#test').addEventListener('click', () => {
  const playerName = getEl('#pname').value
  
  const newUser = {
    "username": playerName,
      "points": 100,
      "wins_loses": [0,0],
      "last5games": []
  }

  console.log(newUser)
  postUrl(newUser)
})

function postUrl(newUser) {
  const url = 'http://localhost:3000/users';
  const options = {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(newUser)
  }

  fetch(url, options)
    .then(res => res.json())
      .then(user => console.log(user))
}