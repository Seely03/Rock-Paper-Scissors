const selections = document.querySelectorAll(".selection");
const playerScoreDisplay = document.querySelector("#playerScore");
const computerScoreDisplay = document.querySelector("#computerScore");
const finalColumn = document.querySelector("#final");
const maxScore = document.querySelector("#maxScore");
let maxScoreNum = parseInt(maxScore.value);
const resetBtn = document.querySelector("#reset");
const subtitle = document.querySelector("h2");
const darkMode = document.querySelector(".btn-darkmode");
let selected = null

let playerScore = 0;
let computerScore = 0;
let isGameOver = false;

const choices = [
	{
		name: "rock",
		icon: "👊",
		beats: "scissors",
	},
	{
		name: "paper",
		icon: "✋",
		beats: "rock",
	},
	{
		name: "scissors",
		icon: "✌️",
		beats: "paper",
	},
];

function computerPlay() {
	let computerChoice = choices[Math.floor(Math.random() * choices.length)];
	return computerChoice;
}

for (let selection of selections) {
	selection.addEventListener("click", () => {
		const selectionName = selection.id;
		const choice = choices.find(
			(selection) => selection.name === selectionName
		);
		if (!isGameOver) {
			makeChoice(choice);
		}
	});
}

resetBtn.addEventListener("click", () => {
	reset();
});

maxScore.addEventListener("change", () => {
	reset();
	maxScoreNum = parseInt(maxScore.value);
});

function makeChoice(choice) {
	const computerChoice = computerPlay();
	const playerWin = isWinner(choice, computerChoice);
	const computerWin = isWinner(computerChoice, choice);
	const isDraw = choice === computerChoice;

	showSelections(computerChoice, computerWin);
	showSelections(choice, playerWin);
	draw(isDraw);
	if (playerWin) ++playerScore;
	if (computerWin) ++computerScore;
	playerScoreDisplay.innerText = playerScore;
	computerScoreDisplay.innerText = computerScore;
	if (computerScore === maxScoreNum || playerScore === maxScoreNum)
		isGameOver = true;
	congrats();
}

function showSelections(choice, winner) {
	const div = document.createElement("div");
	div.setAttribute("id", "selected")
	div.innerText = choice.icon;
	div.classList.add("result-selection");
	if (winner) div.classList.add("winner");
	else div.classList.add("loser");
	finalColumn.after(div);
	selected = document.querySelectorAll("#selected")
}


function isWinner(choice, opponentChoice) {
	return choice.beats === opponentChoice.name;
}

function reset() {
	playerScore = 0;
	computerScore = 0;
	playerScoreDisplay.innerText = playerScore;
	computerScoreDisplay.innerText = computerScore;
	isGameOver = false;
	document.querySelectorAll(".result-selection").forEach((el) => el.remove());
	subtitle.innerText = "Man vs Machine";
}

function draw(isDraw) {
	if (isDraw) {
		const node = document.querySelectorAll(".result-selection");
		node[0].classList.remove("loser")
		node[1].classList.remove("loser")
		node[0].classList.add("draw");
		node[1].classList.add("draw");
		if (window.localStorage.getItem("darkMode") === "enabled") {
			node[0].style.color = "#eee";
			node[1].style.color = "#eee";
		} else {
			node[0].style.color = "#222";
			node[1].style.color = "#222";
		}
	}
}

function congrats() {
	if (isGameOver && playerScore > computerScore)
		subtitle.innerText = `The game is over. You won! Congratulations!`;
	if (isGameOver && playerScore < computerScore)
		subtitle.innerText = `The game is over. You lost! Better luck next time!`;
}

darkMode.addEventListener("click", function () {
	document.body.classList.toggle("dark-theme");
	if (window.localStorage.getItem("darkMode") === "enabled") {
		window.localStorage.setItem("darkMode", null);
	} else {
		window.localStorage.setItem("darkMode", "enabled");
	}
	for (let selection of selections) {
		if (selection.style.color !== "white") {
			selection.style.color = "white";
		} else {
			selection.style.color = "#222";
		}
	}
	for (let item of selected) {
		if (item.style.color.includes("rgb(3")) {
		item.style.color = "#eee"
	}
	else if (item.style.color.includes("rgb(2")){
		item.style.color = "#222"
	}}
});

if (window.localStorage.getItem("darkMode") === "enabled") {
	document.body.classList.toggle("dark-theme");
	for (let selection of selections) {
		selection.style.color = "white";
	}
}
