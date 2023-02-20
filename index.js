const characters = ['ace.jpg', 'chopper.jpeg', 'eustass.webp', 'kawamatsu.jpg', 'oden.webp', 'luffy.jpg']
const grid = document.getElementById('cards-grid')
const cardsToRender = []
const flippedCards = []

const addCard = (imageFile) => {
  const card = `<div class="card">
        <div class="card-inner">
          <div class="card-front">
            <image class="back-card-image" src="assets/backcardimage.png"></image>
          </div>
          <div class="card-back">
            <image class="card-image" src="assets/${imageFile}"></image>
          </div>
        </div>
      </div>`
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

const cardsRendered = document.querySelectorAll('.card')

cardsRendered.forEach((c) => {
  c.addEventListener('click', () => {
    const card = c.querySelector('.card-inner')
    flipCard(card)
  })
})

const flipCard = (card) => {
  if (flippedCards.length === 2) return

  card.classList.add('card-active')

  const imageName = card.querySelector('.card-back>.card-image').attributes.src.value

  flippedCards.push({ card: card, imageName: imageName })

  if (flippedCards.length === 2){
    const areCardsSame = compareFlippedCards(flippedCards)
    
    setTimeout(() => {
      if (!areCardsSame) returnCardsToOriginalState()
      else deleteSameCards()
      flippedCards.length = 0
    }, 1000)
  }
}

const compareFlippedCards = (cards) => {
  return [...new Set(cards.map((c) => c.imageName))].length === 1
}

const returnCardsToOriginalState = () => {
  flippedCards.forEach((f) => f.card.classList.remove('card-active'))
  
}

const deleteSameCards = () => {
  flippedCards.forEach((f) => {
    const image = f.card.querySelector('.card-back>.card-image')
    image.remove()
  })
}
