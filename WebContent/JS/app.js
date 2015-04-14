function soloNumeros(e) {
	var teclaPulsada = window.event ? window.event.keyCode : e.which;

	return /\d/.test(String.fromCharCode(teclaPulsada));
}

var velocidad = 1, direccion = velocidad, x = 22, y = 70;
var p = 0;
var datos = [];
window.addEventListener('load', init);
function init() {

	var canvas = document.getElementById("micanvas");

	var ctx = canvas.getContext("2d");

	

	document.getElementById('cargar').addEventListener('click', function() {
		numero1 = document.getElementById('txt').value;
		numero2 = document.getElementById('txt1').value;

		var nume = parseInt(numero1) + parseInt(numero2);
		var aux = 0;
		datos = [];
		
		datos.push(0);
		
		while (aux < parseInt(numero1)) {
			datos.push(1);
			aux ++;
		}
		datos.push(0);
		aux = 0;
		while(aux < parseInt(numero2) ){
			datos.push(1);
			aux++;
		}

		if (datos != null) {
			x = 110;
			canvas.width = canvas.width;

			ctx.strokeRect(63, 40, 30, 35);

			cinta(ctx, x, y);

		}

		cambio();

	});

}

function draw(canvas, ctx, x, y) {
	canvas.width = canvas.width;
	cinta(ctx, x, y);

	ctx.strokeRect(63, 40, 30, 35);

}

function moveAndDraw(canvas, ctx) {

	if (x > y) {
		direccion = -velocidad;
		x += direccion;
		draw(canvas, ctx, x, y);
	}

}

function cinta(ctx, x, y) {
	p = 0;

	for (var i = 0; i < datos.length; i++) {
		ctx.font = "35px gothic";
		ctx.strokeText(datos[i], x + p, y);
		p = p + 30;
	}

}

function cambio() {
	var canvas = document.getElementById("micanvas");
	var ctx = canvas.getContext("2d");
	est = 0;
	var c = x - 22;
	automata = [ [ "0,0", "0,1" ], [ "1,2", "1,1" ] ];

	/*
	 * 0 1
	 * 
	 * A "0,A,>" " 0,B,>"
	 * 
	 * B "1,@" "1,B,>"
	 */

	for (var i = 0; i < datos.length; i++) {
		est = getState(est, datos[i]);

		if (datos[i] == 0 && est == 0) {

			datos[i] = 0;

		} else if (datos[i] == 1 && est == 0) {

			datos[i] = 0;
			est = 1;

		}

		else if (datos[i] == 1 && est == 1) {

			datos[i] = 1;

		} else if (datos[i] == 0 && est == 1) {

			datos[i] = 1;
			est = 2;

		}
		 setInterval(function() {
				moveAndDraw(canvas, ctx);
			
		}, 1000);
	}
}


function getState(state, leido) {
	v = automata[state][leido].split(",");
	a = v[0];
	return a;
}