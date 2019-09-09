function changeCalc(e) {
	var points = document.getElementById("pointGrade");
	var percent = document.getElementById("percentGrade");
	var average = document.getElementById("gradeAverage");
	var pointButton = document.getElementById("points");
	var percentButton = document.getElementById("percents");
	var averageButton = document.getElementById("average");
	if (e.id == "points") {
		points.style.display = "block";
		percent.style.display = "none";
		average.style.display = "none";
		pointButton.classList.add("active");
		percentButton.removeAttribute("class");
		averageButton.removeAttribute("class");
	} else if (e.id == "percents") {
		points.style.display = "none";
		percent.style.display = "block";
		average.style.display = "none";
		pointButton.removeAttribute("class");
		percentButton.classList.add("active");
		averageButton.removeAttribute("class");
	} else {
		points.style.display = "none";
		percent.style.display = "none";
		average.style.display = "block";
		pointButton.removeAttribute("class");
		percentButton.removeAttribute("class");
		averageButton.classList.add("active");
	}
}

function validate(e) {
	if (document.getElementById("GradeLayout").style.display == "block") {
		var backDelete = /Backspace|Delete|ArrowLeft|ArrowRight/
		if (e.key.match(backDelete) !== null) {
			return;
		}
		var	input = document.activeElement.value,
			dotLength = /\./g,
			regEx = /^\d+$|\.|Backspace|Delete|ArrowLeft|ArrowRight/,
			hundredCheck = e.key.match(/[0-9]/) ? input + e.key : "0" + input;
		if (hundredCheck.match(/^./) == "0" || hundredCheck.match(/^./) == ".") {
			hundredCheck = hundredCheck.replace(/^./, "");
		}
		if (e.key.match(regEx) !== null) {
			if (input == "") {
				if (!e.key.match(/\./) && !/0/.test(e.key)) {
					return;
				} else if (e.key.match(/0/) !== null) {
					if (document.activeElement.classList == "average") {
						return;
					} else {
						e.preventDefault();
					}
				}
				e.preventDefault();
			} else {
				if (window.getSelection().toString() !== "") {
					return;
				}
				if (document.activeElement.classList == "average" && input.match(/0/) !== null) {
					if (input.match(/0/).length == 1) {
						e.preventDefault();
					}
				}
				if (/\./.test(input)) {
					var array = input.split(".");
					if ((array[1] + e.key).length > 2) {
						e.preventDefault();
					}
				}
				if (!input.match(dotLength) || !e.key.match(/\./)) {
					if (eval(hundredCheck) >= 100) {
						document.activeElement.value = "100";
						e.preventDefault();
					}
					return;
				}
				e.preventDefault();
			}
		}
		e.preventDefault();
	}
}

function validation(e) {
	var num = /[0-9]|Backspace|Delete|ArrowLeft|ArrowRight/;
	if (document.activeElement.value == "" && /0/.test(e.key)) {
		e.preventDefault();
	} else if (/Backspace|Delete|ArrowLeft|ArrowRight/.test(e.key) || num.test(e.key) && eval(document.activeElement.value.length) < 3 || window.getSelection().toString() !== "") {
		return;
	} else {
		e.preventDefault();
	}
}

function resetFields(e) {
	var i, h, gradeWeight, display, parentEle, childEle;
	if (e.parentNode.parentNode.id == "pointGrade") {
		gradeWeight = document.querySelectorAll(".points, .totalPoints");
		display = document.querySelectorAll("#totalGrade, #pointLetter");
		parentEle = document.querySelector("#pointField");
		childEle = parentEle.querySelectorAll(".titles, .points, .totalPoints, br");
	} else if (e.parentNode.parentNode.id == "percentGrade") {
		gradeWeight = document.querySelectorAll(".grade, .weight");
		display = document.querySelectorAll("#averageGrade, #averageLetter");
		parentEle = document.querySelector("#fields");
		childEle = parentEle.querySelectorAll(".titles, .grade, .weight, br");
	} else {
		gradeWeight = document.querySelectorAll(".average");
		display = document.querySelectorAll("#avgGrade, #avgLetter");
		parentEle = document.querySelector("#averageField");
		childEle = parentEle.querySelectorAll(".titles, .average, br");
	}
	var totalLength = childEle.length;
	
	for (i = 0; i < gradeWeight.length; i++) {
		gradeWeight[i].value = "";
		if (i < 2) {
			display[i].innerHTML = "";
		}
	}
	if (totalLength > 32 || (e.parentNode.parentNode.id == "gradeAverage" && totalLength > 24)) {
		if (e.parentNode.parentNode.id == "gradeAverage") {
			for (h = 24; h < totalLength; h++) {
				childEle[h].parentNode.removeChild(childEle[h]);
			}
		} else {
			for (h = 32; h < totalLength; h++) {
				childEle[h].parentNode.removeChild(childEle[h]);
			}
		}
	}
}
		
function addRow(e) {
	var classOne, classTwo, tab, title, clickEvent;
	if (e.parentNode.parentNode.id == "pointGrade") {
		title = document.getElementById("pointField").getElementsByClassName("titles");
		tab = "pointGrade";
		classOne = "points";
		classTwo = "totalPoints";
		clickEvent = "validation(event)";
	} else if (e.parentNode.parentNode.id == "percentGrade") {
		title = document.getElementById("fields").getElementsByClassName("titles");
		tab = "percentGrade";
		classOne = "grade";
		classTwo = "weight";
		clickEvent = "validate(event)";
	} else {
		title = document.getElementById("averageField").getElementsByClassName("titles");
		tab = "averageGrade";
		classOne = "average";
		clickEvent = "validate(event)";
	}
	
	var lastTitle = title[title.length -1];
	var field = document.getElementById("fields");
	var pointField = document.getElementById("pointField");
	var averageField = document.getElementById("averageField");
	
	var newTitle = document.createElement("span");
	newTitle.setAttribute("class", "titles");
	newTitle.innerHTML = eval(lastTitle.innerHTML) + 1;
	
	var gradeInput = document.createElement("input");
	gradeInput.setAttribute("class", classOne);
	if (e.parentNode.parentNode.id == "gradeAverage") {
		gradeInput.setAttribute("style", "width: 272px");
	}
	gradeInput.setAttribute("onkeydown", clickEvent);
	
	if (!(e.parentNode.parentNode.id == "gradeAverage")) {
		var weightInput = document.createElement("input");
		weightInput.setAttribute("class", classTwo);
		weightInput.setAttribute("onkeydown", clickEvent);
	}
	var br = document.createElement("br");
	
	if (tab == "percentGrade") {
		field.append(newTitle);
		field.append(gradeInput);
		field.append(weightInput);
		field.append(br);
	} else if (tab == "pointGrade") {
		pointField.append(newTitle);
		pointField.append(gradeInput);
		pointField.append(weightInput);
		pointField.append(br);
	} else {
		averageField.append(newTitle);
		averageField.append(gradeInput);
		averageField.append(br);
	}
}

function calcPointGrade() {
	var	theGrade = 0,
		totalPoints = 0,
		earnedPoints = 0,
		i,
		earned = document.getElementsByClassName("points"),
		total = document.getElementsByClassName("totalPoints"),
		length = earned.length + total.length,
		grade = document.getElementById("totalGrade"),
		letterGrade = document.getElementById("pointLetter");
	for (i = 0; i < length; i++) {
		if (earned[i].value == "" || total[i].value == "") {
			if (earned[0].value == "" || total[0].value == "") {
				alert("You must enter at least one grade and weight");
				return;
			} else {
				break;
			}
		}
		earnedPoints = eval(earnedPoints) + eval(earned[i].value);
		totalPoints =  eval(totalPoints) +  eval(total[i].value);
	}
	theGrade = (earnedPoints / totalPoints) * 100;
	var letter = getGradeLetter(theGrade);
	grade.innerHTML = theGrade.toFixed(2) + "%";
	letterGrade.innerHTML = letter;
}
		
function calcGrade() {
	var	gradeXWeight = 0,
		totalWeight = 0,
		finalGrade = 0,
		i,
		grade = document.getElementsByClassName("grade"),
		weight = document.getElementsByClassName("weight"),
		length = grade.length + weight.length,
		avgGrade = document.getElementById("averageGrade"),
		avgLetter = document.getElementById("averageLetter");
	// In the FOR loop, continue the loop and once I get a value that's "undefined", break the loop.
	for (i = 0; i < length; i++) {
		if (grade[i].value == "" || weight[i].value == "") {
			if (grade[0].value == "" || weight[0].value == "") {
				alert("You must enter at least one grade and weight");
				return;
			} else {
				break;
			}
		}
		var result = grade[i].value * weight[i].value;
		gradeXWeight += result;
		totalWeight += eval(weight[i].value);
	}
	finalGrade = gradeXWeight / totalWeight;
	var letter = getGradeLetter(finalGrade);
	avgGrade.innerHTML = finalGrade.toFixed(2) + "%";
	avgLetter.innerHTML = letter;
}

function calcAverage() {
	var gradeSum = 0,
		amountOfGrades = 0,
		yourGrade = 0,
		i,
		avgInput = document.getElementsByClassName("average"),
		avgGrade = document.getElementById("avgGrade"),
		avgLetter = document.getElementById("avgLetter");
	for (i = 0; i < avgInput.length; i++) {
		if (avgInput[i].value == "") {
			if (avgInput[0].value == "") {
				alert("You must enter at least one grade");
				return;
			} else {
				break;
			}
		}
		gradeSum = eval(gradeSum) + eval(avgInput[i].value);
		amountOfGrades++;
	}
	yourGrade = gradeSum / amountOfGrades;
	var letter = getGradeLetter(yourGrade);
	avgGrade.innerHTML = yourGrade.toFixed(2) + "%";
	avgLetter.innerHTML = letter;
}

function getGradeLetter(value) {
	switch (true) {
		case (value >= 93):
			return "A";
		case (value >= 90):
			return "A-";
		case (value >= 87):
			return "B+";
		case (value >= 83):
			return "B";
		case (value >= 80):
			return "B-";
		case (value >= 77):
			return "C+";
		case (value >= 73):
			return "C";
		case (value >= 70):
			return "C-";
		case (value >= 67):
			return "D+";
		case (value >= 63):
			return "D";
		case (value >= 60):
			return "D-";
		case (value < 60):
			return "F";
	}
}