//Instantiate Global Variables
var divArray = [];
var xTurn = true;
var winColor = "yellow";
var gameOver = false;
var useComputer = false;
var killClick = false;

//Computer Moves
var computerMove = function() {
	if (gameOver){
		return;
	}

	if (takeTheMiddle()){
		return;
	}

	if (makeMatch()){
		return;
	}

	if (blockMatch()){
		return;
	}

	if (doRandom()){
		return;
	}
	return
}

//Change to allow computer moves
var computerSwitch = document.getElementsByName("computerSwitch")[0];
computerSwitch.addEventListener("change", function(){
	useComputer = !useComputer;
	reset();
	console.log("changed ai");
})

//Populate Array of squares
for (var i = 0; i < 3; i++){
	divArray[i * 3] = document.getElementById("div_square" + i + "0");
	divArray[i * 3 + 1] = document.getElementById("div_square" + i + "1");
	divArray[i * 3 + 2] = document.getElementById("div_square" + i + "2");
}

var displaySmall = document.getElementById("div_small");
var displayLarge = document.getElementById("div_large");

//Create Reset Button
var reset = function(){

	xTurn = true;
	gameOver = false;
	killClick = false;
	displaySmall.innerHTML = "Current Player:";
	displaySmall.style.color = "white";
	displayLarge.innerHTML = "X";
	displayLarge.style.color = "white";

	for (var i = 0; i < 9; i++){
		divArray[i].innerHTML = "";
		divArray[i].style.color = "white";
	}
}
reset(); // seems I need to clear white space...

var resetButton = document.getElementById("div_reset");
resetButton.addEventListener("click", reset);

//What happens when you click
var handleClick = function(arrayAddress){
	if (divArray[arrayAddress].innerHTML === "X" || divArray[arrayAddress].innerHTML === "O" || gameOver || killClick){
		return;
	} else {
		if (xTurn){
			divArray[arrayAddress].innerHTML = "X";
		} else {
			divArray[arrayAddress].innerHTML = "O";
		}
		changeTurn();
		checkWin();
		checkTie();

		if(useComputer){
			killClick = true;
			setTimeout(computerMove,1000);
		}
	}
}

//Go between X and O
var changeTurn = function(){
	if (xTurn) {
		xTurn = false;
		displayLarge.innerHTML = "O";
	}
	else {
		xTurn = true;
		displayLarge.innerHTML = "X";
	}
}

var checkWin = function(){
	// check row
	for (var i = 0; i < 7; i += 3){

		//check if the row is not full
		if (divArray[i].innerHTML === "" || divArray[i + 1].innerHTML === "" || divArray[i + 2].innerHTML === ""){
		}

		//check if the row is a match
		else if (divArray[i].innerHTML === divArray[i + 1].innerHTML && divArray[i].innerHTML === divArray[i + 2].innerHTML){
			//shows you the winner!
			displaySmall.innerHTML = "The Winner Is:";
			displaySmall.style.color = winColor;
			displayLarge.innerHTML = divArray[i].innerHTML;
			displayLarge.style.color = winColor;

			divArray[i].style.color = winColor;
			divArray[i + 1].style.color = winColor;
			divArray[i + 2].style.color = winColor;
			gameOver = true;
			return;
		}
	}

	//check column
	for (var i = 0; i < 3; i++){

		//check if the column is not full
		if (divArray[i].innerHTML === "" || divArray[i + 3].innerHTML === "" || divArray[i + 6].innerHTML === ""){
		}

		//check if the column is a match
		else if (divArray[i].innerHTML === divArray[i + 3].innerHTML && divArray[i].innerHTML === divArray[i + 6].innerHTML){

			//shows you the winner!
			displaySmall.innerHTML = "The Winner Is:";
			displaySmall.style.color = winColor;
			displayLarge.innerHTML = divArray[i].innerHTML;
			displayLarge.style.color = winColor;

			divArray[i].style.color = winColor;
			divArray[i + 3].style.color = winColor;
			divArray[i + 6].style.color = winColor;
			gameOver = true;
			return;					
		}

	}

	//check diagonals
	if (divArray[4].innerHTML != ""){
		if (divArray[4].innerHTML === divArray[0].innerHTML && divArray[4].innerHTML === divArray[8].innerHTML){

			//shows you the winner!
			displaySmall.innerHTML = "The Winner Is:";
			displaySmall.style.color = winColor;
			displayLarge.innerHTML = divArray[4].innerHTML;
			displayLarge.style.color = winColor;

			divArray[0].style.color = winColor;
			divArray[4].style.color = winColor;
			divArray[8].style.color = winColor;
			gameOver = true;
			return;	

		} else if (divArray[4].innerHTML === divArray[2].innerHTML && divArray[4].innerHTML === divArray[6].innerHTML){

			//shows you the winner!
			displaySmall.innerHTML = "The Winner Is:";
			displaySmall.style.color = winColor;
			displayLarge.innerHTML = divArray[4].innerHTML;
			displayLarge.style.color = winColor;

			divArray[2].style.color = winColor;
			divArray[4].style.color = winColor;
			divArray[6].style.color = winColor;	
			gameOver = true;		
			return;
		}
	}

}
// checkTie
var checkTie = function(){
	for (var i = 0; i < 9; i++){
		if (divArray[i].innerHTML === "" || gameOver){
			return;
		}
	}
	displaySmall.innerHTML = "We have a";
	displaySmall.style.color = "orange";
	displayLarge.innerHTML = "Tie";
	displayLarge.style.color = "orange";

	for (var i = 0; i < 9; i++){
		divArray[i].style.color = "orange";
	}

	gameOver = true;
}

//Add event listeners to the array of squares

divArray[0].addEventListener("click", function(){
	handleClick(0);
})

divArray[1].addEventListener("click", function(){
	handleClick(1);
})

divArray[2].addEventListener("click", function(){
	handleClick(2);
})

divArray[3].addEventListener("click", function(){
	handleClick(3);
})

divArray[4].addEventListener("click", function(){
	handleClick(4);
})

divArray[5].addEventListener("click", function(){
	handleClick(5);
})

divArray[6].addEventListener("click", function(){
	handleClick(6);
})

divArray[7].addEventListener("click", function(){
	handleClick(7);
})

divArray[8].addEventListener("click", function(){
	handleClick(8);
})

var wait = function(){
	console.log("waiting");
}

var takeTheMiddle = function(){
	if (divArray[4].innerHTML === ""){
		console.log("Taking the middle!");
		divArray[4].innerHTML = "O";
		killClick = false;
		changeTurn();
		checkWin();
		checkTie();
		return true;
	}
	return false;
}

var blockMatch = function(){
	var hasMatch = false;
	var isFilled = false;
	for(var i = 0; i < 7; i += 3){
		hasMatch = checkForTwo(i, i + 1, i + 2, "X");
		isFilled = isFull(i, i + 1, i + 2); 
		if (hasMatch && !isFilled){
			console.log("Found a match at row " + i);
			if (divArray[i].innerHTML === ""){
				divArray[i].innerHTML = "O";
			} else if (divArray[i + 1].innerHTML === ""){
				divArray[i + 1].innerHTML = "O";
			} else {
				divArray[i + 2].innerHTML = "O";
			}
			killClick = false;
			changeTurn();
			checkWin();
			checkTie();
			return true;
		}
	}
	hasMatch = false;
	isFilled = false;
	for(var i = 0; i < 3; i++){
		hasMatch = checkForTwo(i, i + 3, i + 6, "X");
		isFilled = isFull(i, i + 3, i + 6); 
		if (hasMatch && !isFilled){
			console.log("Found a match at column " + i);
			if (divArray[i].innerHTML === ""){
				divArray[i].innerHTML = "O";
			} else if (divArray[i + 3].innerHTML === ""){
				divArray[i + 3].innerHTML = "O";
			} else {
				divArray[i + 6].innerHTML = "O";
			}
			killClick = false;
			changeTurn();
			checkWin();
			checkTie();
			return true;
		}
	}
	hasMatch = false;
	isFilled = false;
	hasMatch = checkForTwo(0,4,8, "X");
	isFilled = isFull(0, 4, 8); 
	if (hasMatch && !isFilled){
		console.log("Found a match at diagonal 1");
		if (divArray[0].innerHTML === ""){
			divArray[0].innerHTML = "O";
		} else if (divArray[4].innerHTML === ""){
			divArray[4].innerHTML = "O";
		} else {
			divArray[8].innerHTML = "O";
		}
		killClick = false;
		changeTurn();
		checkWin();
		checkTie();
		return true;
	}
	hasMatch = checkForTwo(2,4,6, "X");
	isFilled = isFull(2, 4, 6); 
	if (hasMatch && !isFilled){
		console.log("Found a match at diagonal 2");
		if (divArray[2].innerHTML === ""){
			divArray[2].innerHTML = "O";
		} else if (divArray[4].innerHTML === ""){
			divArray[4].innerHTML = "O";
		} else {
			divArray[6].innerHTML = "O";
		}
		killClick = false;
		changeTurn();
		checkWin();
		checkTie();
		return true;
	}	
	return false;
}

var makeMatch = function() {
	var hasMatch = false;
	var isFilled = false;
	for(var i = 0; i < 7; i += 3){
		hasMatch = checkForTwo(i, i + 1, i + 2, "O");
		isFilled = isFull(i, i + 1, i + 2); 
		if (hasMatch && !isFilled){
			console.log("Found a match at row " + i);
			if (divArray[i].innerHTML === ""){
				divArray[i].innerHTML = "O";
			} else if (divArray[i + 1].innerHTML === ""){
				divArray[i + 1].innerHTML = "O";
			} else {
				divArray[i + 2].innerHTML = "O";
			}
			killClick = false;
			changeTurn();
			checkWin();
			checkTie();
			return true;
		}
	}
	hasMatch = false;
	isFilled = false;
	for(var i = 0; i < 3; i++){
		hasMatch = checkForTwo(i, i + 3, i + 6, "O");
		isFilled = isFull(i, i + 3, i + 6); 
		if (hasMatch && !isFilled){
			console.log("Found a match at column " + i);
			if (divArray[i].innerHTML === ""){
				divArray[i].innerHTML = "O";
			} else if (divArray[i + 3].innerHTML === ""){
				divArray[i + 3].innerHTML = "O";
			} else {
				divArray[i + 6].innerHTML = "O";
			}
			killClick = false;
			changeTurn();
			checkWin();
			checkTie();
			return true;
		}
	}
	hasMatch = false;
	isFilled = false;
	hasMatch = checkForTwo(0,4,8, "O");
	isFilled = isFull(0, 4, 8); 
	if (hasMatch && !isFilled){
		console.log("Found a match at diagonal 1");
		if (divArray[0].innerHTML === ""){
			divArray[0].innerHTML = "O";
		} else if (divArray[4].innerHTML === ""){
			divArray[4].innerHTML = "O";
		} else {
			divArray[8].innerHTML = "O";
		}
		killClick = false;
		changeTurn();
		checkWin();
		checkTie();
		return true;
	}
	hasMatch = checkForTwo(2,4,6, "O");
	isFilled = isFull(2, 4, 6); 
	if (hasMatch && !isFilled){
		console.log("Found a match at diagonal 2");
		if (divArray[2].innerHTML === ""){
			divArray[2].innerHTML = "O";
		} else if (divArray[4].innerHTML === ""){
			divArray[4].innerHTML = "O";
		} else {
			divArray[6].innerHTML = "O";
		}
		killClick = false;
		changeTurn();
		checkWin();
		checkTie();
		return true;
	}	
	return false;
}

var checkForTwo = function(a,b,c, str) {
	if(divArray[a].innerHTML === str && divArray[b].innerHTML === str){
		return true;
	} else if (divArray[a].innerHTML === str && divArray[c].innerHTML === str){
		return true;
	} else if (divArray[b].innerHTML === str && divArray[c].innerHTML === str){
		return true;
	} else {
		return false;
	}
}

var doRandom = function(){
	var squareIndex = -1;
	while (squareIndex === -1 || divArray[squareIndex].innerHTML === "X" || divArray[squareIndex].innerHTML === "O"){
		console.log("squareIndex = " + squareIndex);
		squareIndex = Math.floor(Math.random() * 9);
	}
	divArray[squareIndex].innerHTML = "O";

	killClick = false;
	changeTurn();
	checkWin();
	checkTie();
	return true;
}

var isFull = function(a,b,c){
	if(divArray[a].innerHTML === "" || divArray[b].innerHTML === "" || divArray[c].innerHTML === ""){
		return false;
	}
	return true;
}