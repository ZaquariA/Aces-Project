function checkResult() {

  // console.log('dealerCardsValue: ', dealerCardsValue)
  if (playerCardsValue > 21) {
    setGameStatus('You lose!')
    updatePlayerData(false)
    // cleanTable()
  } else if (userDone && dealerCardsValue > 21 ){
    setGameStatus('You win!')
    updatePlayerData(true)
    // cleanTable()
  } else if (userDone && dealerCardsValue < 15 ) {
    callDealerHit()
  } else if (userDone && dealerCardsValue >= 15 ) {
    if (playerCardsValue === dealerCardsValue) {
      setGameStatus('Draw!')
    } else if (playerCardsValue > dealerCardsValue) {
      setGameStatus('You win!')
      updatePlayerData(true)
      // cleanTable()
    } else {
      setGameStatus('You lose!')
      updatePlayerData(false)
      // cleanTable()
    }
  }
}

function updatePlayerData(status) {
  const bet = getEl('#bet')

  status ? currentUser.points += Number(bet.value) : currentUser.points -= Number(bet.value)
  status ? currentUser.wins_loses[0] ++ : currentUser.wins_loses[1] ++

  if (status) {
    updateLast5Games("Player")
  } else {
    updateLast5Games("Casino")
  }

  userPatch(urlUsers, "PATCH", currentUser, currentUser.id)
    .then(data => {
      displayTotalAndName(data)
      showGameHistory(data)
    })

  lockTheGame(false)
}

function updateLast5Games(player) {
  if (currentUser.last5games.length < 5) {
    currentUser.last5games.unshift(player)
  } else {
    currentUser.last5games.pop()
    currentUser.last5games.unshift(player)
  }
}

function lockTheGame(status) {
  if (status) {
    getEl('#btn_new_game').style.visibility="hidden"
    getEl('#bet').disabled = true;
  } else {
    getEl('#btn_new_game').style.visibility=""
    getEl('#bet').disabled = false;
  }
} 