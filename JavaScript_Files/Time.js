document.onload = checkDate();
function startTime() {
	var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
	var pmAM = "";
	m = checkTime(m);
	if (h > 12) {
		h = h - 12;
		pmAM = "pm";
	} else {
		pmAM = "am";
	}
    document.getElementById('time').innerHTML =
    h + ":" + m + pmAM;
    var t = setTimeout(startTime, 1000);
}
function checkTime(i) {
    if (i < 10) {
		i = "0" + i
	};  // add zero in front of numbers < 10
    return i;
}
function checkDate() {
	var today = new Date();
	var month = today.getMonth();
	var day = today.getDate();
	var year = today.getFullYear();
	if (day < 10) {
		day = "0" + day;
	}
	document.getElementById("date").innerHTML = month + 1 + "/" + day + "/" + year;
	var t = setTimeout(checkDate, 21600000);
}