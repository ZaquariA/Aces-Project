// get users
// get first user
// add  'p' element
// show wins_loses inside 'p' element

urlGet(urlUsers)
  .then(users => {
    pasteWinsLosesInfo(users[0])
    pasteLast5GameInfo(users[0])
  })

  function pasteWinsLosesInfo(user) {
   // console.log(user)
    const p = document.createElement('p')
    const ul = document.getElementById('score')

    p.textContent = user.wins_loses[0] + " / " + user.wins_loses[1]   ///  user["wins_loses"] == user.wins_loses
    // ul.append(p)


  }


  function  pasteLast5GameInfo(user){

    
    const ul = document.getElementById('score')

    if (user.last5games && user.last5games.length > 0) {
        // p.textContent = "Game History: " + user.last5games.join(" / ");
        
        user.last5games.forEach(item => {
            const p = document.createElement('p')
            p.textContent = item
            // ul.append(p)
        })
      } 
     
    }
