
// TRACKING VARIABLES
// expects value of "trump" or "kanye"
let currentQuote = "";
let score = 0;
let wrong = 0;

// REQUEST 2 QUOTES AND DIPSLAY ONE CHOSEN RANDOMLY

const pickQuote = (array) => {
    let num = Math.floor(Math.random() * 2);
    console.log("The one Picked for display:", array[num]);
    if (!num) {
        currentQuote = "trump";
    } else {
        currentQuote = "kanye";
    }
    console.log("currentQuote variable assigned a value of: ", currentQuote);
    return array[num];
};

const startGame = () => {
    Promise.all(
        [axios.get("https://api.whatdoestrumpthink.com/api/v1/quotes/random"),
        axios.get("https://api.kanye.rest")]
    )
    .then(result => {

    
        const trumpQuote = result[0].data.message;
        const kanyeQuote = result[1].data.quote;
        let quotesArray = [trumpQuote, kanyeQuote];

        console.log("Random Trump Quote:", trumpQuote);
        console.log("Random Kanye Quote:", kanyeQuote);

        const picked = pickQuote(quotesArray);
        console.log("After picked is run currentQuote is:", currentQuote);

        startButton.style.display = "none";
        const quoteContainer = document.querySelector(".interact__quote");
        quoteContainer.style.display = "block";
        quoteContainer.innerText = picked;

        console.log(score);
        console.log(wrong);
    })
    .catch(error => console.log(error));
}

// ADD EVENT LISTNER TO START BUTTON
const startButton = document.querySelector(".button--start");

startButton.addEventListener("click", (event) => {
    event.preventDefault();
    startGame();
    // make start button go away
});

// ADD EVENT LISTNER TO BUTTONS TO HANDLE CHOICE
const trumpImage = document.querySelector(".interact__button--trump");
const kanyeImage = document.querySelector(".interact__button--kanye");
const healthBar = document.querySelector(".score__healthbar");
const interactWrong = document.querySelector(".interact__wrong");
const interactCorrect = document.querySelector('.interact__correct');

const selectEventHandler = (event) => {
    let id = event.target.getAttribute("id");
    console.log("hello");
    if (id === currentQuote) {
        score = score + 1;
        const moneyBag = document.createElement("div");
        moneyBag.classList.add("score__unit");
        healthBar.appendChild(moneyBag);
        interactCorrect.style.display = "flex";
        setTimeout(() => {
            interactCorrect.style.display = "none";
        }, 1500);
    } else {
        wrong = wrong + 1;
        interactWrong.style.display = "flex";
        setTimeout(() => {
            interactWrong.style.display = "none";
        }, 1500);
    }

    if (score === 10) {
        const youWin = document.querySelector(".outcome__content--win");
        youWin.style.display = "flex";
        score = 0;
        wrong = 0;
        healthBar.innerHTML = "";
    } else if (wrong === 3) {
        const youLose = document.querySelector(".outcome__content--lose");
        youLose.style.display = "flex";
        score = 0;
        wrong = 0;
        healthBar.innerHTML = "";
    }
}

trumpImage.addEventListener("click", (event) => {
    selectEventHandler(event);
    setTimeout(() => {
        startGame();
    }, 1750);
    // kanyeImage.removeEventListener("click", selectEventHandler);
});

kanyeImage.addEventListener("click", (event) => {
    selectEventHandler(event);
    setTimeout(() => {
        startGame();
    }, 1750);
    // trumpImage.removeEventListener("click", selectEventHandler);
});



// menu
const hamburger = document.querySelector(".mobile-nav");
const mainNav = document.querySelector(".main-nav");

hamburger.addEventListener("click", () => {
    mainNav.style.display = "flex";
});

const closeMenu = document.querySelector(".mobile-nav__close");
closeMenu.addEventListener("click", () => {
    mainNav.style.display = "none";
});


















