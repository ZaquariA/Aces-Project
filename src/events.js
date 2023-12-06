// EVENTLISTENERS

// NEW GAME BUTTON
function startGame() {
    getEl('#btn_new_game').addEventListener('click', () => {
      console.log('start')
      shuffleCards()
        .then(data => {
          deckId = data.deck_id
  
          cleanDataForNewGame()
          showBackOfDealerCards()
    
          getCards(deckId, 2)
            .then(cards => showCardOnTable(cards, "#cards_player"))
        })
    })
  }
  
  function cleanDataForNewGame() {
    cleanPlayerTable()
    cleanDealerTable()
  
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
      cleanDealerTable()
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
  
  
  
  // getEl('#test').addEventListener('click', () => {
  //   const playerName = getEl('#pname').value
    
  //   const newUser = {
  //     "username": playerName,
  //       "points": 100,
  //       "wins_loses": [0,0],
  //       "last5games": []
  //   }
  
  //   console.log(newUser)
  //   postUrl(newUser)
  // })
  
  // function postUrl(newUser) {
  //   const url = 'http://localhost:3000/users';
  //   const options = {
  //     method: "POST",
  //     headers: {"Content-Type":"application/json"},
  //     body: JSON.stringify(newUser)
  //   }
  
  //   fetch(url, options)
  //     .then(res => res.json())
  //       .then(user => createTable(user))
  // }
  
  // function createTable(user) {
  //   // create new row
  //   // paste information from user object into new row
  
  //   const userName = document.createElement('td')
  //   userName.textContent = user.username
  //   userName.addEventListener('click', () => {
  //     // Nothing here
  //   })
  
  // }