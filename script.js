const cards = [
  "🍎", "🍎",
  "🍌", "🍌",
  "🍇", "🍇",
  "🍊", "🍊",
  "🍉", "🍉",
  "🍓", "🍓",
  "🥝", "🥝",
  "🍍", "🍍"
];

const gameBoard = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const restartButton = document.getElementById("restart");

let flippedCards = [];
let matchedCards = [];
let moves = 0;
let time = 0;
let timer;
let gameStarted = false;

// カードをシャッフルする
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// ゲームを開始する
function startGame() {
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = [];
  moves = 0;
  time = 0;
  gameStarted = false;

  clearInterval(timer);

  movesDisplay.textContent = moves;
  timerDisplay.textContent = time;

  const shuffledCards = shuffle([...cards]);

  shuffledCards.forEach((symbol, index) => {
    const card = document.createElement("div");

    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.dataset.index = index;

    card.addEventListener("click", flipCard);

    gameBoard.appendChild(card);
  });
}

// カードをめくる
function flipCard() {
  if (
    flippedCards.length >= 2 ||
    this.classList.contains("flipped") ||
    this.classList.contains("matched")
  ) {
    return;
  }

  if (!gameStarted) {
    gameStarted = true;

    timer = setInterval(() => {
      time++;
      timerDisplay.textContent = time;
    }, 1000);
  }

  this.classList.add("flipped");
  this.textContent = this.dataset.symbol;

  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;

    checkMatch();
  }
}

// 2枚が同じか確認する
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add("matched");
    card2.classList.add("matched");

    matchedCards.push(card1, card2);
    flippedCards = [];

    if (matchedCards.length === cards.length) {
      clearInterval(timer);

      setTimeout(() => {
        alert(
          `🎉 クリア！\n\n手数: ${moves}回\n時間: ${time}秒`
        );
      }, 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");

      card1.textContent = "";
      card2.textContent = "";

      flippedCards = [];
    }, 1000);
  }
}

// リスタート
restartButton.addEventListener("click", startGame);

// ゲーム開始
startGame();
