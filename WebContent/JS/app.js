function soloNumeros(e) {
	
	var teclaPulsada = window.event ? window.event.keyCode : e.which;

	return /\d/.test(String.fromCharCode(teclaPulsada));
}

var velocidad = 1; 
var direccion = velocidad;
var iniciar = false;
var x = 20; 
var y = 70;
var p = 0;
var intervalo;
var datos = [];

window.addEventListener('load', init);


function init() {
	
	var canvas = document.getElementById("micanvas");
	var ctx = canvas.getContext("2d");

	
	document.getElementById('cargar').addEventListener('click', function() {
		window.clearInterval(intervalo);
		
		numero1 = document.getElementById('txt').value;
		numero2 = document.getElementById('txt1').value;
		console.log("numero1",numero1);

		var nume = parseInt(numero1) + parseInt(numero2);
		var aux = 0;
		datos = [];

		datos.push(0);

		while (aux < parseInt(numero1)) {
			datos.push(1);
			aux++;
		}
		datos.push(0);
		aux = 0;
		while (aux < parseInt(numero2)) {
			datos.push(1);
			aux++;
		}
		
		if (!iniciar) {
			intervalo = window.setInterval(function() {
				moveAndDraw(canvas, ctx);
				if (x == y) {
					window.clearInterval(intervalo);
					velocidad = 30;
					cambio(datos, canvas, ctx);
					
				}
			}, 32);
		}

		if (datos != null) {
			x = 110;
			canvas.width = canvas.width;

			ctx.strokeRect(63, 40, 30, 35);

			cinta(ctx, x, y);

		}
	//	}
	});
	}
	




function draw(canvas, ctx, x, y) {
	canvas.width = canvas.width;
	cinta(ctx, x, y);
	ctx.strokeRect(63, 40, 30, 35);

}

function moveAndDraw(canvas, ctx) {

	
        direccion=velocidad;
        x -= direccion;
        draw(canvas,ctx,x,y);
   
}


function cinta(ctx, x, y) {
	p = 0;

	for (var i = 0; i < datos.length; i++) {
		ctx.font = "35px gothic";
		ctx.strokeText(datos[i], x+ p, y);
		p = p + 30;
	}

}


function cambio(datos, canvas, ctx) {
	est = 0;
	var i = 0;
	
	window.clearInterval(intervalo);
	automata = [ [ "0,0", "0,1" ], [ "1,2", "1,1" ] ];

	
	console.log(datos.length);
	intervalo = window.setInterval(function() {
		
		
		if (i < datos.length) {
			console.log("comprobar en consola");
					if (est != 2) {
				est = getState(est,datos[i]);
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
			}
			i++;
			moveAndDraw(canvas, ctx);
		} else {
			window.clearInterval(intervalo);
			velocidad = -1;
			intervalo = window.setInterval(function() {
				moveAndDraw(canvas, ctx);
				if (x == y) {
					window.clearInterval(intervalo);
					velocidad =1;
					
				}
			}, 32);
		}
		
	}, 1000);

}

function getState(state, leido) {
	v = automata[state][leido].split(",");
	a = v[0];
	return a;
}