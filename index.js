const characters = ['ace.jpg', 'chopper.jpeg', 'eustass.webp', 'kawamatsu.jpg', 'oden.webp', 'luffy.jpg']

const grid = document.getElementById('cards-grid')

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

const cardsToRender = []

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
    const card = c.querySelectorAll('.card-inner')[0]
    flipCard(card)
  })
})

let flippedCards = []
const flipCard = (card) => {
  if (flippedCards.length >= 2) return
  card.classList.add('card-active')
  const imageName = card.getElementsByClassName('card-image')[0].attributes.src.value
  flippedCards.push({ card: card, imageName: imageName })
  const areCardsSame = compareFlippedCards(flippedCards)
  if (flippedCards.length === 2)
    setTimeout(() => {
      if (!areCardsSame) returnCardsToOriginalState()
      else deleteSameCards(imageName)
    }, 1000)
}

const compareFlippedCards = (cards) => {
  return [...new Set(cards.map((c) => c.imageName))].length === 1 && cards.length === 2
}

const returnCardsToOriginalState = () => {
  flippedCards.forEach((f) => {
    f.card.classList.remove('card-active')
    f.card.isCardFlipped = false
  })
  flippedCards.length = 0
}

const deleteSameCards = (imageName) => {
  flippedCards.forEach((f) => {
    const innerCards = f.card.querySelectorAll('.card-back')
    innerCards.forEach((c) => {
      const imageTags = c.getElementsByTagName('img')
      const imageTag = imageTags.length ? imageTags[0] : null
      if (imageTag?.attributes?.src?.value === imageName) imageTag.remove()
    })
  })
  flippedCards.length = 0
}
