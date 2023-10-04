"use strict";

let questions = [];

const addQuestion = function (quest, opts, ans) {
  const questionSet = {
    question: quest,
    options: opts,
    answerIndex: ans,
  };
  questions.push(questionSet);
};

addQuestion(
  "Who has the highest average in Test Cricket?",
  ["Brain Lara", "Sachin Tendulkar", "Don BradMan", "Virat Kohli"],
  3
);

addQuestion(
  "Who scored highest number of runs in a ODI Match?",
  ["Virat Kohli", "AB Devilliers", "MS Dhoni", "Rohit Sharma"],
  4
);

addQuestion(
  "Which team won the WorldCup in the year 2003?",
  ["Pakisthan", "SriLanka", "Australia", "India"],
  3
);

addQuestion(
  "How many centuries did Sachin Tendulkar scored in his career?",
  ["100", "75", "18", "49"],
  1
);

addQuestion(
  "Who is called as King of Cricket?",
  ["Brain Lara", "Virat Kohli", "Don BradMan", "Sachin Tendulkar"],
  2
);

addQuestion(
  "Who bowled the fastest ball in cricket?",
  ["Jasprit Bumrah", "Shoaib Akthar", "MC grath", "Bret Lee"],
  2
);

let currentQuestion = 0;
let currentScore = 0;
let questionsAnswered = 0;

const options = document.querySelectorAll(".option");
const overlay = document.querySelector(".overlay");
const next = document.querySelector(".next");
const submit = document.querySelector(".submit");
const mainBox = document.querySelector(".main-box");
const scoreCard = document.querySelector(".scoreCard");
const submissonButtons = document.querySelector(".submissonButtons");
const answered = document.querySelector(".questionsAnswered");
const correctAnswers = document.querySelector(".correctAnswers");
const totalScore = document.querySelector(".totalScore");
const timeRemain = document.querySelector(".timeRemaining");
const timer = document.querySelector(".timer");
const timeToComplete = 30;
let timeLeft = 30;

const startTimer = function () {
  const runTimer = function () {
    if (timeLeft == -1) {
      if (currentQuestion === questions.length) {
        clearInterval(timerId);
        submitQuiz();
      } else nextQuestion();
    } else {
      timeRemain.textContent = timeLeft;
      timeLeft--;
    }
  };

  let timerId = setInterval(runTimer, 1000);
};

const nextQuestion = function () {
  currentQuestion++;
  timeLeft = 30;
  for (let i = 0; i < options.length; i++) {
    options[i].style.backgroundColor = "";
  }

  overlay.classList.add("hidden");
  if (currentQuestion == questions.length) {
    next.classList.add("hidden");
    submit.classList.remove("hidden");
    submissonButtons.style.justifyContent = "flex-end";
  }
  document.querySelector(".questionNum").textContent = currentQuestion;
  document.querySelector(".totalQuestions").textContent = questions.length;

  document.querySelector(".question").textContent = `${currentQuestion}. ${
    questions[currentQuestion - 1].question
  }`;

  for (let optionIndex = 0; optionIndex < 4; optionIndex++) {
    document.querySelector(`.opt-${optionIndex + 1}`).textContent =
      questions[currentQuestion - 1].options[optionIndex];
  }
};

const submitQuiz = function () {
  timer.classList.add("hidden");
  mainBox.classList.add("hidden");
  scoreCard.classList.remove("hidden");
  document.querySelector(".totalQues").textContent = questions.length;
  answered.textContent = questionsAnswered;
  correctAnswers.textContent = currentScore;
  totalScore.textContent = `${currentScore} / ${questions.length}`;

  currentQuestion = 0;
  currentScore = 0;
  questionsAnswered = 0;
};

timeRemain.textContent = timeToComplete;
nextQuestion();
startTimer();
next.addEventListener("click", nextQuestion);

for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", function () {
    questionsAnswered++;
    const answer = questions[currentQuestion - 1].answerIndex;
    if (i + 1 === answer) {
      document.querySelector(`.option-${i + 1}`).style.backgroundColor =
        "rgb(57, 190, 57)";
      currentScore++;
    } else {
      document.querySelector(`.option-${i + 1}`).style.backgroundColor = "red";
      document.querySelector(`.option-${answer}`).style.backgroundColor =
        "rgb(57, 190, 57)";
    }

    overlay.classList.remove("hidden");
  });
}

submit.addEventListener("click", submitQuiz);

document.querySelector(".restart").addEventListener("click", function () {
  timer.classList.remove("hidden");
  mainBox.classList.remove("hidden");
  scoreCard.classList.add("hidden");

  next.classList.remove("hidden");
  submit.classList.add("hidden");
  submissonButtons.style.justifyContent = "";
  timeRemain.textContent = timeToComplete;
  nextQuestion();
  startTimer();
});
