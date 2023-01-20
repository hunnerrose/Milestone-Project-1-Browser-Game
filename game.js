const textElement = document.getElementById("text")
const optionButtonsElement = document.getElementById("option-buttons")

let state = {}

function startGame(){
    state = {}
    showTextNode(1)
}


function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionsButtonElement.firstChild)
    }

    textNode.options.forEach(option => {
        if(showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return true
}

function selectOption(option){

}

const textNodes = [
    {
        id: 1,
        text: "You're working one boring Tuesday morning at 7-Eleven, ringing up items, trying to make it through the rest of your shift whilst being violently hungover. You then work your way to the cooler in the back of the store to 'restock cold drinks' & catch a break from the bright lights & irritating social interactions leaving his coworker Stefon to checkout customers & fend for himself. You overhear a customer walk in stumbling, inaudible. Stefon asks them 'Are you okay' to which the customer growls & lunges for Stefon & bites his arm. What do you do?",
        options: [
            {
                text: "Help Stefon",
                setState: {helpStefon: true},
                nextText: 2
            },
            {
                text: "Stay hidden"
                nextText: 2,
            }
        ]
    },
    {
        id: 2,
        text:
    }
]

startGame()