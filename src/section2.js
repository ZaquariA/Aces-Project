let deckId
let playerTotalBetPoints = 100
let dealerTotalBetPoints = 100

let playerCardsValue = 0
let dealerCardsValue = 0

let userDone = false

let cardsValArr = ["ACE", "ACE"]

showBackOfPlayerCards()
showBackOfDealerCards()

// userPatch(urlUsers, "DELETE", {}, 3)
// userPatch(urlUsers, "PATCH",{somedata}, 3)
// .then(data => {
//   console.log(data)
// })

// // Users Funtionality
// urlGet(urlUsers)
//   .then(data => {
//     // console.log('RES: ', data)

//     showUsers(data)
//   })

// function showUsers(users) {
//   const listUsers = getEl('#list')
  

//   users.forEach(user => {
//     // console.log(user)
//     const li = createEl('li')
//     const deleteBtn = createEl('button')
//     li.textContent = `${user.username} ${user.points} ${user.wins_loses[0]} | ${user.wins_loses[1]}`
//     deleteBtn.textContent = "DELETE"

//     listUsers.append(li, deleteBtn)
//   })
// }


// Work with CARDS

function getCardValue(card) {
  // console.log(card.value)
  switch (card.value) {
    case "1":
      return 1
      break;
    case "2":
      return 2
      break;
    case "3":
      return 3
      break;
    case "4":
      return 4
      break;
    case "5":
      return 5
      break;
    case "6":
      return 6
      break;
    case "7":
      return 7
      break;
    case "8":
      return 8
      break;
    case "9":
      return 9
      break;
    case "10":
      return 10
      break;
    case "JACK":
      return 10
      break;
    case "QUEEN":
      return 10
      break;
    case "KING":
      return 10
      break;
    case "ACE":
      return 11
  }
}

function shuffleCards() {
  return fetch(urlDeck)
    .then(res => res.json())
}

function getCards(deckId, count) {
  const draw_card = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`
  return urlGet(draw_card)
}

function showCardOnTable(cards, cardsEl) {

  cards.cards.forEach(card => {
    const crd = getEl(cardsEl)
    const img = createEl('img')

    img.src = card.image
    img.alt = "Avatar"
    img.style = "width:100%"
    crd.append(img)

    getEl('#btn_hit').style.visibility=""
    getEl('#btn_stand').style.visibility=""
    console.log('SHOW CARD')
    addPlayerValue(card, cardsEl)
    updateTableScore(cardsEl)
    checkResult()
  })
}

function addPlayerValue(card, player) {
  // console.log(card.value, ' : ', player)
  const value = getCardValue(card)
  // console.log('Value: ', value)
  if (player === "#cards_player") {
    playerCardsValue += value
  } else {
    dealerCardsValue += value
  }
}

function cleanPlayerTable() {
  const cardsEl = getEl('#cards_player')
  cardsEl.innerHTML = ''
  
  playerCardsValue = 0

  getEl('#score_player').textContent = `Player: 0`
}

function cleanDealerTable() {
  const cardsEl2 = getEl('#cards_casino')
  cardsEl2.innerHTML = ''
 
  dealerCardsValue = 0

  getEl('#score_casino').textContent = `Casino: 0`
}

function updateTableScore(player) {
  if (player === "#cards_player") {
    getEl('#score_player').textContent = `Player: ${playerCardsValue}`
  } else {
    getEl('#score_casino').textContent = `Casino: ${dealerCardsValue}`
  }
}

function setGameStatus(text){
  getEl('#game_status').textContent = text

  getEl('#btn_hit').style.visibility="hidden"
  getEl('#btn_stand').style.visibility="hidden"
}

function showBackOfPlayerCards() {
  const arrCards = ['#cards_player', '#cards_player']
  
  arrCards.forEach( cardEl => {
    const crd = getEl(cardEl)
    const img = createEl('img')

    img.src = "https://deckofcardsapi.com/static/img/back.png"
    img.alt = "Avatar"
    img.style = "width:100%"
    crd.append(img)

  })
}

function showBackOfDealerCards() {
  const arrCards = ['#cards_casino', '#cards_casino']
  
  arrCards.forEach( cardEl => {
    const crd = getEl(cardEl)
    const img = createEl('img')

    img.src = "https://deckofcardsapi.com/static/img/back.png"
    img.alt = "Avatar"
    img.style = "width:100%"
    crd.append(img)

  })
}
