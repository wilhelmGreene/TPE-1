var rows = 11; 
var cells = 9;

var a0, a1, a2, a3, lower, upper
var x01, x02, x03, dx1, dx2, dx3
var firstFactor = new Array(8);
var secondFactor = new Array(8);
var thirdFactor = new Array(8);
var responseFunc = new Array(8);
var responseFuncEtalon;
var firstFactorNormalised = new Array(8);
var secondFactorNormalised = new Array(8);
var thirdFactorNormalised = new Array(8);
var tableFlag, factorFlag;

var answerRow;

//var body = document.getElementById("divTable");
var table     = document.getElementById("table1");
var tableBody = document.createElement("tbody");
var captions = ["№", "X1", "X2", "X3", "Y", " ", "XH1", "XH2", "XH3"];

onLoad();

function onLoad(){
	tableFlag = false;
	factorFlag = false;
	console.log("loaded");
}

function generateBtn(){
	factorFlag = false;
	regressionCoef();
}

function regressionCoef(){
	a0 = parseFloat(document.getElementById("firstParam").value);
	a1 = parseFloat(document.getElementById("secondParam").value);
	a2 = parseFloat(document.getElementById("thirdParam").value);
	a3 = parseFloat(document.getElementById("fourthParam").value);
	!isNaN(a0) ? document.getElementById("a0").innerHTML = a0 : document.getElementById("a0").innerHTML = "a<sub>0</sub>"; 
	!isNaN(a1) ? document.getElementById("a1").innerHTML = a1 : document.getElementById("a1").innerHTML = "a<sub>1</sub>";
	!isNaN(a2) ? document.getElementById("a2").innerHTML = a2 : document.getElementById("a2").innerHTML = "a<sub>2</sub>";
	!isNaN(a3) ? document.getElementById("a3").innerHTML = a3 : document.getElementById("a3").innerHTML = "a<sub>3</sub>";
	lower = parseFloat(document.getElementById("lowerLimit").value);
	upper = parseFloat(document.getElementById("upperLimit").value);
	if (!isNaN(a0) && !isNaN(a1) && !isNaN(a2) && !isNaN(a3)){
		if (!isNaN(lower) && !isNaN(upper)) {
			generateFactors(lower, upper);
		} else if (isNaN(lower) && !isNaN(upper)){
			generateFactors(0, upper);
		} else if (!isNaN(lower) && isNaN(upper)){
			generateFactors(lower, 20);
		} else if (isNaN(lower) && isNaN(upper)){
			generateFactors(0, 20);
		}
	}
}

function generateFactors(min, max){
	if (!factorFlag){
		for (var i = 0; i < firstFactor.length; i++){
			firstFactor[i] = Math.random() * (max - min) + min;
			secondFactor[i] = Math.random() * (max - min) + min;
			thirdFactor[i] = Math.random() * (max - min) + min;
		}
		factorFlag = true;
	}
	//responseFunction:
	for (var i = 0; i < responseFunc.length; i++){
			responseFunc[i] = a0 + (a1 * firstFactor[i]) + (a2 * secondFactor[i]) + (a3 * thirdFactor[i]);
	}
	normalised(min, max);
	fillTable();
}

function normalised(min, max){
	var max1 = min;
	var max2 = min;
	var max3 = min;
	var min1 = max;
	var min2 = max;
	var min3 = max
	for (var i = 0; i < firstFactor.length; i++){
		if (firstFactor[i] > max1){
			max1 = firstFactor[i];
		}
		if (secondFactor[i] > max2){
			max2 = secondFactor[i];
		}
		if (thirdFactor[i] > max3){
			max3 = thirdFactor[i];
		}
		if (firstFactor[i] < min1){
			min1 = firstFactor[i];
		}
		if (secondFactor[i] < min2){
			min2 = secondFactor[i];
		}
		if (thirdFactor[i] < min3){
			min3 = thirdFactor[i];
		}
	}

	x01 = (max1 + min1) / 2;
	x02 = (max2 + min2) / 2;
	x03 = (max3 + min3) / 2;
	dx1 = x01 - min1;
	dx2 = x02 - min2;
	dx3 = x03 - min3;

	responseFuncEtalon = a0 + (a1 * x01) + (a2 * x02) + (a3 * x03);
	document.getElementById('etalon').innerHTML = responseFuncEtalon.toFixed(3);

	var answer = Infinity
	for (var i = 0; i < responseFunc.length; i++){
		if (responseFunc[i] < answer){
			answer = responseFunc[i];
		}
	}

	for (var i = 0; i < responseFunc.length; i++){
		if (responseFunc[i] < responseFuncEtalon && responseFunc[i] > answer){
			answer = responseFunc[i];
			answerRow = i;
		}
	}
	document.getElementById('answer').innerHTML = answer.toFixed(3);
	for (var i = 0; i < firstFactorNormalised.length; i++){
		firstFactorNormalised[i] = (firstFactor[i] - x01) / dx1;
		secondFactorNormalised[i] = (secondFactor[i] - x02) / dx2;
		thirdFactorNormalised[i] = (thirdFactor[i] - x03) / dx3;
	}
}

function fillTable(){
	if (tableFlag){
		for(var j = 0; j < rows; j++) {
			table.deleteRow(0);
		}
		tableFlag = false;
	}
	for (var j = 0; j < rows; j++) {
		var row = document.createElement("tr");
		for (var i = 0; i < cells; i++){
			var cell = document.createElement("td");
			var cellText = document.createTextNode("---");
			if (j === 0){
				var cellText = document.createTextNode(captions[i]);
			} else if (i === 0 && j !== 0 && j < 9){
				var cellText = document.createTextNode(j);
			} else if (i === 5 && j !== 0){
				var cellText = document.createTextNode("|");
			} else if (j < 9 && j > 0 && i > 0 && i < 4){
				switch (i){
					case 1: var cellText = document.createTextNode(firstFactor[j-1].toFixed(3)); break
					case 2: var cellText = document.createTextNode(secondFactor[j-1].toFixed(3)); break
					case 3: var cellText = document.createTextNode(thirdFactor[j-1].toFixed(3)); break
				}
			} else if (i === 4 && j > 0 && j < 9){
				var cellText = document.createTextNode(responseFunc[j-1].toFixed(3));
			} else if (j === 9){
				switch (i){
					case 0: var cellText = document.createTextNode('x0'); break
					case 1: var cellText = document.createTextNode(x01.toFixed(3)); break
					case 2: var cellText = document.createTextNode(x02.toFixed(3)); break
					case 3: var cellText = document.createTextNode(x03.toFixed(3)); break
				}
			} else if (j === 10){
				switch (i){
					case 0: var cellText = document.createTextNode('dx'); break
					case 1: var cellText = document.createTextNode(dx1.toFixed(3)); break
					case 2: var cellText = document.createTextNode(dx2.toFixed(3)); break
					case 3: var cellText = document.createTextNode(dx3.toFixed(3)); break
				}
			} else if (j < 9 && j > 0 && i > 5){
				switch (i){
					case 6: var cellText = document.createTextNode((firstFactorNormalised[j-1]).toFixed(3)); break
					case 7: var cellText = document.createTextNode((secondFactorNormalised[j-1]).toFixed(3)); break
					case 8: var cellText = document.createTextNode((thirdFactorNormalised[j-1]).toFixed(3)); break
				}
			} 
			cell.appendChild(cellText);
			row.appendChild(cell);
		}
		if (j === (answerRow + 1 )){
			row.classList.add('success');
		}
		tableBody.appendChild(row);
	}
	table.appendChild(tableBody);
	//body.appendChild(table); 
	tableFlag = true;
}

addEventListener("keydown", function(event) {
	console.log("event");
	//-------------------------------
	//KeyCodes:
	//32 - space
	//-------------------------------
	if(event.keyCode === 32){
		generateBtn();
	}
});