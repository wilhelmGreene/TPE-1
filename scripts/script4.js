var yMax;
var yMin;
var m = 3;		//кількість дослідів y за однієї і тієї ж комбінації факторів
var n;	//кількість точок плану (рядків матриці планування)
var sb;
var b;
var y;
var avrY;
//        1   2   3   4   5   6   7   8
var nX =[[1,  1,  1,  1,  1,  1,  1,  1],  //X0 - додатковий фіктивний фактор
		[-1, -1,  1,  1, -1, -1,  1,  1],  //X1
		[-1,  1, -1,  1, -1,  1, -1,  1],  //X2
		[-1,  1,  1, -1,  1, -1, -1,  1]]; //X3
var rX;
var checkStdnt = new Array(n);
var tableFlag;
var table     = document.getElementById("table2");
var tableBody = document.createElement("tbody");

onLoad();

function onLoad(){
	n = 4.0;
	//Варіант:
	var x1min = 10;
	var x1max = 40;
	var x2min = 25;
	var x2max = 45;
	var x3min = 40;
	var x3max = 45;
	//		1 		2 	   3      4       5      6      7      8
	rX = [[x1min, x1min, x1max, x1max, x1min, x1min, x1max, x1max],  //X1
		  [x2min, x2max, x2min, x2max, x2min, x2max, x2min, x2max],  //X2
		  [x3min, x3max, x3max, x3min, x3max, x3min, x3min, x3max]]; //X3
	var XcpMax = (x1max + x2max + x3max) / 3;
	var XcpMin = (x1min + x2min + x3min) / 3;
	yMax = 200 + XcpMax;
	yMin = 200 + XcpMin;
	tableFlag = false;
	matrixY();
	getCoef();
}

function matrixY(){
	//*
	y = new Array(n);
	for (var i = 0; i < y.length; i++){
		y[i] = new Array(m);
		for (var j = 0; j < y[i].length; j++){
			y[i][j] = Math.random() * (yMax - yMin) + yMin;
		}
	}
	/*/
	y = [[231.56, 229.347, 237.389, 237.398, 236.012],
		[232.355, 239.471, 232.508, 236.08, 227.921],
		[233.755, 231.38, 226.88, 239.287, 233.724],
		[234.737, 241.825, 238.215, 238.39, 234.202],
		[232.624, 232.76, 236.64, 241.369, 240.77],
		[226.123, 226.879, 242.79, 238.40, 230.504],
		[237.064, 230.206, 241.766, 227.816, 235.430],
		[238.586, 238.08, 236.96, 232.008, 237.098]];//*/
	avrY = new Array(n);
	for (var i = 0; i < y.length; i++){
		var s = 0;
		for (var j = 0; j < m; j++){
			s += y[i][j];
		}
		avrY[i] = s / m;
	}
}

function getCoef(){
	var mx1 = (rX[0][0] + rX[0][1] + rX[0][2] + rX[0][3]) / n;
	var mx2 = (rX[1][0] + rX[1][1] + rX[1][2] + rX[1][3]) / n;
	var mx3 = (rX[2][0] + rX[2][1] + rX[2][2] + rX[2][3]) / n;

	var my = 0;
	for (var i = 0; i < avrY.length; i++){
		my += avrY[i];
	}
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
	b = new Array(n);
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

	checkKohren(); //перевірка однорідності дисперсій
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
	var gt = 0.7679;
	console.log(gp);
	if (gp < gt){
		document.getElementById("outputKohren").innerHTML = 'Перевірка однорідності дисперсії за критерієм Кохрена: дисперсія однорідна';
		checkStudent();
	} else {
		document.getElementById("outputKohren").innerHTML = 'Перевірка однорідності дисперсії за критерієм Кохрена: дисперсія неоднорідна';
		m = m + 1;
		matrixY();
		getCoef();
	}
}

function checkStudent(){
	var numCoef = n;
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
			numCoef--;
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
	checkFisher(numCoef);
}

function checkFisher(numCoef){
	var d = numCoef;
	console.log(d);
	var s = 0;
	for(var i = 0; i < n; i++){
		s = s + (checkStdnt[i] - avrY[i])*(checkStdnt[i] - avrY[i]);
	}
	s = s*m/(n-d);
	var fp = s / Math.pow(sb,2);
	var ft = 4.5;
	if (fp < ft){
		document.getElementById("outputFisher").innerHTML = 'Критерій Фішера: рівняння регресії адекватно оригіналу при рівні значимості 0.05';
	} else {
		document.getElementById("outputFisher").innerHTML = 'Критерій Фішера: рівняння регресії неадекватно оригіналу при рівні значимості 0.05';
		addInteractionEffect();
	}
}

function addInteractionEffect(){
	console.log("ЕФЕКТ ВЗАЄМОДІЇ");
	alert("ЕФЕКТ ВЗАЄМОДІЇ");
	prompt;
	var rows = n + 1;
	var cells = m + 5;
	if (tableFlag){
		for(var j = 0; j < rows; j++) {
			table.deleteRow(0);
		}
		tableFlag = false;
	}
	n = 8.0;
	var oldY = y.slice();
	y = new Array(n);
	for (var i = 0; i < y.length; i++){
		y[i] = new Array(m);
		for (var j = 0; j < y[i].length; j++){
			if (i < oldY.length){
				y[i][j] = oldY[i][j]
			} else {
				y[i][j] = Math.random() * (yMax - yMin) + yMin;
			}
		}
	}
	avrY = new Array(n);
	for (var i = 0; i < y.length; i++){
		var s = 0;
		for (var j = 0; j < m; j++){
			s += y[i][j];
		}
		avrY[i] = s / m;
	}

	var str = '\
				<h4>Отримане рівняння регресії: </br><i>Y</i> = \
				<i id=\"b0\">b<sub>0</sub></i> + \
				<i id=\"b1\">b<sub>1</sub></i>*<i>X</i><sub>1</sub> + \
				<i id=\"b2\">b<sub>2</sub></i>*<i>X</i><sub>2</sub> + \
				<i id=\"b3\">b<sub>3</sub></i>*<i>X</i><sub>3</sub> + </br> + \
				<i id=\"b12\">b<sub>12</sub></i>*<i>X</i><sub>1</sub>*<i>X</i><sub>2</sub> + \
				<i id=\"b13\">b<sub>13</sub></i>*<i>X</i><sub>1</sub>*<i>X</i><sub>3</sub> + \
				<i id=\"b23\">b<sub>23</sub></i>*<i>X</i><sub>2</sub>*<i>X</i><sub>3</sub> + \
				<i id=\"b123\">b<sub>123</sub></i>*<i>X</i><sub>1</sub>*<i>X</i><sub>2</sub>*<i>X</i><sub>3</sub></h4>\
				';

	document.getElementById("equation").innerHTML = str;

	//знаходимо коефіцієнти за допомогою НАТУРАЛЬНИХ значень факторів
	var m00 = 1;
	var 	  m10 = m20 = m30 = m40 = m50 = m60 = m70 = 0;
	var m01 = m11 = m21 = m31 = m41 = m51 = m61 = m71 = 0;
	var m02 = m12 = m22 = m32 = m42 = m52 = m62 = m72 = 0;
	var m03 = m13 = m23 = m33 = m43 = m53 = m63 = m73 = 0;
	var m04 = m14 = m24 = m34 = m44 = m54 = m64 = m74 = 0;
	var m05 = m15 = m25 = m35 = m45 = m55 = m65 = m75 = 0;
	var m06 = m16 = m26 = m36 = m46 = m56 = m66 = m76 = 0;
	var m07 = m17 = m27 = m37 = m47 = m57 = m67 = m77 = 0;

	var k = new Array (n);
	k[0] = k[1] = k[2] = k[3] = k[4] = k[5] = k[6] = k[7] = 0;

	for (var j = 0; j < rX[0].length; j++){
		m10 += rX[0][j];
		m20 += rX[1][j];
		m30 += rX[2][j];
		m40 += rX[0][j] * rX[1][j];
		m50 += rX[0][j] * rX[2][j];
		m60 += rX[1][j] * rX[2][j];
		m11 += rX[0][j] * rX[0][j];
		m22 += rX[1][j] * rX[1][j];
		m33 += rX[2][j] * rX[2][j];
		m70 += rX[0][j] * rX[1][j] * rX[2][j];
		m41 += rX[0][j] * rX[0][j] * rX[1][j];
		m51 += rX[0][j] * rX[0][j] * rX[2][j];
		m42 += rX[0][j] * rX[1][j] * rX[1][j];
		m53 += rX[0][j] * rX[2][j] * rX[2][j];
		m62 += rX[1][j] * rX[1][j] * rX[2][j];
		m63 += rX[1][j] * rX[2][j] * rX[2][j];
		m71 += rX[0][j] * rX[0][j] * rX[1][j] * rX[2][j];
		m72 += rX[0][j] * rX[1][j] * rX[1][j] * rX[2][j];
		m73 += rX[0][j] * rX[1][j] * rX[2][j] * rX[2][j];
		m44 += rX[0][j] * rX[0][j] * rX[1][j] * rX[1][j];
		m55 += rX[0][j] * rX[0][j] * rX[2][j] * rX[2][j];
		m66 += rX[1][j] * rX[1][j] * rX[2][j] * rX[2][j];
		m74 += rX[0][j] * rX[0][j] * rX[1][j] * rX[1][j] * rX[2][j];
		m75 += rX[0][j] * rX[0][j] * rX[1][j] * rX[2][j] * rX[2][j];
		m76 += rX[0][j] * rX[1][j] * rX[1][j] * rX[2][j] * rX[2][j];
		m77 += rX[0][j] * rX[0][j] * rX[1][j] * rX[1][j] * rX[2][j] * rX[2][j];
		k[0] += avrY[j];
		k[1] += avrY[j] * rX[0][j];
		k[2] += avrY[j] * rX[1][j];
		k[3] += avrY[j] * rX[2][j];
		k[4] += avrY[j] * rX[0][j] * rX[1][j];
		k[5] += avrY[j] * rX[0][j] * rX[2][j];
		k[6] += avrY[j] * rX[1][j] * rX[2][j];
		k[7] += avrY[j] * rX[0][j] * rX[1][j] * rX[2][j];
	}

		m10 /= n;
		m20 /= n;
		m30 /= n;
		m40 /= n;
		m50 /= n;
		m60 /= n;
		m11 /= n;
		m22 /= n;
		m33 /= n;
		m70 /= n;
		m41 /= n;
		m51 /= n;
		m42 /= n;
		m53 /= n;
		m62 /= n;
		m63 /= n;
		m71 /= n;
		m72 /= n;
		m73 /= n;
		m44 /= n;
		m55 /= n;
		m66 /= n;
		m74 /= n;
		m75 /= n;
		m76 /= n;
		m77 /= n;
		k[0] /= n;
		k[1] /= n;
		k[2] /= n;
		k[3] /= n;
		k[4] /= n;
		k[5] /= n;
		k[6] /= n;
		k[7] /= n;

	m01 = m10;
	m02 = m20;
	m03 = m30;
	m14 = m41;
	m24 = m42;
	m15 = m51;
	m35 = m53;
	m26 = m62;
	m36 = m63;
	m47 = m74;
	m57 = m75;
	m67 = m76;
	m17 = m45 = m54 = m71;
	m27 = m46 = m64 = m72;
	m37 = m56 = m65 = m73;
	m12 = m21 = m04 = m40;
	m13 = m31 = m05 = m50;
	m23 = m32 = m06 = m60;
	m07 = m16 = m25 = m34 = m43 = m52 = m61 = m70;

	var det2DArr = [[m00, m10, m20, m30, m40, m50, m60, m70],
					[m01, m11, m21, m31, m41, m51, m61, m71],
					[m02, m12, m22, m32, m42, m52, m62, m72],
					[m03, m13, m23, m33, m43, m53, m63, m73],
					[m04, m14, m24, m34, m44, m54, m64, m74],
					[m05, m15, m25, m35, m45, m55, m65, m75],
					[m06, m16, m26, m36, m46, m56, m66, m76],
					[m07, m17, m27, m37, m47, m57, m67, m77]];
	var det = math.det(math.matrix(det2DArr));
	console.log("det = " + det);

	var b = new Array(n);
	for (var i = 0; i < rX[0].length; i++){
		var newArray = new Array(n);
		for (var j = 0; j < det2DArr.length; j++){
			newArray[j] = new Array(n);
			for(var ii = 0; ii < det2DArr.length; ii++){
    			newArray[j][ii] = det2DArr[j][ii];
    		}
    	}
		for (var j = 0; j < rX[0].length; j++){
			newArray[j][i] = k[j];
			
		} 
		//outputMatrix(newArray);
		console.log("det(" + i + ") = " + math.det(math.matrix(newArray)));
		b[i] = math.det(math.matrix(newArray)) / det;
		console.log(i + ") b "+b[i]);
	}

	//знаходимо коефіцієнти за допомогою НОРМОВАНИХ значень факторів
	var bb = [0,0,0,0,0,0,0,0];
	for (var j = 0; j < rX[0].length; j++){
		bb[0] += avrY[j];
		bb[1] += avrY[j] * nX[1][j];
		bb[2] += avrY[j] * nX[2][j];
		bb[3] += avrY[j] * nX[3][j];
		bb[4] += avrY[j] * nX[1][j] * nX[2][j];
		bb[5] += avrY[j] * nX[1][j] * nX[3][j];
		bb[6] += avrY[j] * nX[2][j] * nX[3][j];
		bb[7] += avrY[j] * nX[1][j] * nX[2][j] * nX[3][j];
	}
	for (var i = 0; i < n; i++){
		bb[i] = bb[i] / n;
		console.log("bb(" + i + ") = " + bb[i]);
	}

	document.getElementById("b0").innerHTML = bb[0].toFixed(3); 
	document.getElementById("b1").innerHTML = bb[1].toFixed(3); 
	document.getElementById("b2").innerHTML = bb[2].toFixed(3);
	document.getElementById("b3").innerHTML = bb[3].toFixed(3);
	document.getElementById("b12").innerHTML = bb[4].toFixed(3);
	document.getElementById("b13").innerHTML = bb[5].toFixed(3);
	document.getElementById("b23").innerHTML = bb[6].toFixed(3);
	document.getElementById("b123").innerHTML = bb[7].toFixed(3);

	console.log("------------");
	//перевірка коефіцієнтів знайдених за допомогою НАТУРАЛЬНИХ значень факторів
	var checkR = new Array(n);
	for (var i = 0; i < n; i++){
		checkR[i] = b[0] + b[1]*rX[0][i] + b[2]*rX[1][i] + b[3]*rX[2][i] + b[4]*rX[0][i]*rX[1][i] + b[5]*rX[0][i]*rX[2][i] + b[6]*rX[1][i]*rX[2][i] + b[7]*rX[0][i]*rX[1][i]*rX[2][i];
		console.log("checkR "+i + ")" + checkR[i]);
	}
	console.log("------------");
	//перевірка коефіцієнтів знайдених за допомогою НОРМОВАНИХ значень факторів
	var checkN = new Array(n);
	for (var i = 0; i < n; i++){
		checkN[i] = bb[0] + bb[1]*nX[1][i] + bb[2]*nX[2][i] + bb[3]*nX[3][i] + bb[4]*nX[1][i]*nX[2][i] + bb[5]*nX[1][i]*nX[3][i] + bb[6]*nX[2][i]*nX[3][i] + bb[7]*nX[1][i]*nX[2][i]*nX[3][i];
		console.log("checkN "+i + ")" + checkN[i]);
	}
	fillTable();
}

function outputMatrix(randomMatrix){
	for (var i = 0; i < rX[0].length; i++){
		console.log(randomMatrix[i][0] + "|" + randomMatrix[i][1] + "|" + randomMatrix[i][2] + "|" + randomMatrix[i][3] + "|" + randomMatrix[i][4] + "|" + randomMatrix[i][5] + "|" + randomMatrix[i][6] + "|" + randomMatrix[i][7]);
	}
	console.log("+++++++++++++++++++++++");
}


function fillTable(){
	var rows = n + 1;
	var cells = m + 5;
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
				cell.classList.add('headTable');
			}
			if(i >= 4 && j === 0 && i < (cells-1)){
				cellText = document.createTextNode("Y"+(i-3));
				cell.classList.add('headTable');
			}
			if(i >= 4 && j > 0 && i < (cells-1)){
				cellText = document.createTextNode(y[j-1][i-4].toFixed(3));
				cell.classList.add('cellHighlight2');
			}
			if(i === (cells-1) && j === 0){
				cellText = document.createTextNode("середнє значення");
				cell.classList.add('headTable');
			}
			if(i === (cells-1) && j > 0){
				cellText = document.createTextNode(avrY[j-1].toFixed(3));
				cell.classList.add('cellHighlight');
			}
			cell.appendChild(cellText);
			row.appendChild(cell);
		}
		tableBody.appendChild(row);
	}
	table.appendChild(tableBody);
	//body.appendChild(table); 
	tableFlag = true;
}

function mouseOverEq(){
	document.getElementById("b0").classList.add('eqCoef');
	document.getElementById("b1").classList.add('eqCoef');
	document.getElementById("b2").classList.add('eqCoef');
	document.getElementById("b3").classList.add('eqCoef');
	if (n === 8.0){
		document.getElementById("b12").classList.add('eqCoef');
		document.getElementById("b13").classList.add('eqCoef');
		document.getElementById("b23").classList.add('eqCoef');
		document.getElementById("b123").classList.add('eqCoef');
	}
}

function mouseOutEq(){
	document.getElementById("b0").classList.remove('eqCoef');
	document.getElementById("b1").classList.remove('eqCoef');
	document.getElementById("b2").classList.remove('eqCoef');
	document.getElementById("b3").classList.remove('eqCoef');
	if (n === 8.0){
		document.getElementById("b12").classList.remove('eqCoef');
		document.getElementById("b13").classList.remove('eqCoef');
		document.getElementById("b23").classList.remove('eqCoef');
		document.getElementById("b123").classList.remove('eqCoef');
	}	
}