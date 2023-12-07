let currentUser

getAllUsers()
// Users Funtionality
function getAllUsers(){
urlGet(urlUsers)
  .then(data => {

    showUsers(data)
    hideAllGameButtons(true)
  })
}

function hideAllGameButtons(status) {
  if (status) {
    getEl('#btn_hit').style.visibility="hidden" 
    getEl('#btn_stand').style.visibility="hidden"
    getEl('#btn_new_game').style.visibility="hidden"
    getEl('#bet').style.visibility="hidden"
  } else {
    getEl('#btn_hit').style.visibility="" 
    getEl('#btn_stand').style.visibility=""
    getEl('#btn_new_game').style.visibility=""
    getEl('#bet').style.visibility=""
  }
}

const table = document.querySelector('#player-table')
const button = document.querySelector('button')
function showUsers(users) {
    
    table.innerHTML = ""

    // table headers

    const trHeaders = createEl('tr')
    const thEdit = createEl('th')
    const thPlayers = createEl('th')
    const thPoints = createEl('th')
    const thWinsLoses = createEl('th')
    
    thEdit.textContent = " "
    thPlayers.textContent = "Name"
    thPoints.textContent = "Pts"
    thWinsLoses.textContent = "W / L"

    thEdit.style.border = "none"

    trHeaders.append(thEdit,thPlayers, thPoints, thWinsLoses)
    table.append(trHeaders)

    // creating each player

  users.forEach(user => {
    

    const tr = createEl('tr')
    const tdEditButton = createEl('td')
    const editButton = createEl('button')
    const tdPlayer = createEl('td')
    const tdPoints = createEl('td')
    const tdWinsLoses = createEl('td')
    const tdButton = createEl('td')
    const tdDelete = createEl('button')
 

    editButton.textContent = "Edit"
    tdPlayer.textContent = user.username
    tdPoints.textContent = user.points
    tdWinsLoses.textContent = user.wins_loses[0] + "/" + user.wins_loses[1]
    tdDelete.textContent = "X"
    tdButton.style.border = "none"
    tdEditButton.style.border = "none"


    tdEditButton.append(editButton)
    tdButton.append(tdDelete)
    tr.append(tdEditButton, tdPlayer, tdPoints, tdWinsLoses, tdButton)
    table.append(tr)

    tdButton.addEventListener('click', () => {
        deleteUser(user.id)
    })
    tdPlayer.addEventListener('click', () => {
        currentUser = user
        displayTotalAndName(user)
        showGameHistory(user)
        hideAllGameButtons(false)
        
        cleanPlayerTable()
        cleanDealerTable()
        showBackOfPlayerCards()
        showBackOfDealerCards()
    })
    tdEditButton.addEventListener('click', () => {
        editUser(user)
    })
    tdPlayer.addEventListener('mouseover', () => {
        tdPlayer.style.color = "red"
        tdPlayer.style.cursor = "pointer"
    })
    tdPlayer.addEventListener('mouseout', () => {
        tdPlayer.style.color = "yellow"
    })
    playerForm.reset()
  })
}

function displayTotalAndName(user) {
    const totalPlayPointsAndName = document.querySelector('div#game-panel h2')
    totalPlayPointsAndName.textContent = "Name: " + user.username + "  " + "Total: " + user.points
    console.log(2)
}

function showGameHistory(user) {
    const ul = document.getElementById('score')
    ul.innerHTML = ""
    const h2 = document.createElement('h2')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    const h3WL = document.createElement('h3')


    h2.textContent = "Game History"
    h3.textContent = "Wins and Loses"
    h3WL.textContent = "Last 5 Games"
    
    p.textContent = user.wins_loses[0] + " / " + user.wins_loses[1]   ///  user["wins_loses"] == user.wins_loses
    ul.append(h2, h3, p, h3WL)

    user.last5games.forEach(item => {
        const p = document.createElement('p')
        p.textContent = item
        ul.append(p)
    })
}
//Edit user function 

function editUser(user) {
    let editPlayer = prompt("Please enter your new name:", user.username);
  if (editPlayer !== null && editPlayer !== "") {
    user.username = editPlayer
  }
  userPatch(urlUsers, "PATCH", user, user.id)
  .then(data => getAllUsers())
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

// player input 
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