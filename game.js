const textElement = document.getElementById("text")
const optionButtonsElement = document.getElementById("option-buttons")

let state = {}

let startLink = document.getElementById("start-link")

function startMenu(){
    document.querySelector('.container').style.display = 'none';
    document.getElementById("start").style.display = 'block';
    document.querySelector('#start-link').style.display= 'block';
}

startLink.onclick = function() {
    document.querySelector('.container').style.display = 'block';
    document.querySelector('#start-link').style.display= 'none';
    document.getElementById("start").style.display = 'none';
    playGame()
}

function playGame() {
    document.querySelector('.container').style.display = 'block';
    state = {}
    showTextNode(1)
    /* let image = document.createElement('img')
    image.src = "assets/apocalyptic_department_store.webp"
    image.className = "image"
    document.getElementById("setting").appendChild(image); */
}

// cant figure out how to change images w/ each new 'slide'
let image = document.createElement('img')
image.className = "image"

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
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

    function newImage(textNode) {
      if(textNode === 1){
        document.getElementsByClassName("image").innerHTML = textNode.img
      }
    }

    newImage(textNode)

    /* if (textNodes.id === 1){
      image.innerHTML = textNode.img
      document.getElementsByClassName("image").appendChild(image);
    } else if (textNodes.id === 2){
      image.innerHTML = textNode.img
      document.getElementsByClassName("image").appendChild(image);
    } */

    /* function newImage(textNodeIndex)
    {
      image.innerText = textNodeIndex.img
      document.getElementById("setting").appendChild(image);
    }
    newImage(textNodeIndex) */
}

function showOption(option){
    return option.requiredState == null || option.nextText
}

function selectOption(option){
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0){
        return startMenu()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
      id: 1,
      text: "A deadly virus has leaked from the city's underground lab and breached the surface. 'Conveniently', you're trapped at the Auto Zone you work at, downtown, with no car. Chaos is wreaking havoc on the outside, crazies biting people, explosions erupting sporadically and crashes left & right. You go to lock the doors when a man starts banging on the glass begging you to let him in. What do you do?",
      img: "<img src='assets/apocalyptic_department_store.webp'>",
      options: [
        {
          text: 'Let him in',
          setState: { letIn: true },
          nextText: 2
        },
        {
          text: 'Lock him out',
          nextText: 11
        }
      ]
    },
    {
      id: 2,
      text: "To his relief, you let him in & immediately lock the doors just seconds before a crazy slams against the door with nothing but blind hunger in its glazed eyes. You each back away from the door to avoid drawing any further attention and hide. 'Thank you so much, I'm David. Idk what's going on out there but I need to get TF away from this bullshit, but my car just died and won't start. Can you help?' ",
      img: "<img src='assets/hiding_in_shadows.jpeg'>",
      options: [
        {
          text: 'Get a new car battery',
          requiredState: (currentState) => currentState.letIn,
          setState: { letIn: false, battery: true },
          nextText: 3
        },
        {
          text: 'Get ultrasafe jump starter + cables',
          requiredState: (currentState) => currentState.letIn,
          setState: { letIn: false, jumpStart: true },
          nextText: 3
        },
        {
          text: 'Decline help',
          nextText: 12
        }
      ]
    },
    {
      id: 3,
      text: 'You & David both determine youll need to make it to his car in order to quickly fix it up, but first you need to clear the path and the crazies in it. What weapon do you use?',
      options: [
        {
          text: 'A gun from the hidden safe',
          nextText: 4
        },
        {
          text: 'A wrench',
          nextText: 5
        },
        {
          text: 'A mallet',
          nextText: 6
        }
      ]
    },
    {
      id: 4,
      text: 'Uh-oh, the crazy came storming towards David who fired his gun on it, but the noise drew 15 more killing you both.',
      options: [
        {
          text: 'Game Over: Restart',
          nextText: -1
        }
      ]
    },
    {
      id: 5,
      text: 'Oh no, a crazy came storming towards David who swung on him with the wrench but it barely did any damage and David was taken down, with you shorly after.',
      options: [
        {
          text: 'Restart',
          nextText: -1
        }
      ]
    },
    {
      id: 6,
      text: 'The crazy stormed for David while you took off with your equipment, but David managed to take him down with the mallet you gave him.',
      options: [
        {
          text: 'Fix car',
          nextText: 7
        }
      ]
    },
    {
      id: 7,
      text: 'You make it to Davids car when another couple of crazies come from the other side of the building. David is tough but hes only one man so you need to work quick. What do you do?',
      options: [
        {
          text: 'Run away',
          nextText: 8
        },
        {
          text: 'Replace the battery',
          requiredState: (currentState) => currentState.battery,
          nextText: 9
        },
        {
          text: 'Jump start the car',
          requiredState: (currentState) => currentState.jumpStart,
          nextText: 10
        },
      ]
    },
    {
      id: 8,
      text: 'You leave your so-called buddy David hanging for him to get eaten by the crazies and go hide in a dumpster. You wait it out like a coward until the city is nuked and you along with it.',
      options: [
        {
          text: 'Game Over: Restart',
          nextText: -1
        }
      ]
    },
    {
      id: 9,
      text: 'You quickly replace the battery just to try turning on the car and find that one is dead too. (Your stupid co-worker Carl just had to be sneaky once again and trade his out for a new one for free.99.) Both you and David are torn to shreds.',
      options: [
        {
          text: 'Game Over: Restart',
          nextText: -1
        }
      ]
    },
    {
      id: 10,
      text: 'You quickly jump start the car finally turning it on. David takes out the few crazies he could before jumping into the passenger seat. You take off to the mountains and never look back, finally escaping the city and the bomb that takes it out.',
      options: [
        {
          text: 'Congratulations! Play Again.',
          nextText: -1
        }
      ]
    },
    {
      id: 11,
      text: 'Good job: you lock out your only chance at support; the man gets jumped by a bunch of other crazies who then notice you, break the store windows and attack you. Live a loner, die a loner.',
      options: [
        {
          text: 'Game Over: Restart',
          nextText: -1
        }
      ]
    },
    {
      id: 12,
      text: 'Good job: you bail on your only chance at support. David grabs random car supplies, and jets out the backdoor leaving the crazies to come in and eat you alive. Live a loner, die a loner.',
      options: [
        {
          text: 'Game Over: Restart',
          nextText: -1
        }
      ]
    }
  ]

const audio = new Audio();
audio.src = "assets/Gun Cocking Sound Effect.mp3" ;
  
startMenu()