import { createCard, createFlippedCard } from "./card.js";
import { createGameMenu } from "./game_menu.js";
import { createIconsArray, doubleArray, shuffleArray } from "./utils.js";

export const startGame = (difficult) => {
    let firstCard = false;
    let secondCard = false;
    let lockBoard = false;
    // eslint-disable-next-line no-unused-vars
    let interval;

    /*   document.createElement("div");
    this.classList.add("result");
    const result = document.querySelector(".result"); */

    const gameSection = document.querySelector(".game-section-container");
    const gameTable = document.createElement("div");

    const timer = document.createElement("span");
    timer.classList.add("timer");

    const cardsIcons = createIconsArray(difficult);
    const restartBtn = document.createElement("button");

    const doubleCardsIcons = doubleArray(cardsIcons);

    gameSection.innerHTML = "";
    restartBtn.textContent = "Restart";
    gameTable.classList.add("game-table");
    restartBtn.classList.add("restart-btn");

    shuffleArray(doubleCardsIcons);

    //инициация таймера
    let seconds = 0,
        minutes = 0;
    //инициация счетчика движений
    //let movesCount = 0;

    //для таймера
    const timeGenerator = () => {
        seconds += 1;
        //минуты
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }
        //формат времени перед показом
        let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
        let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
        timer.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
    };

    function resetBoard() {
        let [tempFirst, tempSecond] = [firstCard, secondCard];
        [firstCard, secondCard] = [false, false];
        setTimeout(() => {
            tempFirst.classList.remove("flip");
            tempSecond.classList.remove("flip");
        }, 900);
    }

    // Показываем перевернутые карты на 5сек
    doubleCardsIcons.forEach((icon) =>
        gameTable.append(createFlippedCard(icon))
    );
    gameSection.append(gameTable);
    console.log(doubleCardsIcons);

    // Очищаем поле и заполняем картами, рубашками вверх
    setTimeout(() => {
        gameTable.innerHTML = "";

        doubleCardsIcons.forEach((icon) =>
            gameTable.append(createCard("./images,icons/Mask group.jpg", icon))
        );

        //Запускаем таймер
        seconds = 0;
        minutes = 0;
        interval = setInterval(timeGenerator, 1000);
        //запускаем движения
        /* timer.innerHTML = `<span>Moves:</span> ${movesCount}`; */

        gameSection.append(restartBtn, timer, gameTable);

        restartBtn.addEventListener("click", createGameMenu);

        const cards = document.querySelectorAll(".game-card");
        console.log(cards);

        let firstCardValue;
        // Создаем переворачивание карт
        cards.forEach((card) => {
            card.addEventListener("click", () => {
                //Защита от двойного клика
                if (lockBoard) return;
                if (card === firstCard) return;
                // проверка карт на совпадение
                if (!card.classList.contains("matched")) {
                    card.classList.add("flip");

                    if (!firstCard) {
                        firstCard = card;
                        firstCardValue = card.getAttribute("value");

                        console.log(firstCardValue);
                    } else {
                        secondCard = card;
                        let secondCardValue = card.getAttribute("value");

                        console.log(secondCardValue);
                        console.log(firstCardValue);
                        if (firstCardValue === secondCardValue) {
                            firstCard.classList.add("matched");
                            secondCard.classList.add("matched");
                            firstCard = false;
                        } else {
                            // Больше двух карт не развернешь, тут должно быть сообщение о проигрыше
                            resetBoard();
                            setTimeout(() => {
                                alert("Вы проиграли");
                            }, 350);
                        }
                    }
                }
            });
        });
    }, 5000);
};
