const playerTable = document.querySelector('#section-1')




const url = "http://localhost:3000/Players"

const getPlayers = () => {
    fetch(url)
    .then(response => response.json())
    .then(playerArr => {

        createPlayer(playerArr)

        playerArr.map(player => {
            displayPlayerDetails(player)
        })
    })
}

const displayPlayerDetails = (player) => {
    
const tr = document.createElement('tr')
const playerName = document.createElement('td')
const playerPoints = document.createElement('td')
const winsLoses = document.createElement('td')
const tdButton = document.createElement('td')
const deleteButton = document.createElement('button')


    
    playerName.textContent = player.player
    playerPoints.textContent = player.points
    

    winsLoses.textContent = player.wins + "/" + player.loses



    deleteButton.textContent = player.delete

    tdButton.append(deleteButton)
    tr.append(playerName, playerPoints, winsLoses, tdButton)
    playerTable.append(tr)
}

const createPlayer = (player) => {
    const createPlayerForm = document.querySelector('#create-player')
    createPlayerForm.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log(e)
    
    const tr = document.createElement('tr')
    const playerName = document.createElement('td')
    const playerPoints = document.createElement('td')
    const winsLoses = document.createElement('td')
    const tdButton = document.createElement('td')
    const deleteButton = document.createElement('button')

   
    player.wins = 0
    player.loses = 0

    playerName.textContent = e.target['player-input'].value
    playerPoints.textContent = e.target['points-input'].value
    
    winsLoses.textContent = player.wins + '/' + player.loses
    deleteButton.textContent = "X"
    
    

    tdButton.append(deleteButton)
    tr.append(playerName, playerPoints, winsLoses, tdButton)
    playerTable.append(tr)
    
        })
    }
getPlayers()