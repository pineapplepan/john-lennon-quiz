let score = 0;

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let scoreTag = document.getElementById("score");
scoreTag.innerHTML = "Score: 0";

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  checkCorrectAnswer(correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    if (score >= 5) {
      startButton.innerText = "YOU WON!";
      startButton.classList.remove("hide");
      score = 0;
      scoreTag.innerHTML = "Score: " + score;
    } else {
      startButton.innerText = "YOU LOST.";
      startButton.classList.remove("hide");
      score = 0;
      scoreTag.innerHTML = "Score: " + score;
    }
  }
}

function checkCorrectAnswer(correct) {
  if (correct) {
    scoreTag.innerHTML = "Score: " + (score += 1);
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "The evolutionary surge 540 million years ago is called:",
    answers: [
      { text: "Oxforian bomb", correct: false },
      { text: "Harvarian attack", correct: false },
      { text: "Cambrian explosion", correct: true },
      { text: "Stanforian bang", correct: false },
    ],
  },
  {
    question: "What are Fedora, Red Hat and Ubuntu?",
    answers: [
      { text: "Judo ranks", correct: false },
      { text: "Delivery service provider", correct: false },
      { text: "Linux distributions", correct: true },
      { text: "Techno Clubs in Cape Town", correct: false },
    ],
  },
  {
    question: "What is the most common Pope name?",
    answers: [
      { text: "Benedikt", correct: false },
      { text: "Gregor", correct: false },
      { text: "Pius", correct: false },
      { text: "Johannes", correct: true },
    ],
  },
  {
    question: "The first song that was aired on MTV is:",
    answers: [
      { text: "American anthem", correct: false },
      { text: "Video killed the radio star", correct: true },
      { text: "Bohemian Rhapsody", correct: false },
      { text: "In the air tonight", correct: false },
    ],
  },
  {
    question:
      "Which of these songs was not used for torture in Guantanamo Prison?",
    answers: [
      { text: 'Don McLean - "American Pie"', correct: false },
      { text: 'Britney Spears - "...Baby one more time"', correct: false },
      { text: 'Metallica - "Enter Sandman"', correct: false },
      { text: 'Modern Talking - "You`re my heart"', correct: true },
    ],
  },
  {
    question: "What opera actually exists?",
    answers: [
      { text: "Newton on Mars", correct: false },
      { text: "Darwin at Woodstock", correct: false },
      { text: "Einstein on the beach", correct: true },
      { text: "Tarantino at Tiffany`s", correct: false },
    ],
  },
  {
    question: "The world's most expensive book auctioned ($ 30 million) is:",
    answers: [
      { text: "A script by Leonardo da Vinci", correct: true },
      { text: "Martin Luther`s 95 theses", correct: false },
      { text: "Text notes by Kurt Cobain", correct: false },
      { text: "The Gutenberg Bible", correct: false },
    ],
  },
  {
    question:
      "To increase effectiveness, Amazon boss Jeff Bezos has imposed a ban on the entire company on:",
    answers: [
      { text: "Overtime", correct: false },
      { text: "Small talks in the elevator", correct: false },
      { text: "PowerPoint presentations", correct: true },
      { text: "Toilet paper", correct: false },
    ],
  },
  {
    question:
      "What do Leonardo DiCaprio, Arnold Schwarzenegger, Angelina Jolie and Tobey Maguire have in common?",
    answers: [
      { text: "They had a speech impediment in childhood", correct: false },
      {
        text: "They have reservations for their funeral on the moon",
        correct: false,
      },
      { text: "Insects were named after them", correct: true },
      { text: "They have all converted to Judaism", correct: false },
    ],
  },
  {
    question:
      "What is special about the Spanish national anthem?",
    answers: [
      { text: "Complete lyrics consists of 218 stanzas", correct: false },
      {
        text: "The lyrics was written by a 14-year-old",
        correct: false,
      },
      { text: "The lyrics were written by a French", correct: false },
      { text: "The hymn has no lyrics", correct: true },
    ],
  },
];
