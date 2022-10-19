const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame(){
    state = {}
    renderScene("Start")
}

function renderScene(Scene_id){
    const Scene = Scenes.find(Scene => Scene.id === Scene_id)
    document.body.style.backgroundImage = Scene.tlo
    textElement.innerText = Scene.text /*ustala tekst okienka*/
    while (optionButtonsElement.firstChild){ /*usuwa guziki*/
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    Scene.options.forEach(option => { /*Tworzy guziki*/
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requierdState == null || option.requierdState(state)
}

function selectOption(option){
    const next_Scene_id = option.nextText
    if(next_Scene_id <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    renderScene(next_Scene_id)
}

const Scenes = [
    {
        id: "Start",
        text: 'Budzisz się i widzisz Chwałowskiego. Pyta ile jest "2+2"?',
        tlo: 'url("img/Sala.png")',
        options: [
            {
                text: '3',
                nextText: "Zle"
            },
            {
                text: '4',
                nextText: "Dobrze"
            },
            {
                text: '5',
                nextText: "Zle"
            },
            {
                text: '17',
                nextText: "Zle"
            }
        ]
    },
    {
        id: "Dobrze",
        text: "Brawo, zmieniłeś mnie w aniołka!",
        options: [
            {
                text: "Jak pokonać złego Rzepkę?",
                nextText: "Klucz"
            },
            {
                text: "Powiedz żart",
                nextText: "Zart"
            },
            {
                text: "To super, do jutra!",
                nextText: "Koniec"
            }
        ]
    },
    {
        id: "Zle",
        tlo: 'url("img/Sala 2.png")',
        text: "Umierasz",
        options: [
            {
                text: "Reset",
                nextText: 0
            }
        ]
    },
    {
        id: "Klucz",
        text: "Rzepka nienawidzi marchewek",
        options: [
            {
                text: "Reset",
                nextText: 0
            }
        ]
    },
    {
        id: "Zart",
        text: "Linde nie jest najlepszą szkołą na świecie.",
        options: [
            {
                text: "Reset",
                nextText: 0
            }
        ]
    },
    {
        tlo: 'url("img/Szkola.png")',
        id: "Koniec",
        text: "Do widzenia!",
        options: [
            {
                text: "Reset",
                nextText: 0
            }
        ]
    }
]

startGame()