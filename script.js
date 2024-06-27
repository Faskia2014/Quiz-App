const questions = [{
    question: "What is this?",
    answers: [
        { text: "Answer 1", correct: false },
        { text: "Answer 2", correct: false },
        { text: "Answer 3", correct: true },
        { text: "Answer 4", correct: false }
    ]
}, {
    question: "What is that?",
    answers: [
        { text: "Answer 1", correct: true },
        { text: "Answer 2", correct: false },
        { text: "Answer 3", correct: false },
        { text: "Answer 4", correct: false }
    ]
}, {
    question: "What is the highest mountain in the world?",
    answers: [
        { text: "Ras Dashen", correct: false },
        { text: "Everest", correct: true },
        { text: "Kilimanjaro", correct: false },
        { text: "Answer 4", correct: false }
    ]
}, {
    question: "Which of the following is a web language?",
    answers: [
        { text: "HTML", correct: false },
        { text: "CSS", correct: false },
        { text: "JavaScript", correct: false },
        { text: "All", correct: true }
    ]
}];

const questionbtn = document.getElementById("question");
const answerbtn = document.getElementById("answers");
const next = document.getElementById("btn2");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    next.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionbtn.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn1");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerbtn.appendChild(button);
    });
}

function resetState() {
    while (answerbtn.firstChild) {
        answerbtn.removeChild(answerbtn.firstChild);
    }
    next.style.display = "none";
}

function selectAnswer(e) {
    const selectedbtn = e.target;
    const correct = selectedbtn.dataset.correct === "true";

    if (correct) {
        selectedbtn.classList.add("correct");
        score++;
    } else {
        selectedbtn.classList.add("incorrect");
    }

    Array.from(answerbtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    next.style.display = "block";
}

next.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionbtn.innerHTML = `You scored ${score} out of ${questions.length}!`;
    next.innerHTML = 'Play Again';
    next.style.display = 'block';
    next.addEventListener('click', startQuiz);
}

startQuiz();
