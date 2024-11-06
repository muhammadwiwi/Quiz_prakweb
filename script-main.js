const questions = [
    {
        question: "Tag apakah yang digunakan untuk membuat script HTML, kecuali?",
        options: ["<p></p>", "function", "<html></html>", "<a></a>"],
        correctAnswer: 0
    },
    {
        question: "apkah fungsi ?",
        options: ["London", "Paris", "Rome", "Berlin"],
        correctAnswer: 1
    },
   
]
let currentQuestionIndex = 0;
let timerValue = 30;
let timerInterval;
let score = 0;
let answerSelected = false; 


function startTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timerValue;

    timerInterval = setInterval(() => {
        if (timerValue > 0) {
            timerValue--;
            timerElement.textContent = timerValue ;
        } else {
            clearInterval(timerInterval);
            disableAnswers();
            showNextButton();
            if (!answerSelected) {
                
                currentQuestionIndex++;
                loadQuestion();
            }
        }
    }, 1000);
}


function loadQuestion() {
    clearInterval(timerInterval);
    timerValue = 30;
    startTimer();
    answerSelected = false;

    const questionData = questions[currentQuestionIndex];
    document.getElementById('question-number').textContent = `${currentQuestionIndex + 1}/${questions.length} Questions`;
    document.getElementById('question-text').textContent = questionData.question;

    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = ''; 

    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('answer-button');
        button.textContent = option;
        button.onclick = () => selectAnswer(button, index); 
        answersContainer.appendChild(button);
    });

    document.querySelector('.next-button').classList.add('hidden');
}


function selectAnswer(button, index) {
    const questionData = questions[currentQuestionIndex];
    answerSelected = true;

    if (index === questionData.correctAnswer) {
        button.classList.add('correct-answer');
        score += 10; 
    } else {
        button.classList.add('incorrect-answer');
    }

    disableAnswers();
    clearInterval(timerInterval); 
    showNextButton(); 
}


function disableAnswers() {
    const answerButtons = document.querySelectorAll('.answer-button');
    answerButtons.forEach(btn => btn.disabled = true);
}


function showNextButton() {
    document.querySelector('.next-button').classList.remove('hidden');
}


function nextQuestion() {
    currentQuestionIndex++; 

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.querySelector('.question-section').innerHTML = `<h3>Quiz Complete!</h3><p>Your Score: ${score} out of ${questions.length * 10}</p><p>Thank you for participating.</p>`;
    }
}

window.onload = loadQuestion;
