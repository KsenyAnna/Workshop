const orderedCards = [
  { img: './assets/cards/1.png', name: 'Лев' },
  { img: './assets/cards/2.png', name: 'Тигр' },
  { img: './assets/cards/3.png', name: 'Леопард' },
  { img: './assets/cards/4.png', name: 'Буйвол' },
  { img: './assets/cards/5.png', name: 'Корова'},
  { img: './assets/cards/6.png', name: 'Лама'},
  { img: './assets/cards/7.png', name: 'Слон'},
  { img: './assets/cards/8.png', name: 'Фламинго'},
  // { img: './assets/cards/9.png', name: 'Жираф'},
  // { img: './assets/cards/10.png', name: 'Козёл'},
  // { img: './assets/cards/11.png', name: 'Ёжик'},
  // { img: './assets/cards/12.png', name: 'Бегемот'},
  // { img: './assets/cards/13.png', name: 'Конь'},
  // { img: './assets/cards/14.png', name: 'Панда'},
  // { img: './assets/cards/15.png', name: 'Зебра'},
  // { img: './assets/cards/16.png', name: 'Пёс'},
  // { img: './assets/cards/17.png', name: 'Носорог'},
  // { img: './assets/cards/18.png', name: 'Овца'},
]

const gameState = {
  isGameLoading: false,
  currentCard: null,
  openedCardsCount: 0,
}
function startGame(cards) {
  const root = document.getElementById("memory_game");
  const winBlock = document.querySelector(".win_block")
  winBlock.style.display = "none"

  const cardContainer = document.createElement('section');
  cardContainer.id = "card_container";
  createCards(cards, cardContainer);

  root.append(cardContainer);
}

function createCards(cards, container) {
  for (item of cards) {
    const card = document.createElement('div')
    card.name = item.name
    card.isOpen = false
    card.isLoading = false
    card.className = 'card closed_card'
    card.style.backgroundImage = `url("${item.img}")`
    card.onclick = (e) => {
      if (e.target.isLoading) return null

      // if (e.target.isOpen) closeCard(e.target)
      // else openCard(card)

      if (!e.target.isOpen) clickLogic(e.target)
    }
    container.append(card)
  }
}

function openCard(card) {
  if (card.isLoading) return null
  card.isLoading = true
  card.isOpen = true
  card.classList.remove('closed_card')
  // setTimeout выполнит действия внутри него через 200мс = 0.2с
  setTimeout(() => {
    card.classList.add('opened_card')
    card.isLoading = false
  }, 200)
}
function closeCard(card) {
  if (card.isLoading) return null
  card.isLoading = true
  card.isOpen = false
  card.classList.remove('opened_card')
  // setTimeout выполнит действия внутри него через 200мс = 0.2с
  setTimeout(() => {
    card.classList.add('closed_card')
    card.isLoading = false
  }, 200)
}

function clickLogic(card) {
  if (gameState.isGameLoading) return null

  gameState.isGameLoading = true
  openCard(card)

  if (!gameState.currentCard) {
    gameState.currentCard = card
    gameState.isGameLoading = false
  }
  else {

    if (card.name === gameState.currentCard.name) {
      gameState.currentCard = null
      gameState.isGameLoading = false
      gameState.openedCardsCount += 2
      if (gameState.openedCardsCount === orderedCards.length * 2)showWinBlock()
    }
    else {
      setTimeout(() => {
        closeCard(card)
        closeCard(gameState.currentCard)
        gameState.currentCard = null
        gameState.isGameLoading = false
      }, 1000)

    }

  }
}

function showWinBlock() {
  const winBlock = document.querySelector(".win_block")
  winBlock.style.display = "flex"
}

startGame(shuffle([...orderedCards, ...orderedCards]))










function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
