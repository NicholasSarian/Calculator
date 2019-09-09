var calcResult = "";
var bigBottom = document.getElementById("bigBottom");
var smallTop = document.getElementById("smallTop");

document.addEventListener("keydown", function (e) {
	var drop = document.getElementById("layouts");
	if (drop.options[drop.selectedIndex].label == "calcLayout") {
		var numLength = bigBottom.innerHTML.length;
		var numOnly = /[0-9]/;
		var mathOps = /\/|\*|\-|\+/;
		
		// (For below IF statement) After hitting ENTER and displaying the answer in the screen, clear the screen when you start entering numbers again.
		if (calcResult == "" && numOnly.test(e.key)) {
			/********************
				I WANT TO SEE ABOUT PREVENTING OTHER BUTTONS LIKE "CTRL" FROM ACTIVATING THIS
			********************/
			bigBottom.innerHTML = "";
		} else if (bigBottom.classList.contains("tempOp") && (!isNaN(parseInt(e.key)) || (bigBottom.innerHTML == "0" && smallTop.innerHTML == ""))) {
			// The "!isNaN(parseInt(e.key)" part parses the keyboard input and tests if it's not NaN. Numbers will result in a number which isn't NaN. Everything else will result in NaN.
			bigBottom.removeAttribute("class");
			bigBottom.innerHTML = "";
		}
		
		switch (e.key) {
			case "Enter":
				equal();
				break;
			case "%":
				percent();
				break;
		}
		
		var key = e.key;
		var digit = /[0-9]/; // This checks for any digit (0-9)
		var operation = /[\/|\*|\-|\+]/ // This checks for either /, *. -, or + symbol
		var symbol = /[\(|\)|\.]/ // This checks for either (, ), or . symbol
		var backDel = /Backspace|Delete/ // This checks if key is equal to either "Backspace" or "Delete"
		if (displayLength(numLength,key)) {
			if (key.match(digit) !== null) {
				//bigBottom.removeAttribute("style");
				bigBottom.innerHTML += key;
				calcResult += key;
				if (bigBottom.classList.contains("tempMS")) {
					bigBottom.classList.remove("tempMS");
				}
			} else if (key.match(operation) !== null && /.$/.test(calcResult)) {
				checkOperator(key);
			} else if (key.match(symbol) !== null) {
				bigBottom.innerHTML += key;
				calcResult += key;
			} else if (key.match(backDel) !== null) {
				var backCE = document.createElement("button");
				var eKey = e.key;
				backCE.setAttribute("id", eKey);
				clearMe(backCE);
			}
			//console.log("CalcResult is: " + calcResult);
		}
	}
})

function changeLayout(e) {
	var calcLayout = document.getElementById("CalcLayout").style;
	var byteLayout = document.getElementById("ByteLayout").style;
	var tempLayout = document.getElementById("TempLayout").style;
	var gradeLayout = document.getElementById("GradeLayout").style;
	// The item in the [ ] is the indexed option item to target. The "selectedIndex" gets the index number of the selected option. You must specify the select element then grab the selectedIndex.
	switch (e.options[e.selectedIndex].label) {
		case "calcLayout":
			calcLayout.display = "block";
			byteLayout.display = "none";
			tempLayout.display = "none";
			gradeLayout.display = "none"
			break;
		case "byteLayout":
			calcLayout.display = "none";
			byteLayout.display = "block";
			tempLayout.display = "none";
			gradeLayout.display = "none"
			break;
		case "tempLayout":
			calcLayout.display = "none";
			byteLayout.display = "none";
			tempLayout.display = "block";
			gradeLayout.display = "none"
			break;
		case "gradeLayout":
			calcLayout.display = "none";
			byteLayout.display = "none";
			tempLayout.display = "none";
			gradeLayout.display = "block"
	}
}

function displayLength(length, character) {
	// Purpose of lastChar is to check if the last character of small display is an operator.
	var op = /[\/|\*|\-|\+]/;
	var num = /[0-9]/;
	var lastChar = calcResult.match(/.$/);
	var testForOp = false;
	if (lastChar !== null) {
		lastChar = calcResult.match(/.$/).toString();
		if (lastChar.match(op) !== null) {
			trueFalse = true;
			//console.log(trueFalse);
		}
	}
	if (character.match(op) !== null || testForOp) {
		return true;
	} else if (length <= 15) {
		switch (length) {
			case 13:
				bigBottom.style.fontSize = "46px";
				break;
			case 14:
				bigBottom.style.fontSize = "44px";
				break;
			case 15:
				bigBottom.style.fontSize = "41px";
				break;
		}
		return true;
	} else if (lastChar !== null) {
		if (lastChar.match(op) !== null) {
			return true;
		}
	} else {
		return false;
	}
}

function numFunc(e) {
	var numLength = bigBottom.innerHTML.length;
	var num = e.innerHTML;
	var lastChar = calcResult.match(/.$/);
	if (lastChar !== null) {
		lastChar = calcResult.match(/.$/).toString();
	}
	var op = /[\/|\*|\-|\+]/;
	// The first IF statement is used primarily if the user types in a number then gets 0 in both big and small screen. This clears that when they type another number.
	// The ELSE IF statement clears the big display if an operator was the last item that was typed.
	if (bigBottom.innerHTML == "0" && smallTop.innerHTML == "0") {
		smallTop.innerHTML = "";
		bigBottom.innerHTML = "";
	} else if (calcResult == "") {
		bigBottom.innerHTML = "";
	} else if (bigBottom.classList.contains("tempOp") && lastChar.match(op) !== null) {
		// Add "AND if the last character of calcResult is an operator" to the above statement.
		//console.log("ELSE IF in numFunc is TRUE");
		bigBottom.removeAttribute("class");
		bigBottom.innerHTML = "";
	}
	if (displayLength(numLength, e.innerHTML)) {
		bigBottom.innerHTML += num;
		calcResult += num;
		if (bigBottom.classList.contains("tempMS")) {
			bigBottom.classList.remove("tempMS");
		}
	}
	e.blur();
	//console.log("CalcResult is: " + calcResult);
}

function ops(e) {
	var numLength = bigBottom.innerHTML.length;
	
	if (e.id == "square" || e.id == "plusMinus") {
		var symbol = e.id;
		var bigDisplay = bigBottom.innerHTML;
		switch (symbol) {
			case "square":
				var inner = bigBottom.innerHTML;
				calcResult = calcResult.slice(0,-inner.length);
				calcResult += "Math.sqrt(" + inner + ")";
				bigBottom.innerHTML = "&#8730(" + inner + ")";
				break;
			case "plusMinus":
				if (Math.sign(bigDisplay) == -1) {
					var pos = Math.abs(bigDisplay);
					calcResult = calcResult.substr(0, calcResult.length - (bigBottom.innerHTML.length + 2));
					bigBottom.innerHTML = pos;
					calcResult += bigBottom.innerHTML;
				} else if (Math.sign(bigDisplay) == 1) {
					var neg = -Math.abs(bigDisplay);
					bigBottom.innerHTML = neg;
					calcResult = calcResult.substr(0, calcResult.length - 2);
					calcResult += "(" + neg + ")";
				}
				break;
		}
		return;
	}
	
	if (displayLength(numLength, e.getAttribute("value"))) {
		var symbol = /[\(|\)|\.]/
		var idName = /Divide|x|dash|plus/
		var operation = /[\/|\*|\-|\+]/
		var eHTML = e.innerHTML;
		var eValue = e.getAttribute("value");
		if (eHTML.match(symbol) !== null) {
			var paren = /[\(|\)]/;
			
			if (/\./.test(bigBottom.innerHTML) && e.id == "dot") {
				console.log("hello");
				return;
			}
			
			if (eHTML.match(paren) !== null) {
				if (smallTop.innerHTML == "" && bigBottom.innerHTML == "0") {
					bigBottom.innerHTML = eHTML;
				} else {
					bigBottom.innerHTML += eHTML;
				}
				calcResult += eHTML;
				return;
			}
			bigBottom.innerHTML += eHTML;
			calcResult += eHTML;
		} else if (eValue.match(operation) !== null) {
			checkOperator(eValue);
		} else if (e.id.match(idName) !== null) {
			if (e.id == "plus") {
				smallTop.innerHTML += bigDisplay;
				smallTop.innerHTML += "+";
				calcResult += "+";
				bigBottom.setAttribute("class", "tempOp");
				return;
			}
			smallTop.innerHTML += bigDisplay;
			smallTop.innerHTML += eValue;
			calcResult += eValue;
			bigBottom.setAttribute("class", "tempOp");
		}
		e.blur();
	}
}

function checkOperator(e) {
	var operation = /[\/|\*|\-|\+]/
	breakThis: {
		// The purpose of the IF ELSE statement below is to prevent the user from having multiple operators beside each other. Such as, if the user types 15 then type "/" then "*" then "-" then "+", the newly typed operator will replace the previous operator.
		if (bigBottom.classList.length == 0) {
			var bigDisplay = bigBottom.innerHTML;
			smallTop.innerHTML += bigDisplay;
			if (e == "/") {
				smallTop.innerHTML += "&#247;";
				calcResult += "/";
				break breakThis;
			}
			smallTop.innerHTML += e;
		} else if (e.match(operation) !== null && operation.test(calcResult)) {
			// This only executes if the user types an operator AND the last character of calcResult is an operator.
			calcResult = calcResult.replace(/.$/, "");
			if (e == "/") {
				smallTop.innerHTML = smallTop.innerHTML.replace(/.$/, "&#247;");
				calcResult += "/";
				break breakThis;
			}
			smallTop.innerHTML = smallTop.innerHTML.replace(/.$/, e);
		}
		calcResult += e;
	}
	bigBottom.setAttribute("class", "tempOp");
}

function equal() {
	if (calcResult !== "") {
		var lastChar = calcResult.match(/.$/).toString();
		var op = /[\/|\*|\-|\+]/
		if (lastChar.match(op) !== null) {
			calcResult = calcResult + bigBottom.innerHTML;
			bigBottom.removeAttribute("class");
		}
		var result = parseFloat(calcResult).toString();
		var redundant = /0{3,}|9{3,}/
		if (result.match(redundant) !== null) {
			var length = fixDecimal();
			var newResult = parseFloat(calcResult).toFixed(length).toString();
			bigBottom.innerHTML = newResult;
			smallTop.innerHTML = "";
			calcResult = "";
			return;
		}
		bigBottom.innerHTML = parseFloat(calcResult);
		smallTop.innerHTML = "";
		calcResult = "";
	}
}

function percent() {
	var numLength = bigBottom.innerHTML.length;
	if (smallTop.innerHTML == "") {
		smallTop.innerHTML = 0;
		bigBottom.innerHTML = 0;
	} else if (displayLength(numLength, e.getAttribute("value"))) {
		var small = smallTop.innerHTML;
		var removeLast = small.substring(0,small.length-1);
		var evaluation = parseFloat(removeLast).toString();
		var percent = (bigBottom.innerHTML/100).toString();
		var result = parseFloat(evaluation*percent).toString();
		
		var bigLength = bigBottom.innerHTML.length;
		calcResult = calcResult.slice(0,-bigLength);
		
		smallTop.innerHTML += result;
		bigBottom.innerHTML = result;
		calcResult += result;
	}
}

var Mem = "";
function mem(e) {
	var bigDis = bigBottom.innerHTML;
	var ID = e.id;
	var mcMR = document.getElementsByClassName("disable");
	var mButton = /M\-|M\+|MS/;
	var MCreg = /MC/;
	var i,h;
	for (i = 0; i < mcMR.length; i++) {
		if (mButton.test(ID)) {
			mcMR[i].removeAttribute("disabled");
		} else if (MCreg.test(ID)) {
			mcMR[i].setAttribute("disabled", "true");
		}
	}
	switch (e.id) {
		case "MC":
			Mem = "";
			break;
		case "MR":
			// Seal of Approval: Tested and Approved!
			calcResult = calcResult.slice(0,-bigBottom.innerHTML.length);
			calcResult += Mem;
			bigBottom.innerHTML = Mem;
			break;
		case "M+":
			Mem = (Number(bigBottom.innerHTML) + Number(Mem)).toString();
			break;
		case "M-":
			Mem = (Number(Mem) - Number(bigBottom.innerHTML)).toString();
			//Mem = (Number(bigBottom.innerHTML) - Number(Mem)).toString();
			break;
		case "MS":
			// Seal of Approval: Tested and Approved!
			Mem = bigBottom.innerHTML;
			bigBottom.setAttribute("class", "tempMS");
			calcResult = calcResult.replace(bigBottom.innerHTML, "");
			break;
	}
	if (bigBottom.classList.contains("tempOp")) {
		bigDis = "";
	}
	//console.log("Mem contents is: " + Mem);
	//console.log("CalcResult is: " + calcResult);
	e.blur();
}

function fixDecimal() {
	// Everything in this IF statement fixes the issue with the decimal amount of some math problems involving adding decimal points. For example: 0.2+0.1 = 0.3000000000000002
	// Purpose: This gets the length of the trailing decimal points then will set "toFixed()" to the number with the most trailing decimal places.
	var newResult = calcResult.replace(/\+|\-|\/|\*/g, " "); // Replace operators with spaces
	var array = newResult.split(" "); // Turn the string into an array
	var newArray = []; // Make new array for determining decimal length
	var i;
	for (i = 0; i < array.length; i++) {
		var getNum = parseFloat(array[i]).toFixed(0); // Get the number before the decimal
		var removeFront = array[i].replace(getNum, ""); // Delete this number from the string
		var removeDecimal = removeFront.replace(".", ""); // Replace the decimal with nothing
		var numLength = removeDecimal.length; // Get the length of the number
		newArray.push(numLength); // Add new number at the end of newArray.
	}
	var maxNum = Math.max.apply(null, newArray);
	return maxNum;
}

function clearMe(e) {
	if (e.id == "Delete" || e.id == "CE") {
		var bigLength = bigBottom.innerHTML.length;
		calcResult = calcResult.slice(0,-bigLength);
		bigBottom.innerHTML = "0";
	} else if (e.id == "C") {
		bigBottom.innerHTML = "0";
		smallTop.innerHTML = "";
		calcResult = "";
		bigBottom.removeAttribute("class");
	} else if (e.id == "Backspace" || e.id == "Back") {
		// The "/.$/" is a regular expression. The "$" matches the last character of the line. The "." finds any character except a newline.
		bigBottom.innerHTML = bigBottom.innerHTML.replace(/.$/, "");
		calcResult = calcResult.replace(/.$/, "");
		if (bigBottom.innerHTML == "") {
			bigBottom.innerHTML = "0";
		}
		
	}
	// blur() removes the focus from the button.
	//e.blur();
}