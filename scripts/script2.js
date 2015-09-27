var x1min = -5;
var x1max = 15;
var x2min = -15;
var x2max = 35;
var yMax = 230;
var yMin = 130;
var m = 5;	//кількість дослідів y за однієї і тієї ж комбінації факторів
var n = 3;	//кількість точок плану (рядків матриці планування)
var k;
var y;
var X =[[-1, 1, -1], [-1, -1, 1]];
var p = 0.9;
var tableFlag;
var rows = 4;
var cells = 3 + m;
var table     = document.getElementById("table2");
var tableBody = document.createElement("tbody");
var valueOfCritRomanovsky=[[1.73, 2.16, 2.43, 2.62, 2.75, 2.9],
							[1.72, 2.13, 2.37, 2.54, 2.66, 2.8],
							[1.71, 2.10, 2.27, 2.41, 2.52, 2.64],
							[1.69, 2.00, 2.17, 2.29, 2.39, 2.49]];

onLoad();

function onLoad(){
	tableFlag = false;
	document.getElementById(p).className = "btn btn-success";
	main();	
}

function main(){
	fillMatrixY(yMin, yMax);
	dispersion();
}

function fillMatrixY(yMin, yMax){
	y = new Array(n);
	//*
	for (var i = 0; i < y.length; i++){
		y[i] = new Array(m);
		for (var j = 0; j < y[i].length; j++){
			y[i][j] = Math.random() * (yMax - yMin) + yMin;
		}
	}
	/*/
	y[0] = [9.0,  10.0,  11.0,  15.0,  9.0];
	y[1] = [15.0,  14.0,  10.0,  12.0,  14.0];
	y[2] = [20.0,  18.0,  12.0,  10.0,  16.0];//*/
}

//Перевірка однорідністі дисперсії за критерієм Романовського:
function dispersion(){
	k = new Array(n);		//середнє значення функції відгуку в рядку
	var sigma = new Array(n);	//дисперсії по рядках
	var sigmauv = new Array(n);
	var Fuv = new Array(n);
	var Ruv = new Array(n);

	//Знайдемо середнє значення функції відгуку в рядку: 
	for (var i = 0; i < k.length; i++){
		k[i] = 0;
		for (var j = 0; j < y[i].length; j++){
			k[i] += y[i][j];
		}
		k[i] = k[i] / m;
		console.log("k" + i + " = " + k[i]);
	}
	fillTable();

	//Знайдемо дисперсії по рядках: 
	for (var i = 0; i < sigma.length; i++){
		sigma[i] = 0;
		for (var j = 0; j < y[i].length; j++){
			sigma[i] += Math.pow(y[i][j] - k[i], 2);
			console.log("Math.pow(" + y[i][j] + " - " + k[i] + ", 2) = " + Math.pow(y[i][j] - k[i], 2));
		}
		sigma[i] = sigma[i] / m;
		console.log("sigma" + i + " = " + sigma[i]);
	}

	//Обчислимо основне відхилення: 
	var mainDeviation = Math.sqrt((2 * ((2 * m) - 2))/(m * (m - 4)));

	console.log("mainDeviation = " + mainDeviation);
	
	sigma[0] < sigma[1] ? Fuv[0] = sigma[1] / sigma[0] : Fuv[0] = sigma[0] / sigma[1];
	sigma[0] < sigma[2] ? Fuv[1] = sigma[2] / sigma[0] : Fuv[1] = sigma[0] / sigma[2];
	sigma[2] < sigma[1] ? Fuv[2] = sigma[1] / sigma[2] : Fuv[2] = sigma[2] / sigma[1];


	console.log("Fuv 0 = " + Fuv [0]);
	console.log("Fuv 1 = " + Fuv [1]);
	console.log("Fuv 2 = " + Fuv [2]);

	sigmauv[0] = ((m - 2)/m) * Fuv[0];
	sigmauv[1] = ((m - 2)/m) * Fuv[1];
	sigmauv[2] = ((m - 2)/m) * Fuv[2];

	console.log("sigmauv 0 = " + sigmauv [0]);
	console.log("sigmauv 1 = " + sigmauv [1]);
	console.log("sigmauv 2 = " + sigmauv [2]);

	Ruv[0] = Math.abs(sigmauv[0] - 1) / mainDeviation;
	Ruv[1] = Math.abs(sigmauv[1] - 1) / mainDeviation;
	Ruv[2] = Math.abs(sigmauv[2] - 1) / mainDeviation;
	
	var index1;
	var index2;
	if(m <= 2){
		index1 = 0
	} else if (m <= 6){
		index1 = 1
	} else if (m <= 8){
		index1 = 2
	} else if (m <= 10){
		index1 = 3
	} else if (m <= 12){
		index1 = 4
	} else if (m <= 15){
		index1 = 5
	}
	switch (p){
		case 0.99: index2 = 0; break;
		case 0.98: index2 = 1; break;
		case 0.95: index2 = 2; break;
		case 0.90: index2 = 3; break;
	}
	var Rkp = valueOfCritRomanovsky[index2][index1];
	console.log("================================");
	console.log(Rkp);
	console.log("================================");

	console.log("Ruv0 = " + Ruv[0]);
	console.log("Ruv1 = " + Ruv[1]);
	console.log("Ruv2 = " + Ruv[2]);
	console.log("Rkp = " + Rkp);

	if (Ruv[0] < Rkp && Ruv[1] < Rkp && Ruv[2] < Rkp){
		//дисперсія однорідна
		NormRegressionCoef();
	} else {
		m = m + 1;
		console.log("дисперсія не однорідна");
		//main();
	}
}

//Розрахунок нормованих коефіцієнтів рівняння регресії:
function NormRegressionCoef(){
	console.log("NormRegressionCoef()");
	var mx1 = (X[0][0] + X[0][1] + X[0][2]) / 3;
	var mx2 = (X[1][0] + X[1][1] + X[1][2]) / 3;

	var my = (k[0] + k[1] + k[2]) / 3;

	console.log("mx1: " + mx1);
	console.log("mx2: " + mx2);
	console.log("my:  " + my);


	var a1 = (Math.pow(X[0][0], 2) + Math.pow(X[0][1], 2) + Math.pow(X[0][2], 2)) / 3;
	var a2 = (X[0][0] * X[1][0] + X[0][1] * X[1][1] + X[0][2] * X[1][2]) / 3
	var a3 = (Math.pow(X[1][0], 2) + Math.pow(X[1][1], 2) + Math.pow(X[1][2], 2)) / 3;

	var a11 = (X[0][0] * k[0] + X[0][1] * k[1] + X[0][2] * k[2]) / 3;
	var a22 = (X[1][0] * k[0] + X[1][1] * k[1] + X[1][2] * k[2]) / 3;

	console.log("a1: " + a1);
	console.log("a2: " + a2);
	console.log("a3:  " + a3);
	console.log("a11: " + a11);
	console.log("a22:  " + a22);

	var matrixB01 = math.matrix([[my,  mx1, mx2],
							     [a11, a1,  a2],
							     [a22, a2,  a3]]);
	var matrixB02 = math.matrix([[1,   mx1, mx2],
							     [mx1, a1,  a2],
							     [mx2, a2,  a3]]);

	var matrixB11 = math.matrix([[1,   my,  mx2],
							     [mx1, a11, a2],
							     [mx2, a22, a3]]);
	var matrixB12 = math.matrix([[1,   mx1, mx2],
							     [mx1, a1,  a2],
							     [mx2, a2,  a3]]);

	var matrixB21 = math.matrix([[1,  mx1,  my],
							     [mx1, a1,  a11],
							     [mx2, a2,  a22]]);
	var matrixB22 = math.matrix([[1,  mx1,  mx2],
							     [mx1, a1,  a2],
							     [mx2, a2,  a3]]);

	var matrixCheck = math.matrix([[1,2],[3,4]]);
	console.log(math.det(matrixCheck));

	var b0 = math.det(matrixB01) / math.det(matrixB02);
	var b1 = math.det(matrixB11) / math.det(matrixB12);
	var b2 = math.det(matrixB21) / math.det(matrixB22);
	//var X =[[-1, 1, -1], [-1, -1, 1]];
	var check1 = b0 - b1 - b2;
	var check2 = b0 + b1 - b2;
	var check3 = b0 - b1 + b2;
	console.log(check1 + " / " + check2 + " / " + check3 );

	//Проведемо натуралізацію коефіцієнтів:
	var deltaX1 = Math.abs(x1max - x1min) / 2;
	var deltaX2 = Math.abs(x2max - x2min) / 2;

	var x10 = (x1max + x1min) / 2;
	var x20 = (x2max + x2min) / 2;

	var a0 = b0 - (b1*x10/deltaX1) - (b2*x20/deltaX2);
	var a1 = b1 / deltaX1;
	var a2 = b2 / deltaX2;

	var natY = new Array(n);
    natY[0] = a0 + a1*x1min + a2*x2min;
    natY[1] = a0 + a1*x1max + a2*x2min;
    natY[2] = a0 + a1*x1min + a2*x2max;
    console.log(natY[0]);
    console.log(natY[1]);
    console.log(natY[2]);
    
}

function pChange(newP){
	document.getElementById(p).className = "btn btn-default";
	document.getElementById(newP).className = "btn btn-success";
	p = newP;
	main();
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
			if(i < 2 && j > 0 ){
				cellText = document.createTextNode(X[i][j-1]);
				cell.classList.add('cellHighlight3');
			}
			if(i < 2 && j === 0){
				cellText = document.createTextNode("X"+(i+1));
			}
			if(i >= 2 && j === 0 && i < (2 + m)){
				cellText = document.createTextNode("Y"+(i-1));
			}
			if(i >= 2 && j > 0 && i < (2 + m)){
				cellText = document.createTextNode(y[j-1][i-2].toFixed(3));
				cell.classList.add('cellHighlight2');
			}
			if(i === (cells -1) && j === 0){
				cellText = document.createTextNode("середнє значення");
			}
			if(i === (cells -1) && j > 0){
				cellText = document.createTextNode(k[j-1].toFixed(3));
				cell.classList.add('cellHighlight');
			}
			cell.appendChild(cellText);
			row.appendChild(cell);
		}
		if (j === 0){
			row.classList.add('headTable');
		}
		tableBody.appendChild(row);
	}
	table.appendChild(tableBody);
	//body.appendChild(table); 
	tableFlag = true;
}