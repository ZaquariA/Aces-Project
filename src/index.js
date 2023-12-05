console.log("test")

const urlDeck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
const urlShuffleCards = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
const urlUsers = 'http://localhost:3000/users'

let deckId
let playerTotalBetPoints = 100
let dealerTotalBetPoints = 100

let playerCardsValue = 0
let dealerCardsValue = 0

let userDone = false

let cardsValArr = ["ACE", "ACE"]

showBackOfCards()
getAllUsers()
// userPatch(urlUsers, "DELETE", {}, 3)
// userPatch(urlUsers, "PATCH",{somedata}, 3)
// .then(data => {
//   console.log(data)
// })

// Users Funtionality
function getAllUsers(){
urlGet(urlUsers)
  .then(data => {
    // console.log('RES: ', data)

    showUsers(data)
  })
}

const table = document.querySelector('#player-table')
const button = document.querySelector('button')
function showUsers(users) {
    
    table.innerHTML = ""

    const trHeaders = createEl('tr')
    const thPlayers = createEl('th')
    const thPoints = createEl('th')
    const thWinsLoses = createEl('th')
    
    thPlayers.textContent = "Player Name"
    thPoints.textContent = "Points"
    thWinsLoses.textContent = "Wins / Loses"

    trHeaders.append(thPlayers, thPoints, thWinsLoses)
    table.append(trHeaders)

  users.forEach(user => {
    // console.log(user)
    
    
    const tr = createEl('tr')
    const tdPlayer = createEl('td')
    const tdPoints = createEl('td')
    const tdWinsLoses = createEl('td')
    const tdButton = createEl('td')
    const tdDelete = createEl('button')
 

    tdPlayer.textContent = user.username
    tdPoints.textContent = user.points
    tdWinsLoses.textContent = user.wins_loses[0] + "/" + user.wins_loses[1]
    tdDelete.textContent = "X"
    tdButton.style.border = "none"
    tdButton.style.background = "none"

    tdButton.append(tdDelete)
    tr.append(tdPlayer, tdPoints, tdWinsLoses, tdButton)
    table.append(tr)

    tdButton.addEventListener('click', () => {
        deleteUser(user.id)
    })
    tdPlayer.addEventListener('click', () => {
        console.log('click')
    })
  })
}

//delete user

function deleteUser(userId) {
    const options = {
        method: "DELETE",
        headers: {"Content-Type" : "application/json"},
    }
    const url = `${urlUsers}/${userId}`
    fetch(url, options)
    .then(response => response.json())
    .then(data => getAllUsers())
}

// const table = document.querySelector('#player-table')
const playerForm = document.querySelector('#player-form')
playerForm.addEventListener('submit', (e) => {
    e.preventDefault()
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
        .then(user => getAllUsers())
  }


        // const newTr = createEl('tr')
        // const newTdPlayer = createEl('td')
        // const newTdPoints = createEl('td')
        // const newTdWinsLoses = createEl('td')
        // const newTdButton = createEl('td')
        // const newTdDelete = createEl('button')

        // newTdPlayer.textContent = playerInput.value
        // newTdPoints.textContent = 100
        // newTdWinsLoses.textContent = 0 +'/' + 0
        // newTdDelete.textContent = "X"

        // newTdButton.append(newTdDelete)
        // newTr.append(newTdPlayer, newTdPoints, newTdWinsLoses, newTdButton)
        // table.append(newTr)

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

function cleanTable() {
  const cardsEl = getEl('#cards_player')
  cardsEl.innerHTML = ''
  const cardsEl2 = getEl('#cards_casino')
  cardsEl2.innerHTML = ''
  // showBackOfCards()

  playerCardsValue = 0
  dealerCardsValue = 0

  getEl('#score_player').textContent = `Player: 0`
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

function showBackOfCards() {
  const arrCards = ['#cards_player', '#cards_player', '#cards_casino', '#cards_casino']
  
  arrCards.forEach( cardEl => {
    const crd = getEl(cardEl)
    const img = createEl('img')

    img.src = "https://deckofcardsapi.com/static/img/back.png"
    img.alt = "Avatar"
    img.style = "width:100%"
    crd.append(img)

  })
}









// Elements Functions
function getEl(el) {
  return document.querySelector(el)
}

function createEl(el) {
  return document.createElement(el)
}





// URL Functions
// GET
// urlGet(url)
// .then(data => {
//   data.map(item => {
//     get Element
//     create new element

//     append
//   })
// })

function urlGet(url) {
  return fetch(url)
    .then(res => res.json())
}

// PATCH and DELETE
// userPtch(url, "PATCH/DELETE", {}, 3)
function userPatch(url, method, body, id) {
  const options = {method: method,
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }
  const urlAddress = `${url}/${id}`
  return fetch(urlAddress, options)
    .then(res => res.json())
}









function urlCUD(url, method, id) {
  fetch(url)
    .then(res => res.json())
}