const orderedCards = [
  { img: './assets/cards/1.png', name: 'Лев' },
  { img: './assets/cards/2.png', name: 'Тигр' },
  { img: './assets/cards/3.png', name: 'Леопард' },
  { img: './assets/cards/4.png', name: 'Буйвол' },
  { img: './assets/cards/5.png', name: 'Корова' },
  { img: './assets/cards/6.png', name: 'Лама' },
  { img: './assets/cards/7.png', name: 'Слон' },
  { img: './assets/cards/8.png', name: 'Фламинго' },
  { img: './assets/cards/9.png', name: 'Жираф' },
  { img: './assets/cards/10.png', name: 'Козёл' },
  { img: './assets/cards/11.png', name: 'Ёжик' },
  { img: './assets/cards/12.png', name: 'Бегемот' },
  { img: './assets/cards/13.png', name: 'Конь' },
  { img: './assets/cards/14.png', name: 'Панда' },
  { img: './assets/cards/15.png', name: 'Зебра' },
  { img: './assets/cards/16.png', name: 'Пёс' },
  { img: './assets/cards/17.png', name: 'Носорог' },
  { img: './assets/cards/18.png', name: 'Овца' },
];

const gameState = {
  currentCard: null,
  isGameLoading: false,
  openedCardsCount: 0,
};

function startGame(cards) {
  const root = document.getElementById('card_container'); //
  const winBlock = document.querySelector('.win_block');
  winBlock.style.display = 'none';
  // создать карточки на основе orderedCards положить карточки в root
  createCards(cards, root);
}

function createCards(cards, rootEl) {
  for (item of cards) {
    const newCard = document.createElement('div'); //
    // newCard.style.backgroundImage = `url('${item.img}')`
    newCard.style.backgroundImage = 'url("' + item.img + '")';
    newCard.className = 'card closed_card';
    newCard.name = item.name;
    newCard.isOpen = false;
    newCard.isLoading = false;
    newCard.onclick = (event) => {
      if (event.target.isLoading) return null;
      if (!event.target.isOpen) gameLogic(event.target);
      // event.target.isLoading = true
      // if (event.target.isOpen) {
      //   closeCard(event.target)
      // } else {
      //   openCard(event.target)
      // }
    };
    rootEl.append(newCard);
  }
}
function openCard(card) {
  card.isLoading = true;
  card.classList.remove('closed_card');
  // выполнит переданную функцию через 200мс = 0.2с
  setTimeout(() => {
    card.classList.add('opened_card');
    card.isOpen = true;
    card.isLoading = false;
  }, 200);
}
function closeCard(card) {
  card.isLoading = true;
  card.classList.remove('opened_card');
  setTimeout(() => {
    card.classList.add('closed_card');
    card.isOpen = false;
    card.isLoading = false;
  }, 200);
}

function gameLogic(card) {
  if (gameState.isGameLoading) return null;
  gameState.isGameLoading = true;

  if (!gameState.currentCard) {
    openCard(card);
    gameState.currentCard = card;
    gameState.isGameLoading = false;
  } else {
    openCard(card);

    if (card.name === gameState.currentCard.name) {
      gameState.openedCardsCount += 2;
      if (gameState.openedCardsCount === orderedCards.length * 2) {
        showWinBlock();
      }
      gameState.currentCard = null;
      gameState.isGameLoading = false;
    } else {
      setTimeout(() => {
        gameState.currentCard;
        closeCard(gameState.currentCard);
        closeCard(card);
        gameState.currentCard = null;
        gameState.isGameLoading = false;
      }, 1000);
    }
  }
}

function showWinBlock() {
  const winBlock = document.querySelector('.win_block');
  winBlock.style.display = 'flex';
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

startGame(shuffle([...orderedCards, ...orderedCards]));
