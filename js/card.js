//создаем карты для демонстрации в начале игры
export const createFlippedCard = (flipCardIcon) => {
    const card = document.createElement("img");
    card.setAttribute("src", `${flipCardIcon}`);
    card.classList.add("game-card", "flip");

    const flippedCardI = document.createElement("i");
    flippedCardI.classList.add("img", `img-${flipCardIcon}`);
    card.append(flippedCardI);

    return card;
};
//создаем карты для игры
export const createCard = (defaultIcon, flipCardIcon) => {
    const card = document.createElement("div");
    card.classList.add("game-card");
    card.setAttribute("value", `${flipCardIcon}`.slice(-6, -4));

    const flippedCardI = document.createElement("img");
    const notFlippedCardI = document.createElement("img");

    flippedCardI.classList.add("img");
    notFlippedCardI.classList.add("img", "icon");
    flippedCardI.setAttribute("src", `${flipCardIcon}`);
    notFlippedCardI.setAttribute("src", `${defaultIcon}`);

    card.append(flippedCardI, notFlippedCardI);

    return card;
};
