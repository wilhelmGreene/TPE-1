/*var x1min = -5;
var x1max = 15;
var x2min = -15;
var x2max = 35;
var x3min = 15;
var x3max = 30;*/
var x1min = -25;
var x1max = 75;
var x2min = 5;
var x2max = 40;
var x3min = 15;
var x3max = 25;
var yMax;
var yMin;
var m = 3;	//кількість дослідів y за однієї і тієї ж комбінації факторів
var n = 4;	//кількість точок плану (рядків матриці планування)
var sb;
var b = new Array(n);
var k;
var y;
var avrY = new Array(n);
var nX =[[1, 1, 1, 1],
		[-1, -1, 1, 1],
		[-1, 1, -1, 1],
		[-1, 1, 1, -1]];
var rX = [[-25, -25, 75, 75],
		  [5, 40, 5, 40],
		  [15, 25, 25, 15]];
var checkStdnt = new Array(n);
var tableFlag;
var table     = document.getElementById("table2");
var tableBody = document.createElement("tbody");

onLoad();

function onLoad(){
	var XcpMax = (x1max + x2max + x3max) / 3;
	var XcpMin = (x1min + x2min + x3min) / 3;
	yMax = 200 + XcpMax;
	yMin = 200 + XcpMin;
	tableFlag = false;
	main();	
}

function main(){
	m = 5;
	matrixY(yMin, yMax);
}

function matrixY(yMin, yMax){
	y = new Array(n);
	//*
	for (var i = 0; i < y.length; i++){
		y[i] = new Array(m);
		for (var j = 0; j < y[i].length; j++){
			y[i][j] = Math.random() * (yMax - yMin) + yMin;
		}
	}
	/*/
	y = [[15, 18, 16],
		 [10, 19, 13],
		 [11, 14, 12],
		 [16, 19, 16]];//*/

	
	for (var i = 0; i < y.length; i++) {
		var s = 0;
		for (var j = 0; j < y[0].length; j++) {
			s += y[i][j];
		}
		avrY[i] = s / y[0].length;
	}
	var mx1 = (rX[0][0] + rX[0][1] + rX[0][2] + rX[0][3]) / n;
	var mx2 = (rX[1][0] + rX[1][1] + rX[1][2] + rX[1][3]) / n;
	var mx3 = (rX[2][0] + rX[2][1] + rX[2][2] + rX[2][3]) / n;
	var my = 0;
	for (var i = 0; i < avrY.length; i++)
		my += avrY[i];
	my = my / n;

	var a1 = (rX[0][0] * avrY[0] + rX[0][1] * avrY[1] + rX[0][2] * avrY[2] + rX[0][3] * avrY[3]) / n;
	var a2 = (rX[1][0] * avrY[0] + rX[1][1] * avrY[1] + rX[1][2] * avrY[2] + rX[1][3] * avrY[3]) / n;
	var a3 = (rX[2][0] * avrY[0] + rX[2][1] * avrY[1] + rX[2][2] * avrY[2] + rX[2][3] * avrY[3]) / n;

	var a11 = (rX[0][0] * rX[0][0] + rX[0][1] * rX[0][1] + rX[0][2] * rX[0][2] + rX[0][3] * rX[0][3]) / n;
	var a22 = (rX[1][0] * rX[1][0] + rX[1][1] * rX[1][1] + rX[1][2] * rX[1][2] + rX[1][3] * rX[1][3]) / n;
	var a33 = (rX[2][0] * rX[2][0] + rX[2][1] * rX[2][1] + rX[2][2] * rX[2][2] + rX[2][3] * rX[2][3]) / n;

	var a12 = (rX[0][0] * rX[1][0] + rX[0][1] * rX[1][1] + rX[0][2] * rX[1][2] + rX[0][3] * rX[1][3]) / n;
	var a21 = a12;
	var a13 = (rX[0][0] * rX[2][0] + rX[0][1] * rX[2][1] + rX[0][2] * rX[2][2] + rX[0][3] * rX[2][3]) / n;
	var a31 = a13;
	var a23 = (rX[1][0] * rX[2][0] + rX[1][1] * rX[2][1] + rX[1][2] * rX[2][2] + rX[1][3] * rX[2][3]) / n;
	var a32 = a23;

	var denom = math.matrix([[1, mx1, mx2, mx3],
							 [mx1, a11, a12, a13],
							 [mx2, a12, a22, a32],
							 [mx3, a13, a23, a33]]);
	var matrB0 = math.matrix([[my, mx1, mx2, mx3],
							  [a1, a11, a12, a13],
							  [a2, a12, a22, a32],
							  [a3, a13, a23, a33]]);
	var matrB1 = math.matrix([[1, my, mx2, mx3],
							  [mx1, a1, a12, a13],
							  [mx2, a2, a22, a32],
							  [mx3, a3, a23, a33]]);
	var matrB2 = math.matrix([[1, mx1, my, mx3],
							  [mx1, a11, a1, a13],
							  [mx2, a12, a2, a32],
							  [mx3, a13, a3, a33]]);
	var matrB3 = math.matrix([[1, mx1, mx2, my],
							  [mx1, a11, a12, a1],
							  [mx2, a12, a22, a2],
							  [mx3, a13, a23, a3]]);

	b[0] = math.det(matrB0) / math.det(denom);
	b[1] = math.det(matrB1) / math.det(denom);
	b[2] = math.det(matrB2) / math.det(denom);
	b[3] = math.det(matrB3) / math.det(denom);

	document.getElementById("b0").innerHTML = b[0].toFixed(3); 
	document.getElementById("b1").innerHTML = b[1].toFixed(3); 
	document.getElementById("b2").innerHTML = b[2].toFixed(3);
	document.getElementById("b3").innerHTML = b[3].toFixed(3);
	fillTable();
	
	var check1 = b[0] + b[1]*rX[0][0] + b[2]*rX[1][0] + b[3]*rX[2][0];
	var check2 = b[0] + b[1]*rX[0][1] + b[2]*rX[1][1] + b[3]*rX[2][1];
	var check3 = b[0] + b[1]*rX[0][2] + b[2]*rX[1][2] + b[3]*rX[2][2];
	var check4 = b[0] + b[1]*rX[0][3] + b[2]*rX[1][3] + b[3]*rX[2][3];
	document.getElementById("outputB").innerHTML = 'Перевірка коефіцієнтів: </br> ' 
	+ b[0].toFixed(3) + ' + ' + b[1].toFixed(3) + '*' + rX[0][0] + '+' + b[2].toFixed(3)+'*'+rX[1][0] + '+' + b[3].toFixed(3)+'*'+rX[2][0]+' = '+ check1.toFixed(2) +'</br>' 
	+ b[0].toFixed(3) + ' + ' + b[1].toFixed(3) + '*' + rX[0][1] + '+' + b[2].toFixed(3)+'*'+rX[1][1] + '+' + b[3].toFixed(3)+'*'+rX[2][1]+' = '+check2.toFixed(2) + '</br>'
	+ b[0].toFixed(3) + ' + ' + b[1].toFixed(3) + '*' + rX[0][2] + '+' + b[2].toFixed(3)+'*'+rX[1][2] + '+' + b[3].toFixed(3)+'*'+rX[2][2]+' = '+check3.toFixed(2) + '</br>' 
	+ b[0].toFixed(3) + ' + ' + b[1].toFixed(3) + '*' + rX[0][3] + '+' + b[2].toFixed(3)+'*'+rX[1][3] + '+' + b[3].toFixed(3)+'*'+rX[2][3]+' = '+check4.toFixed(2) + '</br>';

	checkKohren();
	checkStudent();
	checkFisher();
 }

function checkKohren(){
	var dispersion = new Array(n);
	for (var i = 0; i < dispersion.length; i++) {
		dispersion[i] = 0;
		for (var j = 0; j < y[0].length; j++){
			dispersion[i] += Math.pow((y[i][j] - avrY[i]), 2);
		}
		dispersion[i] = dispersion[i] / m;
	}
	var max = dispersion[0];
	var s = 0;

	
	for (var i = 0; i < dispersion.length; i++) {
		s += dispersion[i];
		if (dispersion[i] > max){
			max = dispersion[i];
		}
	}

	var gp = max / s;
	//System.out.println(gp);
	//return true;
	var gt = 0.7679;
	console.log(gp);
	if (gp < gt)
		document.getElementById("outputKohren").innerHTML = 'Перевірка однорідності дисперсії за критерієм Кохрена: дисперсія однорідна';
	else
		document.getElementById("outputKohren").innerHTML = 'Перевірка однорідності дисперсії за критерієм Кохрена: дисперсія неоднорідна';
}

function checkStudent(){
	var dispersion = new Array(n);
	var s = 0;
	for (var i = 0; i < dispersion.length; i++) {
		dispersion[i] = 0;
		for (var j = 0; j < y[0].length; j++)
			dispersion[i] += Math.pow((y[i][j] - avrY[i]), 2);
		dispersion[i] = dispersion[i] / m;
		s += dispersion[i];
	}
	sb = Math.sqrt(s / (n * n * m));
	console.log("Sb: " + sb);
	var beta = new Array(n);
	var t = new Array(n);
	for (var i = 0; i < beta.length; i++) {
		beta[i] = 0;
		for (var j = 0; j < n; j++) {
			beta[i] += avrY[j] * nX[i][j];
		}
		beta[i] = beta[i] / n;
		t[i] = Math.abs(beta[i]) / sb;
	}
	var tTable = 2.306;
	for (var i = 0; i < n; i++){
		if (t[i] < tTable){
			b[i] = 0;
			console.log("Wooohooo");
		}
	}
	for (var i = 0; i < checkStdnt.length; i++) {
		checkStdnt[i] = b[0] + b[1] * rX[0][i] + b[2] * rX[1][i] + b[3] * rX[2][i];
	}

	var check1 = b[0] + b[1]*rX[0][0] + b[2]*rX[1][0] + b[3]*rX[2][0];
	var check2 = b[0] + b[1]*rX[0][1] + b[2]*rX[1][1] + b[3]*rX[2][1];
	var check3 = b[0] + b[1]*rX[0][2] + b[2]*rX[1][2] + b[3]*rX[2][2];
	var check4 = b[0] + b[1]*rX[0][3] + b[2]*rX[1][3] + b[3]*rX[2][3];
	document.getElementById("outputStudent").innerHTML = 'Оцінка значимості коефіцієнтів регресії згідно критерію Стьюдента: </br> ' 
	+ b[0].toFixed(2) + ' + ' + b[1].toFixed(2) + '*' + rX[0][0] + '+' + b[2].toFixed(2)+'*'+rX[1][0] + '+' + b[3].toFixed(2)+'*'+rX[2][0]+' = '+ check1.toFixed(2) +'</br>' 
	+ b[0].toFixed(2) + ' + ' + b[1].toFixed(2) + '*' + rX[0][1] + '+' + b[2].toFixed(2)+'*'+rX[1][1] + '+' + b[3].toFixed(2)+'*'+rX[2][1]+' = '+check2.toFixed(2) + '</br>'
	+ b[0].toFixed(2) + ' + ' + b[1].toFixed(2) + '*' + rX[0][2] + '+' + b[2].toFixed(2)+'*'+rX[1][2] + '+' + b[3].toFixed(2)+'*'+rX[2][2]+' = '+check3.toFixed(2) + '</br>' 
	+ b[0].toFixed(2) + ' + ' + b[1].toFixed(2) + '*' + rX[0][3] + '+' + b[2].toFixed(2)+'*'+rX[1][3] + '+' + b[3].toFixed(2)+'*'+rX[2][3]+' = '+check4.toFixed(2) + '</br>';

}

function checkFisher(){
	var d = 2;
	var s = 0;
	for(var i = 0; i < n; i++){
		s =s + (checkStdnt[i] - avrY[i])*(checkStdnt[i] - avrY[i]);
	}
	s = s*m/(n-d);
	var fp = s / Math.pow(sb,2);
	var ft = 4.5;
	if (fp < ft)
		document.getElementById("outputFisher").innerHTML = 'Критерій Фішера: рівняння регресії адекватно оригіналу при рівні значимості 0.05';
	else
		document.getElementById("outputFisher").innerHTML = 'Критерій Фішера: рівняння регресії неадекватно оригіналу при рівні значимості 0.05';
}

function fillTable(){
	var rows = n + 1;
	var cells = m + 3;
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
			if(i < 4 && j > 0 ){
				cellText = document.createTextNode(nX[i][j-1]);
				cell.classList.add('cellHighlight3');
			}
			if(i < 4 && j === 0){
				cellText = document.createTextNode("X"+(i));
			}
			if(i >= 4 && j === 0 && i < (3 + m)){
				cellText = document.createTextNode("Y"+(i-3));
			}
			if(i >= 4 && j > 0 && i < (3 + m)){
				cellText = document.createTextNode(y[j-1][i-4]);
				cell.classList.add('cellHighlight2');
			}
			if(i === (cells -1) && j === 0){
				cellText = document.createTextNode("середнє значення");
			}
			if(i === (cells -1) && j > 0){
				cellText = document.createTextNode(avrY[j-1].toFixed(3));
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