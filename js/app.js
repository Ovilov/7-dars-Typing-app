import word from "./data.js";

const randomWord = document.querySelector(".random__word");
const input = document.querySelector(".input");
const userScore = document.querySelector(".user__score");
const userTime = document.querySelector(".user__time");
const modal = document.querySelector("#modal");
const btn = document.querySelector("#btn");
const overlay = document.querySelector("#overlay");
const scoreDescription = document.querySelector(".score");

function work() {
  input.focus();

  let globalWord;
  let a = 0;
  let time = 10;
  let level = "easy";

  function randomWordGenerator() {
    const randomNumber = Math.trunc(Math.random() * word.length);
    randomWord.textContent = word[randomNumber];
    globalWord = word[randomNumber];
  }

  randomWordGenerator();

  input.addEventListener("input", () => {
    if (input.value == globalWord) {
      randomWordGenerator();
      new Audio("../music/message.mp3").play();
      input.value = "";
      a++;
      userScore.textContent = a;
      scoreDescription.textContent = a;

      if (level == "easy") {
        time += 7;
      } else if (level == "medium") {
        time += 5;
      } else {
        time += 3;
      }
    }
    new Audio("../music/click-button+.mp3").play();
  });

  userTime.parentElement.style.color = "green";

  const timer = setInterval(() => {
    time--;
    userTime.textContent = `${time} s`;
    if (time == 0) {
      clearInterval(timer);
    }
    if (time >= 7) {
      userTime.parentElement.style.color = "green";
    } else if (time < 7 && time >= 4) {
      document.body.style = `
    box-shadow: 1px 1px 67px 11px rgba(235,255,0,0.75) inset;
-webkit-box-shadow: 1px 1px 67px 11px rgba(235,255,0,0.75) inset;
-moz-box-shadow: 1px 1px 67px 11px rgba(235,255,0,0.75) inset;
    `;
      userTime.parentElement.style.color = "yellow";
    } else {
      userTime.parentElement.style.color = "red";
      document.body.style = `
    box-shadow: 1px 1px 67px 40px rgba(255,49,4,0.75) inset;
-webkit-box-shadow: 1px 1px 67px 40px rgba(255,49,4,0.75) inset;
-moz-box-shadow: 1px 1px 67px 40px rgba(255,49,4,0.75) inset;
    `;
    }
    if (time == 0) {
      new Audio("../music/new.mp3").play();
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");
    }
  }, 1000);
}

work();

btn.addEventListener("click", () => {
    new Audio("../music/click-button+.mp3").play();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  work();
  let a = 0;
  let time = 10;
  userScore.textContent = a;
  scoreDescription.textContent = a;
  userTime.textContent = `${time} s`;
  input.value = "";
});

const changeLevel = document.querySelector("#change__level");

changeLevel.addEventListener("change", () => {
  level = changeLevel.value;
});
