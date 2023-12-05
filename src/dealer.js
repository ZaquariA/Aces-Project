function checkResult() {

    // console.log('dealerCardsValue: ', dealerCardsValue)
    if (playerCardsValue > 21) {
      setGameStatus('You lose!')
      // cleanTable()
    } else if (userDone && dealerCardsValue > 21 ){
      console.log('dealerCardsValue > 21')
      setGameStatus('You win!')
      // cleanTable()
    } else if (userDone && dealerCardsValue < 15 ) {
      console.log('dealerCardsValue < 15 ')
      callDealerHit()
    } else if (userDone && dealerCardsValue > 15 ) {
      console.log('dealerCardsValue >= 15 ')
      
    if (playerCardsValue === dealerCardsValue) {
        setGameStatus('Draw!')
    } else if (playerCardsValue > dealerCardsValue) {
        setGameStatus('You win!')
        // cleanTable()
      } else {
        setGameStatus('You lose!')
        // cleanTable()
      }
    }
  }