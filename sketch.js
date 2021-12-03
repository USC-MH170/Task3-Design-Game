const startButton1 = document.getElementById('start1')
const startButton2 = document.getElementById('start2')
const restartBtn = document.getElementById('restartBtn')
const homeScreen = document.getElementById('homeScreen')
const gameContainer = document.getElementById('gameContainer')
const questionElement = document.getElementById('question') //may need to make this img
const answerContrainer = document.getElementById('answerContrainer')
const questionImage = document.getElementById('qImg') 
const nextButton = document.getElementById('next') 
const aboutSection = document.getElementById('about')
const aboutBtn = document.getElementById('about-btn')
const homeBtn = document.getElementById('home-btn')
const scoreCounter = document.getElementById('scoreCounter')
const gameContent = document.getElementById('game')
const gameResults = document.getElementById('results')
const scoreResult = document.getElementById('scoreResult')
const endGameMessage = document.getElementById('endGameMessage')





let score = 0


let shuffledQuestions, currentQuestion


startButton1.addEventListener('click', startGame)
startButton2.addEventListener('click', startGame)
restartBtn.addEventListener('click', restartGame)
aboutBtn.addEventListener('click', displayAbout)
homeBtn.addEventListener('click', displayHome)
nextButton.addEventListener('click', () => {
  currentQuestion++
  console.log(currentQuestion)
  if (currentQuestion == 3) {
    endGame()
  }
  else {setNextQuestion()}
})


function restartGame() {
  currentQuestion = 0
  score = 0
  shuffledQuestions = 0
  scoreCounter.innerHTML = 0
  startGame()
}


function endGame() {
  gameContainer.classList.add("hide")
  gameResults.classList.remove("hide")
  scoreResult.innerHTML = score
  if (score >= 3) {
    endGameMessage.innerHTML = 'Congratulation'
  } else { 
    endGameMessage.innerHTML = 'Game Over'
  }
  
}

function startGame() {
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestion = 0
  homeScreen.classList.add("hide")
  aboutSection.classList.add("hide")
  gameContainer.classList.remove("hide")
  setNextQuestion()
}

function displayAbout() {
  homeScreen.classList.add("hide")
  aboutSection.classList.remove("hide")
  gameContainer.classList.add("hide")
}

function displayHome() {
  homeScreen.classList.remove("hide")
  aboutSection.classList.add("hide")
  gameContainer.classList.add("hide")
}




function setNextQuestion() {
  resetState()
  showQuesation(shuffledQuestions[currentQuestion])
}

function resetState() {
  //nextButton.classList.add('hide')
  while (answerContrainer.firstChild) {
    answerContrainer.removeChild(answerContrainer.firstChild)
  }
}




function showQuesation(question) {
  questionImage.src = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn', 'choice')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    } 
    button.addEventListener('click', selectAnswer)
    answerContrainer.appendChild(button)
  })

}



function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(selectedButton, correct)
  // Array.from(answerContrainer.children).forEach(button => {
  //   setStatusClass(button, button.dataset.correct)
  // })
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
    score++ //this needs to update in the GUI too
    scoreCounter.innerHTML = score
    console.log(score)
  } else {
    element.classList.add('wrong')
    console.log(score)
    endGame()//need to create method which ends the game and displays final score
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}





const questions = [
{
    question: 'deepSpace.svg',
    answers: [
      {text: 'Focal Point (Colour)', correct: false},
      {text: 'Asymmetrical Balance', correct: false},
      {text: 'Deep Space', correct: true}
    ]
  }, 
  {
    question: 'radialBalance.svg',
    answers: [
      {text: 'Flowing Rhythum', correct: false},
      {text: 'Monochromatic Colors', correct: false},
      {text: 'Radial Balance', correct: true}
    ]
  },
  {
    question: 'colourContrast.svg',
    answers: [
      {text: 'Contrasting Colours', correct: true},
      {text: 'Analogous Colors', correct: false},
      {text: 'Monochromatic Colors', correct: false}
    ]
  }
]

