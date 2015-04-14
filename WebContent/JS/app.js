function soloNumeros(e) {
	// capturamos la tecla pulsada
	var teclaPulsada = window.event ? window.event.keyCode : e.which;

	// capturamos el contenido del input
	//var valor = document.getElementById("inputNumero").value;

	// 45 = tecla simbolo menos (-)
	// Si el usuario pulsa la tecla menos, y no se ha pulsado anteriormente
	// Modificamos el contenido del mismo añadiendo el simbolo menos al
	// inicio
	/*
	 * if(teclaPulsada==45 && valor.indexOf("-")==-1) {
	 * document.getElementById("inputNumero").value="-"+valor; }
	 */

	// 13 = tecla enter
	// 46 = tecla punto (.)
	// Si el usuario pulsa la tecla enter o el punto y no hay ningun otro
	// punto
	
	 /* if(teclaPulsada==13 || (teclaPulsada==46 && valor.indexOf(".")==-1)) {
	  return true; }*/
	

	// devolvemos true o false dependiendo de si es numerico o no
	return /\d/.test(String.fromCharCode(teclaPulsada));
}

// movimiento

var velocidad = 10, direccion = velocidad, iniciar = false, x = 22, y = 66;
var  p = 0;
var datos = [];
window.addEventListener('load', init);
function init() {
	
	var canvas = document.getElementById("micanvas");
	var ctx = canvas.getContext("2d");
	cinta(ctx,x,y);
	
	document.getElementById('cargar').addEventListener('click', function() {
		numero1 = document.getElementById('txt').value;
		numero2 = document.getElementById('txt1').value;
		
		var nume = parseInt(numero1) + parseInt(numero2);
		var aux = 0;
		datos = [];
		datos[0] = 0;
		while (nume >= 0) {

			
			if (aux != parseInt(numero1)) {
				datos[parseInt(aux) + 1] = 1;
			} else {
				datos[aux + 1] = 0;
			}
			aux = aux + 1;

			nume--;
		}
		
		if (datos != null) {
			x = 110;
			canvas.width = canvas.width;
			ctx.strokeRect(63, 40, 30, 35);
			cinta(ctx, x, y);
		}
		
		cambio();
		
		
			
		// valor=document.getElementById('txt1').value;

	});

}

function draw(canvas, ctx, x, y) {
	canvas.width = canvas.width;
	cinta(ctx, x, y);
	ctx.strokeRect(63, 40, 30, 35);
}

function moveAndDraw(canvas, ctx) {
	// if(x>(canvas.width-20))direccion=-velocidad; // se mueve a la izquierdad
	// if(x<(20))direccion=velocidad;//se meuve a la derecha
	direccion = -velocidad;
	x += direccion;
	
	setTimeout(function(){ draw(canvas, ctx, x, y)}, 400);
}

function cinta(ctx, x, y) {
	p = 0;

	for (var i = 0; i < datos.length; i++) {
		ctx.font = "35px Arial";
		ctx.strokeText(datos[i], x + p, y);
		p = p + 30;
	}

}

function cambio() {
	var canvas = document.getElementById("micanvas");
	var ctx = canvas.getContext("2d");
	est = 0;
	automata = [ [ "0,0", "0,1" ], [ "1,2", "1,1" ] ];

	/*
	 *     0         1
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
		moveAndDraw(canvas, ctx);
	}

}

function getState(state, leido) {
	v = automata[state][leido].split(",");
	a = v[0];
	return a;
}