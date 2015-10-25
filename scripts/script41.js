var yMax;
var yMin;
var m = 3;	//кількість дослідів y за однієї і тієї ж комбінації факторів
var n = 8.0;	//кількість точок плану (рядків матриці планування)
var sb;
var b = new Array(n);
var k;
var y;
var avrY = new Array(n);
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
	main();	
}

function main(){
	m = 5;
	matrixY(yMin, yMax);
}

function matrixY(yMin, yMax){
	y = new Array(n);
	/*
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

	for (var i = 0; i < y.length; i++) {
		var s = 0;
		for (var j = 0; j < y[0].length; j++) {
			s += y[i][j];
		}
		avrY[i] = s / y[0].length;
	}

	var m00 = n;
	var m10 = m20 = m30 = m40 = m50 = m60 = m70 = 0;
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

	for (var j = 0; j < rX[0].length; j++){
			m10 += nX[1][j];
			m20 += nX[2][j];
			m30 += nX[3][j];
			m40 += nX[1][j] * nX[2][j];
			m50 += nX[1][j] * nX[3][j];
			m60 += nX[2][j] * nX[3][j];
			m11 += nX[1][j] * nX[1][j];
			m22 += nX[2][j] * nX[2][j];
			m33 += nX[3][j] * nX[3][j];
			m70 += nX[1][j] * nX[2][j] * nX[3][j];
			m41 += nX[1][j] * nX[1][j] * nX[2][j];
			m51 += nX[1][j] * nX[1][j] * nX[3][j];
			m42 += nX[1][j] * nX[2][j] * nX[2][j];
			m53 += nX[1][j] * nX[3][j] * nX[3][j];
			m62 += nX[2][j] * nX[2][j] * nX[3][j];
			m63 += nX[2][j] * nX[3][j] * nX[3][j];
			m71 += nX[1][j] * nX[1][j] * nX[2][j] * nX[3][j];
			m72 += nX[1][j] * nX[2][j] * nX[2][j] * nX[3][j];
			m73 += nX[1][j] * nX[2][j] * nX[3][j] * nX[3][j];
			m44 += nX[1][j] * nX[1][j] * nX[2][j] * nX[2][j];
			m55 += nX[1][j] * nX[1][j] * nX[3][j] * nX[3][j];
			m66 += nX[2][j] * nX[2][j] * nX[3][j] * nX[3][j];
			m74 += nX[1][j] * nX[1][j] * nX[2][j] * nX[2][j] * nX[3][j];
			m75 += nX[1][j] * nX[1][j] * nX[2][j] * nX[3][j] * nX[3][j];
			m76 += nX[1][j] * nX[2][j] * nX[2][j] * nX[3][j] * nX[3][j];
			m77 += nX[1][j] * nX[1][j] * nX[2][j] * nX[2][j] * nX[3][j] * nX[3][j];
			k[0] += avrY[j];
			k[1] += avrY[j] * nX[1][j];
			k[2] += avrY[j] * nX[2][j];
			k[3] += avrY[j] * nX[3][j];
			k[4] += avrY[j] * nX[1][j] * nX[2][j];
			k[5] += avrY[j] * nX[1][j] * nX[3][j];
			k[6] += avrY[j] * nX[2][j] * nX[3][j];
			k[7] += avrY[j] * nX[1][j] * nX[2][j] * nX[3][j];
	}

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

	document.getElementById("b0").innerHTML = b[0].toFixed(3); 
	document.getElementById("b1").innerHTML = b[1].toFixed(3); 
	document.getElementById("b2").innerHTML = b[2].toFixed(3);
	document.getElementById("b3").innerHTML = b[3].toFixed(3);
	document.getElementById("b12").innerHTML = b[4].toFixed(3);
	document.getElementById("b13").innerHTML = b[5].toFixed(3);
	document.getElementById("b23").innerHTML = b[6].toFixed(3);
	document.getElementById("b123").innerHTML = b[7].toFixed(20);

	fillTable();

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
		console.log("bb(" + i + ") = " + bb[0]);
	}
	
	var check1 = b[0] + b[1]*rX[0][0] + b[2]*rX[1][0] + b[3]*rX[2][0] + b[4]*rX[0][0]*rX[1][0] + b[5]*rX[0][0]*rX[2][0] + b[6]*rX[1][0]*rX[2][0] + b[7]*rX[0][0]*rX[1][0]*rX[2][0];
	var check2 = b[0] + b[1]*rX[0][1] + b[2]*rX[1][1] + b[3]*rX[2][1] + b[4]*rX[0][1]*rX[1][1] + b[5]*rX[0][1]*rX[2][1] + b[6]*rX[1][1]*rX[2][1] + b[7]*rX[0][1]*rX[1][1]*rX[2][1];
	var check3 = b[0] + b[1]*rX[0][2] + b[2]*rX[1][2] + b[3]*rX[2][2] + b[4]*rX[0][2]*rX[1][2] + b[5]*rX[0][2]*rX[2][2] + b[6]*rX[1][2]*rX[2][2] + b[7]*rX[0][2]*rX[1][2]*rX[2][2];
	var check4 = b[0] + b[1]*rX[0][3] + b[2]*rX[1][3] + b[3]*rX[2][3] + b[4]*rX[0][3]*rX[1][3] + b[5]*rX[0][3]*rX[2][3] + b[6]*rX[1][3]*rX[2][3] + b[7]*rX[0][3]*rX[1][3]*rX[2][3];

	console.log("check = " + check1);
	console.log("check = " + check2);
	console.log("check = " + check3);
	console.log("check = " + check4);

	var check1 = bb[0] + bb[1]*nX[1][0] + bb[2]*nX[2][0] + bb[3]*nX[3][0] + bb[4]*nX[1][0]*nX[2][0] + bb[5]*nX[1][0]*nX[3][0] + bb[6]*nX[2][0]*nX[3][0] + bb[7]*nX[1][0]*nX[2][0]*nX[3][0];
	var check2 = bb[0] + bb[1]*nX[1][1] + bb[2]*nX[2][1] + bb[3]*nX[3][1] + bb[4]*nX[1][1]*nX[2][1] + bb[5]*nX[1][1]*nX[3][1] + bb[6]*nX[2][1]*nX[3][1] + bb[7]*nX[1][1]*nX[2][1]*nX[3][1];
	var check3 = bb[0] + bb[1]*nX[1][2] + bb[2]*nX[2][2] + bb[3]*nX[3][2] + bb[4]*nX[1][2]*nX[2][2] + bb[5]*nX[1][2]*nX[3][2] + bb[6]*nX[2][2]*nX[3][2] + bb[7]*nX[1][2]*nX[2][2]*nX[3][2];
	var check4 = bb[0] + bb[1]*nX[1][3] + bb[2]*nX[2][3] + bb[3]*nX[3][3] + bb[4]*nX[1][3]*nX[2][3] + bb[5]*nX[1][3]*nX[3][3] + bb[6]*nX[2][3]*nX[3][3] + bb[7]*nX[1][3]*nX[2][3]*nX[3][3];

	console.log("check = " + check1);
	console.log("check = " + check2);
	console.log("check = " + check3);
	console.log("check = " + check4);

	checkKohren();
	checkStudent();
	checkFisher();
 }

function outputMatrix(randomMatrix){
	for (var i = 0; i < rX[0].length; i++){
		console.log(randomMatrix[i][0] + "|" + randomMatrix[i][1] + "|" + randomMatrix[i][2] + "|" + randomMatrix[i][3] + "|" + randomMatrix[i][4] + "|" + randomMatrix[i][5] + "|" + randomMatrix[i][6] + "|" + randomMatrix[i][7]);
	}
	console.log("+++++++++++++++++++++++");
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
			//beta[i] += avrY[j] * nX[i][j];
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
				cellText = document.createTextNode(y[j-1][i-4].toFixed(3));
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