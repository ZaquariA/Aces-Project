const urlUsers = 'http://localhost:3000/users'


// Users Funtionality
function getAllUsers(){
urlGet(urlUsers)
  .then(data => {

    showUsers(data)
  })
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
        console.log('click')
    })
    tdEditButton.addEventListener('click', () => {
        editUser(user)
    })
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
