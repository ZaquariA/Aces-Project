// get users
// get first user
// add  'p' element
// show wins_loses inside 'p' element

urlGet(urlUsers)
  .then(users => {
    pasteWinsLosesInfo(users[0])
  })

  function pasteWinsLosesInfo(user) {
    console.log(user)
    const p = document.createElement('p')
    const ul = document.getElementById('score')

    p.textContent = user.wins_loses[0] + " / " + user.wins_loses[1]   ///  user["wins_loses"] == user.wins_loses
    ul.append(p)
  }
