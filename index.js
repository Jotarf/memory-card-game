const characters = ['ace.jpg', 'chopper.jpeg', 'eustass.webp', 'kawamatsu.jpg', 'oden.webp', 'luffy.jpg']
const grid = document.getElementById('cards-grid')
const cardsToRender = []
const flippedCards = []
let matchedCouples = 0

const addCard = (imageFile) => {
  const card = `
    <div class="card-parent">
      <div class="card">
        <div class="card-front">
          <image class="back-card-image" src="assets/backcardimage.png"></image>
        </div>
        <div class="card-back">
          <image class="card-image" src="assets/${imageFile}"></image>
        </div>
      </div>
    </div>
  `
  return card
}

characters.forEach((c) => {
  cardsToRender.push(addCard(c), addCard(c))
})

cardsToRender.sort(() => 0.5 - Math.random())

grid.innerHTML = ''
cardsToRender.forEach((c) => {
  grid.innerHTML += c
})

const cardsRendered = document.querySelectorAll('.card-parent')

cardsRendered.forEach((c, index) => {
  c.addEventListener('click', () => {
    flipCard(c, index)
  })
})

const flipCard = (card, cardId) => {
  if (flippedCards.length === 2) return

  const mycard = card.querySelector('.card')
  mycard.classList.add('card-active')

  const imageName = card.querySelector('.card-back>.card-image').attributes.src.value

  if(!flippedCards.some(c => c.cardId === cardId)) flippedCards.push({ card: card, imageName: imageName, cardId: cardId})

  if (flippedCards.length === 2){
    const areCardsSame = compareFlippedCards(flippedCards)
    
    setTimeout(() => {
      returnCardsToOriginalState()
      if (areCardsSame) {
        deleteSameCards()
        matchedCouples++
        isGameFinished()
      }
      flippedCards.length = 0
    }, 1000)
  }
}

const compareFlippedCards = (cards) => {
  const uniqueImageName = [...new Set(cards.map((c) => c.imageName))]
  return uniqueImageName.length === 1
}

const returnCardsToOriginalState = () => {
  flippedCards.forEach((f) => {
    f.card.classList.add('not-before')
    // f.card.classList.remove('card-active')
    f.card.querySelector('.card').classList.remove('card-active')
    setTimeout(() => {
      f.card.classList.remove('not-before')
    }, 400)
  })
}

const deleteSameCards = () => {
  flippedCards.forEach((f) => {
    const cardChild = f.card.querySelector('.card')
    cardChild.innerHTML= ''
    const clonedCard = f.card.cloneNode(true)
    f.card.parentNode.replaceChild(clonedCard, f.card)
  })
}

const isGameFinished = () => {
  
  if (matchedCouples !== characters.length) return
  modal.showModal()
}

const modal = document.querySelector('.game-over-modal')
modal.addEventListener('cancel', (event) => {
  event.preventDefault();
});
