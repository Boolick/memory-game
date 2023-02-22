export const doubleArray = (array) =>
    array.reduce((res, current) => res.concat([current, current]), []);

export const shuffleArray = (array) => {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
        ];
    }

    return array;
};

export const createLostScreen = () => {
    const container = document.querySelector(".container");

    const sad = document.createElement("img");
    sad.classList.add("sadImg");
    sad.setAttribute("src", "./static/sadImage.png");

    const title = document.createElement("h2");
    title.textContent = "Вы проиграли";
    title.classList.add("game-lose-title");

    const restartBtn = document.querySelector(".restart-btn");
    const loseScreen = document.createElement("div");
    loseScreen.classList.add("lose-screen");
    const subtitle = document.createElement("h3");
    subtitle.textContent = "Затраченное время:";
    subtitle.classList.add("game-resulsts");
    const time = document.querySelector(".timer");

    loseScreen.append(sad, title, subtitle, time, restartBtn);

    container.append(loseScreen);
};
export const createWinScreen = () => {
    const container = document.querySelector(".container");

    const sad = document.createElement("img");
    sad.classList.add("winImg");
    sad.setAttribute("src", "./static/winImage.png");

    const title = document.createElement("h2");
    title.textContent = "Вы выиграли";
    title.classList.add("game-lose-title");

    const restartBtn = document.querySelector(".restart-btn");
    const loseScreen = document.createElement("div");
    loseScreen.classList.add("lose-screen");
    const subtitle = document.createElement("h3");
    subtitle.textContent = "Затраченное время:";
    subtitle.classList.add("game-resulsts");
    const time = document.querySelector(".timer");

    loseScreen.append(sad, title, subtitle, time, restartBtn);

    container.append(loseScreen);
};

//Получаем массив вдресов для отрисовки игральных карт
const cardsIcons = [];
const HOST = `https://deckofcardsapi.com/api/deck/new/shuffle/?`;
// eslint-disable-next-line no-undef
request({
    url: `${HOST}`,
    params: {
        deckCount: 1
    },

    onSuccess: function e(response) {
        //получаем id колоды карт

        const deckId = response.deck_id;

        let deck = `https://deckofcardsapi.com/api/deck/${deckId}`;

        // eslint-disable-next-line no-undef
        request({
            // получаем карты из колоды для отрисовки
            url: `${deck}/draw/?count=52`,
            params: {},

            onSuccess: (response) => {
                const getCodes = (code) =>
                    response.cards.map((card) => card[code]);

                getCodes("image").forEach((i) => {
                    cardsIcons.push(i);
                });
            }
        });
    }
});

//выбираем массив карт, количество карт в котором зависит от выбранного уровня сложности
export const createIconsArray = (initialCount) => {
    //debugger

    switch (initialCount) {
        case 6:
            return cardsIcons.slice(0, 3);
        case 9:
            return cardsIcons.slice(0, 6);
        case 12:
            return cardsIcons.slice(0, 9);
        default:
            break;
    }
};
