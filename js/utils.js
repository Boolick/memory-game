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
