var temp = document.getElementsByClassName("temperature");
var tempLayout = document.getElementById("TempLayout");
var tempDrop = document.getElementsByClassName("dropDown");
var activeTemp;
var convertTemp = "C to F";
var i, x;

for (i = 0; i < temp.length; i++) {
	temp[i].addEventListener("click", function(e) {
		for (x = 0; x < temp.length; x++) {
			temp[x].classList.remove("activeTemp");
		}
		e.path[0].classList.add("activeTemp");
	});
}

function checkActive() {
	activeTemp = document.getElementsByClassName("activeTemp")[0];
}

function change() {
	if (activeTemp == temp[0]) {
		convertTemp = tempDrop[0].selectedOptions[0].value + " to " + tempDrop[1].selectedOptions[0].value;
	} else {
		convertTemp = tempDrop[1].selectedOptions[0].value + " to " + tempDrop[0].selectedOptions[0].value;
	}
	
	calcTemp();
}

document.addEventListener("keydown", function (e) {
	if (tempLayout.style.display == "block") {
		var reg = /\.|\d+/;
		
		if (e.key == "Backspace") {
			erase();
		} else if (e.key == "Delete") {
			clearAll();
		}
		
		if (reg.test(e.key)) {
			tempNum(e.key);
		}
		
		calcTemp();
	}
});

function tempNum(num) {
	checkActive();
	
	if (num == "." && /\./.test(activeTemp.innerHTML)) {
		return;
	}
	
	if (activeTemp.innerHTML == 0) {
		activeTemp.innerHTML = num;
	} else {
		activeTemp.innerHTML += num;
	}
	
	calcTemp();
}

function clearAll() {
	checkActive();
	
	activeTemp.innerHTML = 0;
	
	calcTemp();
}

function erase() {
	checkActive();
	
	var str = activeTemp.innerHTML;
	
	if (str.length == 1 || (/\-/.test(activeTemp.innerHTML) && str.length == 2)) {
		activeTemp.innerHTML = 0;
	} else {
		if (str.substr(str.length - 2, 1) == ".") {
			activeTemp.innerHTML = str.substr(0, str.length - 2);
		} else {
			activeTemp.innerHTML = str.substr(0, str.length - 1);
		}
	}
	
	calcTemp();
}

function calcTemp() {
	checkActive();
	
	var diff = tempDrop[0].selectedIndex - tempDrop[1].selectedIndex;
	var num2Convert = activeTemp.innerHTML;
	var secondNum, newNum;
	
	if (activeTemp == temp[1]) {
		secondNum = temp[0];
	} else {
		secondNum = temp[1];
	}
	
	if (diff == 0) {
		secondNum.innerHTML = activeTemp.innerHTML;
		return;
	}
	
	switch (convertTemp) {
		case "C to F":
			// C => F		(C * 1.8) + 32
			newNum = ((parseFloat(num2Convert) * 1.8) + 32).toFixed(2);
			break;
		case "C to K":
			// C => K		C + 273.15
			newNum = (parseFloat(num2Convert) + 273.15).toFixed(2);
			break;
		case "F to C":
			// F => C		(F - 32) / 1.8
			newNum = ((parseFloat(num2Convert) - 32) / 1.8).toFixed(2);
			break;
		case "F to K":
			// F => K		((F - 32) / 1.8) + 273.15
			newNum = (((parseFloat(num2Convert) - 32) / 1.8) + 273.15).toFixed(2);
			break;
		case "K to F":
			// K => F		((K - 273.15) * 1.8) + 32
			newNum = (((parseFloat(num2Convert) - 273.15) * 1.8) + 32).toFixed(2);
			break;
		case "K to C":
			// K => C		K - 273.15
			newNum = (parseFloat(num2Convert) - 273.15).toFixed(2);
			break;
	}
	
	secondNum.innerHTML = Math.round(newNum * 100) / 100;
}

function changePos() {
	checkActive();
	
	var str = activeTemp.innerHTML;
	
	if (str == 0) {
		return;
	}
	
	if (str > 0) {
		activeTemp.innerHTML = "-" + str;
	} else {
		activeTemp.innerHTML = str.substr(1, str.length);
	}
	
	calcTemp();
}