const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "This is example question 1 (A).",
        choice1: "Aspas",
        choice2: "Boo",
        choice3: "Chronicle",
        choice4: "d4v41",
        answer: 1
    },
    {
        question: "This is example question 2 (B).",
        choice1: "EliGE",
        choice2: "Frozen",
        choice3: "Gla1ve",
        choice4: "Heavygod",
        answer: 2
    },
    {
        question: "This is example question 3 (C).",
        choice1: "Interz",
        choice2: "Jks",
        choice3: "Karrigan",
        choice4: "Leaf",
        answer: 3
    }
]

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [ ... questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();