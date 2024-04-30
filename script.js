document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const questionContainerElement = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const scoreNumberElement = document.getElementById('score-number');

    let shuffledQuestions, currentQuestionIndex, score;

    const questions = [
        {
            question: "What is 2 + 2?",
            answers: [
                { text: "4", correct: true },
                { text: "5", correct: false },
                { text: "3", correct: false }
            ]
        },

        {
            question: 'What is a Variable in JavaScript?',
            answers: [
                { text: 'A section of the webpage', correct: false },
                { text: 'A container for storing data values', correct: true },
                { text: 'A type of JavaScript function', correct: false },
                { text: 'An operation in mathematics', correct: false }
            ]
        },
        {
            question: 'What is a Variable in JavaScript?',
            answers: [
                { text: 'A section of the webpage', correct: false },
                { text: 'A container for storing data values', correct: true },
                { text: 'A type of JavaScript function', correct: false },
                { text: 'An operation in mathematics', correct: false }
            ]
        },
        {
            question: 'What does CSS stand for?',
            answers: [
                { text: 'Cascading Style Sheets', correct: true },
                { text: 'Computer Style Sheets', correct: false },
                { text: 'Colorful Style Sheets', correct: false },
                { text: 'Creative Style Sheets', correct: false }
            ]
        },
        {
            question: 'What does HTML stand for?',
            answers: [
                { text: 'Hyper Text Markup Language', correct: true },
                { text: 'Hyperlinks and Text Markup Language', correct: false },
                { text: 'Home Tool Markup Language', correct: false },
                { text: 'Hyperlinks and Text Management Language', correct: false }
            ]
        },
        {
            question: 'What is the capital of France?',
            answers: [
                { text: 'London', correct: false },
                { text: 'Berlin', correct: false },
                { text: 'Paris', correct: true },
                { text: 'Madrid', correct: false }
            ]
        },
        {
            question: 'Who wrote "To Kill a Mockingbird"?',
            answers: [
                { text: 'J.K. Rowling', correct: false },
                { text: 'Harper Lee', correct: true },
                { text: 'Stephen King', correct: false },
                { text: 'Mark Twain', correct: false }
            ]
        },
        {
            question: 'Which planet is known as the Red Planet?',
            answers: [
                { text: 'Venus', correct: false },
                { text: 'Jupiter', correct: false },
                { text: 'Mars', correct: true },
                { text: 'Saturn', correct: false }
            ]
        },
        {
            question: 'What is the tallest mammal?',
            answers: [
                { text: 'Elephant', correct: false },
                { text: 'Giraffe', correct: true },
                { text: 'Horse', correct: false },
                { text: 'Whale', correct: false }
            ]
        }
        // Add more questions in the same format
    ];

    startButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });

    function startGame() {
        startButton.classList.add('hide');
        nextButton.classList.remove('hide');
        score = 0;
        scoreNumberElement.textContent = score;
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        questionContainerElement.classList.remove('hide');
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function selectAnswer(event) {
        const selectedButton = event.target;
        const correct = selectedButton.dataset.correct;
        if (correct) {
            score++;
            scoreNumberElement.textContent = score;
        }
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
            button.disabled = true;
        });
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            startButton.innerText = 'Restart';
            startButton.classList.remove('hide');
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    function resetState() {
        nextButton.classList.add('hide');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }
});
