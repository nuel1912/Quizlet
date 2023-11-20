function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function shuffleAnswerOptions(answers) {
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
}



let questions = [
    {
        question: "How many books are in the Bible?",
        answers: [
            {
                option: 29,
                status: false
            },
            {
                option: 37,
                status: false
            },
            {
                option: 45,
                status: false
            },
            {
                option: 66,
                status: true
            }
        ]
    },
    {
        question: "Who wrote the book of Acts of the Apostles?",
        answers: [
            {
                option: "John",
                status: false
            },
            {
                option: "Paul",
                status: false
            },
            {
                option: "Mark",
                status: false
            },
            {
                option: "Luke",
                status: true
            }
        ]
    },
    {
        question: "The shortest chapter in the Bible is?",
        answers: [
            {
                option: "Haggai 3",
                status: false
            },
            {
                option: "Psalm 117",
                status: true
            },
            {
                option: "Obadiah 1",
                status: false
            },
            {
                option: "Isaiah 58",
                status: false
            }
        ]
    },
    {
        question: "Who betrayed Jesus?",
        answers: [
            {
                option: "Timothy",
                status: false
            },
            {
                option: "Matthias",
                status: false
            },
            {
                option: "Judas iscariot",
                status: true
            },
            {
                option: "Peter",
                status: false
            }
        ]
    },
    {
        question: "'Be not comformed to this world but be ye transformed by the renewing of your mind that ye may prove what is that good, and acceptable and perfect will of God', where's is this in the Bible?",
        answers: [
            {
                option: "1 Corithians 6:12",
                status: false
            },
            {
                option: "Luke 7:9",
                status: false
            },
            {
                option: "Romans 12:2",
                status: true
            },
            {
                option: "Ephesians 5:4",
                status: false
            }
        ]
    },
    {
        question: "John 11:35 says?",
        answers: [
            {
                option: "Jesus wept",
                status: true
            },
            {
                option: "I am the Way, the Truth and the Life.",
                status: false
            },
            {
                option: "Every branch in me that beareth not fruit He taketh away and every branch that beareth fruit He purgeth it that it may bring forth much fruit.",
                status: false
            },
            {
                option: "In the beginning, God created the heaven and the earth.",
                status: false
            }
        ]
    },
    {
        question: "What's the next: 'Nehemiah, Job, Proverbs, Songs of Solomon, Jeremiah...'",
        answers: [
            {
                option: "Lamentations",
                status: false
            },
            {
                option: "Obadiah",
                status: false
            },
            {
                option: "Isaiah",
                status: false
            },
            {
                option: "Ezekiel",
                status: true
            }
        ]
    },
    {
        question: "Genesis and Revelations have how many chapters?",
        answers: [
            {
                option: "22 and 21",
                status: false
            },
            {
                option: "50 and 22",
                status: true
            },
            {
                option: "45 and 21",
                status: false
            },
            {
                option: "22 and 50",
                status: false
            }
        ]
    },
    {
        question: "Joshua Dad's name was?",
        answers: [
            {
                option: "Moses",
                status: false
            },
            {
                option: "Jesse",
                status: false
            },
            {
                option: "Nun",
                status: true
            },
            {
                option: "Joseph",
                status: false
            }
        ]
    },
    {
        question: "Jesus commanded us to be perfect ba?",
        answers: [
            {
                option: "Yes",
                status: true
            },
            {
                option: "No",
                status: false
            },
            {
                option: "I don't know",
                status: false
            },
            {
                option: "Wait, make I check my Bible",
                status: false
            }
        ]
    },
];





let ques = document.querySelector("#question");
let answerBtns = document.querySelector("#answer-btns");
let next = document.querySelector("#next");

let currentQuesIndex = 0;
let mark = 0;

function startQuiz() {
    currentQuesIndex = 0;
    mark = 0;
    next.innerHTML = "Next";
    
    shuffleArray(questions);
    displayQues();
}

function displayQues() {
    resetQues();
    let currentQues = questions[currentQuesIndex];
    let quesNo = currentQuesIndex + 1;
    ques.innerHTML = quesNo + ". " + currentQues.question;

    currentQues.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.option;
        button.classList.add("btn");
        answerBtns.appendChild(button);

        if (answer.status) {
            button.dataset.status = answer.status;
        }
        button.addEventListener("click", selectAns);
    });

    shuffleAnswerOptions(currentQues.answers);
}

function resetQues() {
    next.style.display = "none";
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAns(e) {
    const chosenBtn = e.target;
    const isCorrect = chosenBtn.dataset.status === "true";
    if (isCorrect) {
        chosenBtn.classList.add("right");
        mark++;
    } else {
        chosenBtn.classList.add("wrong");
    }

    Array.from(answerBtns.children).forEach(button => {
        if (button.dataset.status === "true") {
            button.classList.add("right");
        }
        button.disabled = true;
    });
    next.style.display = "block";
}


function showMark() {
    resetQues();
    ques.innerHTML = `You got ${mark} out of ${questions.length}...`;

    next.innerHTML = "Wanna play again?";
    next.style.display = "block";
    next.style.cursor = "pointer";
    // next.style.width = "50%";
}


function handleNextBtn() {
    currentQuesIndex++;
    if (currentQuesIndex < questions.length) {
        displayQues();
    } else {
        showMark();
    }
}

next.addEventListener("click", function () {
    if (currentQuesIndex < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
})

startQuiz();
