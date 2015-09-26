var x1min = -5;
var x1max = 15;
var x2min = -15;
var x2max = 35;
var yMax = 230;
var yMin = 130;
var m = 5;		//кількість дослідів
var y = new Array(m);
var k = new Array(3);		//середнє значення функції відгуку в рядку
var sigma = new Array(3);	//дисперсії по рядках
var sigmauv = new Array(3);
var Fuv = new Array(3);
var X =[[-1, 1, -1], [-1, -1, 1]]

function createArraysY(){
	for (var i = 0; i < y.length; i++){
		y[i] = new Array(3);
	}
}

function fillMatrixY(yMin, yMax){
	createArraysY();
	for (var j = 0; j < y.length; j++){
		for (var i = 0; i < y[j].length; i++){
			y[j][i] = Math.random() * (yMax - yMin) + yMin;
		}
	}
}

//Перевірка однорідністі дисперсії за критерієм Романовського:
function dispersion(){
	//Знайдемо середнє значення функції відгуку в рядку: 
	for (var i = 0; i < k.length; i++){
		for (var j = 0; j < y.length; j++){
			k[i] += y[j][i];
		}
		k[i] = k[i] / 5;
	}

	//Знайдемо дисперсії по рядках: 
	for (var i = 0; i < sigma.length; i++){
		for (var j = 0; j < y.length; j++){
			sigma[i] = Math.pow(y[i][j] - k[i], 2);
		}
		sigma[i] = sigma[i] / 5;
	}

	//Обчислимо основне відхилення: 
	var mainDeviation = Math.sqrt((2 * (2 * m - 2))/(m * (m - 4)));
	
	Fuv[0] = sigma[0] / sigma[1];
	Fuv[1] = sigma[2] / sigma[0];
	Fuv[2] = sigma[2] / sigma[1];

	sigmauv[0] = (m - 2/m) * Fuv[0];
	sigmauv[1] = (m - 2/m) * Fuv[1];
	sigmauv[2] = (m - 2/m) * Fuv[2];

	Ruv[0] = Math.abs(sigmauv[0] - 1) / mainDeviation;
	Ruv[1] = Math.abs(sigmauv[1] - 1) / mainDeviation;
	Ruv[2] = Math.abs(sigmauv[2] - 1) / mainDeviation;
	
	var Rkp = 2;
	var p = 0.9;

	if (Ruv[0] < Rkp && Ruv[1] < Rkp && Ruv[2] < Rkp){
		//дисперсія однорідна
		NormRegressionCoef();
	} else {
		m = m + 1;
	}
}

//Розрахунок нормованих коефіцієнтів рівняння регресії:
function NormRegressionCoef(){
	var mx1 = (X[0][0] + X[0][1] + X[0][2]) / 3;
	var mx2 = (X[1][0] + X[1][1] + X[1][2]) / 3;

	var my = (k[0] + k[1] + k[2]) / 3;

	var a1 = Math.pow(X[0][0], 2) + Math.pow(X[0][1], 2) + Math.pow(X[0][2], 2);
	var a2 = Math.pow(X[1][0], 2) + Math.pow(X[1][1], 2) + Math.pow(X[1][2], 2);
	var a3 = Math.pow(X[2][0], 2) + Math.pow(X[2][1], 2) + Math.pow(X[2][2], 2);

	var a11 = (X[0][0] * k[0] + X[0][1] * k[1] + X[0][2] * k[2]) / 3;
	var a22 = (X[1][0] * k[0] + X[1][1] * k[1] + X[1][2] * k[2]) / 3;

	var aa = ((my * a1 * a3) + (mx1 * a2 * a22) + (a11 * mx2 * a2)) - ((a22 * a1 * mx2) + (a11 * mx1 * a3) + (a2 * a2 * my));
	var bb = ((my * a1 * a3) + (mx1 * a2 * a22) + (a11 * mx2 * a2)) - ((a22 * a1 * mx2) + (a11 * mx1 * a3) + (a2 * a2 * my));
}