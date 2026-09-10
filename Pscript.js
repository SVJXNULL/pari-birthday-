/* ======================================
   INTRO
====================================== */

const introText =
    "Accessing birthday archive... Identity verification required.";

let textIndex = 0;


/* INTRO AUDIO */

const introAudio = new Audio("audio/intro.ogg");

introAudio.loop = true;
introAudio.volume = 0.5;


/* TYPING */

function typeText() {

    if (textIndex < introText.length) {

        document.getElementById("typing-text").textContent +=
            introText.charAt(textIndex);

        textIndex++;

        setTimeout(typeText, 40);
    }

}

typeText();


/* ======================================
   SCREEN SWITCHING
====================================== */

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}


/* ======================================
   START
====================================== */

function startArchive() {

    introAudio.play().catch(error => {
        console.log("Intro audio could not play:", error);
    });

    showScreen("quiz");

    loadQuestion();
}

/* ======================================
   QUIZ QUESTIONS
====================================== */

const questions = [

    {
        question: "What is Pari most likely to do when she has absolutely nothing to do?",

        answers: [
            "Sleep",
            "FLY",
            "Random stuff with no sense (cute for me though)"
        ],

        correct: 2,
audio: [
    "audio/wrong1.ogg",
    "audio/wrong2.ogg",
    "audio/correct.ogg"
        ]


    },


    {
        question: "Which statement sounds the most like Pari?",

        answers: [
            "yayayayayayayahyahayahyyaya.",
            "hahahahahahahhahaahhahhahhah.",
            "hatttttt."
        ],

        // ALL THREE ANSWERS ARE CORRECT
        correct: [0, 1, 2],

        audio: [
            "audio/correct.ogg",
            "audio/correct.ogg",
            "audio/correct.ogg"
        ]
    },


    {
        question: "What would Pari probably choose?",

        answers: [
            "Something sensible",
            "Something unnecessarily complicated",
            "Both somehow"
        ],

        // Third answer = index 2
        correct: 2,

        audio: [
            "audio/wrong1.ogg",
            "audio/wrong2.ogg",
            "audio/correct.ogg"
        ]
    },


    {
        question: "admins favourite girl is?",

        answers: [
            "Pari",
            "Definitely Pari",
            "Still Pari"
        ],

        correct: [0, 1, 2],

        audio: [
            "audio/correct.ogg",
            "audio/correct.ogg",
            "audio/correct.ogg"
        ]
    }

];


let currentQuestion = 0;


/* ======================================
   LOAD QUESTION
====================================== */

function loadQuestion() {

    const q = questions[currentQuestion];

    document.getElementById("question").textContent =
        q.question;


    const answersContainer =
        document.getElementById("answers");

    answersContainer.innerHTML = "";


    q.answers.forEach((answer, index) => {

        const button =
            document.createElement("div");

        button.className = "answer";

        button.textContent = answer;


        button.onclick = () => {
            checkAnswer(index);
        };


        answersContainer.appendChild(button);

    });


    document.getElementById("progress").textContent =
        `QUESTION ${currentQuestion + 1} / ${questions.length}`;


    document.getElementById("quiz-feedback").textContent = "";

}


/* ======================================
   CHECK ANSWER
====================================== */

function checkAnswer(selected) {

    const q = questions[currentQuestion];

    const correct = q.correct;

    const feedback =
        document.getElementById("quiz-feedback");


    /* ----------------------------------
       PLAY AUDIO FOR SELECTED ANSWER
    ---------------------------------- */

    if (q.audio && q.audio[selected]) {

        playAudio(q.audio[selected]);

    }


    /* ----------------------------------
       CHECK WHETHER ANSWER IS CORRECT
    ---------------------------------- */

    const isCorrect =
        Array.isArray(correct)
            ? correct.includes(selected)
            : selected === correct;


    /* ----------------------------------
       CORRECT ANSWER
    ---------------------------------- */

    if (isCorrect) {

        feedback.textContent =
            "good good ✓";


        currentQuestion++;


        setTimeout(() => {

            if (currentQuestion < questions.length) {

                loadQuestion();

            } else {

                loadMemories();

            }

        }, 1200);

    }


    /* ----------------------------------
       WRONG ANSWER
    ---------------------------------- */

    else {

        feedback.textContent =
            "fahhhhhhhhhh.";

    }

}


/* ======================================
   AUDIO
====================================== */

function playAudio(file) {

    const audio = new Audio(file);

    audio.play().catch(error => {

        console.log("Audio could not play:", error);

    });

}


/* ======================================
   MEMORY ARCHIVE
====================================== */

const memories = [

    {
        image: "images/photo1.jpg",
        title: "FILE 001",
        text: "Evidence recovered from the archives.",
        audio: "audio/audio1.ogg"
    },

    {
        image: "images/photo2.jpg",
        title: "FILE 002",
        text: "Nobody knows why this photograph exists.",
        audio: "audio/audio2.ogg"
    },


    {
        image: "images/photo3.jpg",
        title: "FILE 003",
        text: "A surprisingly important memory.",
        audio: "audio/audio3.ogg"
    },


    {
        image: "images/photo4.jpg",
        title: "FILE 004",
        text: "Further investigation required.",
        audio: "audio/audio4.ogg"
    }


    ,


    {
    image: "images/photo5.jpg",
    title: "FILE 005",
    text: "Another piece of classified evidence.",
    audio: "audio/audio5.ogg"
    },

{
    image: "images/photo6.jpg",
    title: "FILE 006",
    text: "The archive somehow continues.",
    audio: "audio/audio6.ogg"
}


];


/* ======================================
   LOAD MEMORIES
====================================== */

function loadMemories() {

    showScreen("memories");


    const grid =
        document.getElementById("memory-grid");

    grid.innerHTML = "";


    memories.forEach(memory => {

        const card =
            document.createElement("div");

        card.className = "memory-card";


        card.innerHTML = `

            <img
                src="${memory.image}"
                alt="${memory.title}"
            >

            <h3>
                ${memory.title}
            </h3>

            <p>
                ${memory.text}
            </p>

        `;


        card.onclick = () => {

            openMemory(memory);

        };


        grid.appendChild(card);

    });

}


/* ======================================
   OPEN MEMORY
====================================== */

function openMemory(memory) {

    document.getElementById("modal-image").src =
        memory.image;


    document.getElementById("modal-title").textContent =
        memory.title;


    document.getElementById("modal-text").textContent =
        memory.text;


    document.getElementById("photo-modal")
        .classList.add("active");


    /* Play memory-specific audio */

    if (memory.audio) {

        playAudio(memory.audio);

    }

}


/* ======================================
   CLOSE MEMORY
====================================== */

function closeMemory() {

    document.getElementById("photo-modal")
        .classList.remove("active");

}


/* ======================================
   SECRET FILE
====================================== */

function openSecret() {

    showScreen("secret");

}


/* ======================================
   UNLOCK SECRET
====================================== */

function unlockSecret() {

    const container =
        document.getElementById("secret-message");


    container.innerHTML = `

        <p>
            ACCESS GRANTED.
        </p>

        <button onclick="showFinal()">
            OPEN FINAL MESSAGE
        </button>

    `;

}


/* ======================================
   FINAL MESSAGE
====================================== */

function showFinal() {

    showScreen("final");

}