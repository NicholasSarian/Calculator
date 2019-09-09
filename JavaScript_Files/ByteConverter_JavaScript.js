var from = document.getElementById("fromDrop");
var to = document.getElementById("toDrop");
var resultField = document.getElementById("result");
var byteNum = document.getElementById("byte");

function validateByte(event) {
	// Try to get the thingy to accept only one decimal. Consider using a flag
	
	var num = /^\d+|\.$/;
	
	if (event.key == "." && /\./.test(byteNum.value)) {
		event.preventDefault();
	} else if (event.key == "." && byteNum.value == "") {
		event.preventDefault();
	}
	
	if (num.test(event.key)) {
		//console.log("Key is either number or decimal");
		if (byteNum.value == 0 && event.key !== "0") {
			byteNum.value = "";
		}
		return;
	} else {
		//console.log("Key is neither number nor decimal");
		event.preventDefault();
	}
}

function calcByte() {
	if (byteNum.value !== "") {
		var diff = from.selectedIndex - to.selectedIndex;
		var result, sizeUnit;
		
		/* Both dropdowns are similar. The below calculates based on how far apart the selected options are compared to their location in the dropdown. If the difference is -5, that means the FROM field is smaller than the TO field. If the difference is 5, the FROM field is bigger than the TO field. All numbers in between range in a difference between -4 and 4. */
		switch (diff) {
			case -5:
				result = byteNum.value / Math.pow(1024, 5);
				break;
			case -4:
				result = byteNum.value / Math.pow(1024, 4);
				break;
			case -3:
				result = byteNum.value / Math.pow(1024, 3);
				break;
			case -2:
				result = byteNum.value / Math.pow(1024, 2);
				break;
			case -1:
				result = byteNum.value / 1024;
				break;
			case 0:
				result = byteNum.value;
				break;
			case 1:
				result = byteNum.value * 1024;
				break;
			case 2:
				result = byteNum.value * Math.pow(1024, 2);;
				break;
			case 3:
				result = byteNum.value * Math.pow(1024, 3);
				break;
			case 4:
				result = byteNum.value * Math.pow(1024, 4);
				break;
			case 5:
				result = byteNum.value * Math.pow(1024, 5);
				break;
		}
		
		switch (to.selectedIndex) {
			case 0:
				sizeUnit = " B";
				break;
			case 1:
				sizeUnit = " KB";
				break;
			case 2:
				sizeUnit = " MB";
				break;
			case 3:
				sizeUnit = " GB";
				break;
			case 4:
				sizeUnit = " TB";
				break;
			case 5:
				sizeUnit = " PB";
				break;
		}
		
		var reg = /\e/;
		
		if (result == 0) {
			resultField.innerHTML = 0 + sizeUnit;
		} else if (reg.test(result)) {
			resultField.innerHTML = result.toExponential(7) + sizeUnit;
		} else {
			resultField.innerHTML = (Math.round(result * 100) / 100) + sizeUnit;
		}
	} else {
		alert("You must type in a number");
	}
}