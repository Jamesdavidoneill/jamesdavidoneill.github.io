let numSquares = 6;
let colors = [];
let pickedColor;

let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay= document.querySelector("#message");
let h1=document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	setUpModeButtons();
	setUpSquares();
	reset();
}
resetButton.addEventListener("click", function(){
	reset();
})
function changeColors(color){
	//Loop through squares
	for(let i=0; i<squares.length; i++){
		//Change colors
		squares[i].style.backgroundColor = color;
	}	
}
function pickColor(){
	let random = Math.floor( Math.random() * colors.length );
	return colors[random];
}
function generateRandomColors(num){
	//Make an array
	let arr=[];
	//add num random colors to array
	for(let i = 0; i < num; i++){
		//Get random color and push into arr
		arr.push(randomColor());
	}
	//return that array
	return arr;
}
function randomColor(){
	//Pick a "red" from 0 - 255
	var r = Math.floor( Math.random() * 256 );
	//Pick a "green" from 0 - 255
	var g = Math.floor( Math.random() * 256 );
	//Pick a "blue" from 0 - 255
	var b = Math.floor( Math.random() * 256 );
	return "rgb(" + r + ", " + g + ", " + b +")";
}
function reset(){
	//Generate new colors
	colors = generateRandomColors(numSquares);
	//Pick a new random color from array
	pickedColor = pickColor();
	//Change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	//Change colors of squares
	for(let i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}else{
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor="steelblue";
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colours";
}
function setUpModeButtons(){
	for(let i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			console.log("hi");
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			
			this.textContent === "Easy" ? numSquares=3: numSquares=6;
			
			reset();
			//figure out how many squares to show
			//Pick new colors
			//pick new pickedColor
			//update page to reflect changes
		})
	}
}
function setUpSquares(){
	for(let i=0; i<squares.length; i++){
		//Add initial colors to squares
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener("click", function(){
			//Grab color of clicked square
			let clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor){
				messageDisplay.textContent="Correct";
				changeColors(this.style.backgroundColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again?";
			}
			else{
				this.style.backgroundColor="#232323"
				messageDisplay.textContent="Try Again";
			}
		})
	}
}