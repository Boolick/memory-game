import { startGame } from "./start_game";

export const createGameMenu = () => {
    const gameSection = document.querySelector(
        ".game-section-container"
    ) as HTMLElement;
    gameSection.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = "Выбери сложность";
    title.classList.add("game-menu-title");
    const dificultRadioButtons = document.createElement("div");
    dificultRadioButtons.classList.add("level-box");

    const data = {
        1: false,
        2: false,
        3: false
    };
    //создаем радиокнопки сложности
    for (let i in data) {
        let label = document.createElement("label");
        label.classList.add("label");
        label.innerText = i;
        let input = document.createElement("input");
        input.classList.add("input");
        input.type = "radio";
        input.name = "difficult";
        label.appendChild(input);
        dificultRadioButtons.appendChild(label);
    }
    const button = document.createElement("button");
    button.classList.add("game-menu-start-btn");
    button.textContent = `start`;
    dificultRadioButtons.appendChild(title);
    dificultRadioButtons.appendChild(button);
    gameSection.append(dificultRadioButtons);

    // запускаем игровое поле
    button.addEventListener("click", function (e) {
        const checked: NodeListOf<HTMLInputElement> =
            document.querySelectorAll(".input");
        
        if (checked[0].checked) {
            startGame(6);
        }
        if (checked[1].checked) {
            startGame(9);
        }
        if (checked[2].checked) {
            startGame(12);
        } else {
            e.preventDefault();
        }
    });
};
