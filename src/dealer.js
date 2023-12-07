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
      lockTheGame(false)
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
      console.log(1)
      displayTotalAndName(data)
      showGameHistory(data)
      console.log(3)
      lockTheGame(false)
    })
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

  console.log(4)

  if (currentUser.points === 0) {
    setTimeout(sayByeBye, 100);
  }
} 

function sayByeBye() {
  alert("You lost all your money! Bye bye LOOOSER!")
  userPatch(urlUsers, "DELETE", {}, currentUser.id)
    .then(data => {
      getAllUsers()
      cleanUpAfterLooser()
    })
}

function cleanUpAfterLooser(){
  getEl("#bet").value = 0

  const ul = document.getElementById('score')
  ul.innerHTML = ""
  const h2 = document.createElement('h2')
  const h3 = document.createElement('h3')
  const p = document.createElement('p')
  const h3WL = document.createElement('h3')


  h2.textContent = "Game History"
  h3.textContent = "Wins and Loses"
  h3WL.textContent = "Last 5 Games"

  p.textContent = "0 / 0"   ///  user["wins_loses"] == user.wins_loses
  ul.append(h2, h3, p, h3WL)
}