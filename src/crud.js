const urlDeck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
const urlShuffleCards = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
const urlUsers = 'http://localhost:3000/users'

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


// Elements Functions
function getEl(el) {
  return document.querySelector(el)
}

function createEl(el) {
  return document.createElement(el)
}