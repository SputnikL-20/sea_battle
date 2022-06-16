
    function oneFourShip() {
	
		var x = 0;
		var map_ship = [];
		var verification = [];

		for (var i = 0; i < 4; i++) { 
			x = mapShipRandom();
			map_ship.push(x);
		  
			if ( map_ship.length == 0 ) {
				map_ship.push(x);
			} else {
				do {
					var count = 0;
					for (var v = 0; v < verification.length; v++) {
						if ( verification[v] == map_ship[i] ) {
							count++;
						}
					}
					if ( count > 0 ) {
						map_ship.pop();
						map_ship.push( mapShipRandom() );
					}
				} while ( count != 0 ); 
			}
		  
			var mas_check = [-1, -11, -10, -9, 1, 11, 10, 9];
			for ( var j = 0; j < mas_check.length; j++) {
				var tmp = Number(map_ship[i]) + mas_check[j];
				if ( String(tmp).length == 1 ) {
					tmp = "0" + tmp;
				}       
				verification.push(String(tmp));
			}
			verification.push( map_ship[i] );	
		}
		// console.log(map_ship);
		return map_ship;
    }

	function twoThreeShip(map_ship) {

		do {

			var x = 0;
			var two_ship = [];
			var count = 0;
			x = mapShipRandom();

			var two_ver_left = ['00', '10', '20', '30', '40', '50', '60', '70', '80', '90'];
			if ( two_ver_left.includes(x) ) {
				count++;
			}
			
			var borders_ship_left = [-10, -9, 1, 11, 10, 9, 8, -2, -12, -11];
			for (var i = 0; i < borders_ship_left.length; i++) {

				var tmp = (Number(x) + borders_ship_left[i]);
				if ( tmp.toString().length == 1 ) {
				  tmp = "0" + tmp;
				}	
				if ( map_ship.includes( tmp.toString() ) ) {
					count++;
				}
				map_ship.includes( x ) ? count++ : null;			
				map_ship.includes( (Number(x) - 1).toString() ) ? count++ : null;
				
				// console.log(count);
			}

			if ( count == 0 ) {
				var tmp = (Number(x) - 1).toString();
				if ( tmp.toString().length == 1 ) {
				  tmp = "0" + tmp;
				}
				two_ship.push(tmp);
				two_ship.push(x);
				// console.log(two_ship);
				return two_ship;

			} else if ( count != 0 ) {
			
				count = 0;			
				var two_ver_up = ['00', '01', '02', '03', '04', '05', '06', '07', '08' ,'09'];
				if ( two_ver_up.includes(x) ) {
					count++;
				}
				
				var borders_ship_up = [-1, -11, -21, -20, -19, -9, 1, 11, 10, 9];
				for (var i = 0; i < borders_ship_up.length; i++) {

					var tmp = (Number(x) + borders_ship_up[i]);
					if ( tmp.toString().length == 1 ) {
					  tmp = "0" + tmp;
					}		
					if ( map_ship.includes(tmp.toString()) ) {
						count++;
					}
					map_ship.includes( x ) ? count++ : null;			
					map_ship.includes( (Number(x) - 10).toString().length == 1 ? "0" + (Number(x) - 10).toString() : (Number(x) - 10).toString() ) ? count++ : null;
					
					// console.log(count);
				}

				if ( count == 0 ) {

					var tmp = (Number(x) - 10).toString();
					if ( tmp.toString().length == 1 ) {
					  tmp = "0" + tmp;
					}	
					two_ship.push(tmp);
					two_ship.push(x);
					// console.log(two_ship);
					return two_ship;
				}
			}

		} while ( count != 0 );
	}

	function mapShipRandom() {

		var x = Math.floor(Math.random() * 100);
		if ( String(x).length == 1 ) {
			x = "0" + x;
		}
		return x.toString();
	}   	
	
	function drawPast( id_canvas ) {
		var canvas = document.getElementById( id_canvas );
		try {
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d');
				ctx.fillRect(0, 0, 8, 8); 
			}		
		} catch (e) {
			null;
		}
	}
	
	function drawUserMap() {

		var use_map_ship = oneFourShip();
		var two_ship = [];
		
		document.writeln("<table>");		
		for (var j = 0; j < 10; j++) {
			document.writeln("<tr>");
			if ( j == 0 ) {
				document.writeln("<th></th>");
				for (var l = 0; l < 10; l++) {
					document.writeln("<th>" + String.fromCodePoint(97 + l) + "</th>");
				}
				document.writeln("</tr>");
				document.writeln("<tr>");
			}
			document.writeln("<td style='text-align:center;font-weight:bold;'>" + String.fromCodePoint(48 + j) + "</td>");
			for (var i = 0; i < 10; i++) {
				document.writeln("<td id=" + j + "" + i + "><canvas id='use_canvas" + j + "" + i + "' width='8' height='8'></canvas></td>");
			}
			document.writeln("</tr>");
		}
		document.writeln("</table>");

		for ( var ship of use_map_ship ) {
			document.getElementById(ship).style.backgroundColor = "blue";
		}

		for (var j = 0; j < 3; j++) {
			two_ship = twoThreeShip(use_map_ship);
			for ( var tw_ship of two_ship ) {
				document.getElementById(tw_ship).style.backgroundColor = "blue";
			}

			for (var i of two_ship) {
				use_map_ship.push(i);
			} ;
		}
		document.getElementById('use_ship').innerText = window.btoa( JSON.stringify(use_map_ship) );		
	}
	
	function drawCpuMap() {
		
		var cpu_map_ship = oneFourShip();
		var two_ship = [];

		document.writeln("<table>");		
		for (var j = 0; j < 10; j++) {
			document.writeln("<tr>");
			if ( j == 0 ) {
				document.writeln("<th></th>");
				for (var l = 0; l < 10; l++) {
					document.writeln("<th>" + String.fromCodePoint(97 + l) + "</th>");
				}
				document.writeln("</tr>");
				document.writeln("<tr>");
			}
			document.writeln("<td style='text-align:center;font-weight:bold;'>" + String.fromCodePoint(48 + j) + "</td>");
			for (var i = 0; i < 10; i++) {
				document.writeln("<td id=" + j + "" + i + "cpu-x" + " onclick='setFire(this)'><canvas id='cpu_canvas" + j + "" + i + "' width='8' height='8'></canvas></td>");
			}
			document.writeln("</tr>");
		}
		document.writeln("</table>");

		for ( var ship of cpu_map_ship ) {
			document.getElementById(ship + "cpu-x").style.backgroundColor = "white";
		}

		for (var j = 0; j < 3; j++) {
			two_ship = twoThreeShip(cpu_map_ship);
			
			for ( var tw_ship of two_ship ) {
				document.getElementById(tw_ship + "cpu-x").style.backgroundColor = "white";
			}

			for (var i of two_ship) {
				cpu_map_ship.push(i);
			} 
		}
		document.getElementById('cpu_ship').innerText = window.btoa( JSON.stringify(cpu_map_ship) );		
	}
	
	function setFire(arg) {
	
		//console.log(arg);
		var cell = document.getElementById( arg.getAttribute('id') );		
		var fire = arg.getAttribute('id').slice(0, 2);
		var id_canvas = cell.childNodes[0].getAttribute('id');
		// console.log("pset_on_field_cpu: " + fire);
		var cpu_ship = JSON.parse( window.atob( document.getElementById('cpu_ship').innerText ) );

		if ( cpu_ship.includes( fire ) ) {
			cpu_ship.forEach( (item, index) => {
			  item == fire ? cpu_ship.splice( index, 1 ) : null;	  
			  document.getElementById('cpu_ship').innerText = window.btoa( JSON.stringify( cpu_ship ) );
			  document.getElementById('cpu').innerHTML = "CPU the fleet is destroyed on " + ((10 - cpu_ship.length) * 10) + " %";
			});

			cell.style.backgroundColor = "red";
			my_toast("use exactly");
			
		} else {
		my_toast("use off target");
		drawPast( id_canvas );
		document.getElementById("pc").style.pointerEvents = "none";
		// console.log("use off target");
		setTimeout ( function(){ setFireCPU() }, 1500 );
		}
	}
	
	function setFireCPU() {
		
		var cell_field;			
		var use_ship = JSON.parse( window.atob( document.getElementById('use_ship').innerText ) );
		var map_fire = JSON.parse( document.getElementById('cpu_map_fire').innerText );
		
		do {
			var j = 0;
			cell_field = Math.floor(Math.random() * 100);
			cell_field.toString().length == 1 ? cell_field = "0" + cell_field : cell_field.toString();
			
			for ( var arg of map_fire ) {
				arg == cell_field ? j = 1 : null;
			}
			map_fire.push( cell_field.toString() );
			document.getElementById('cpu_map_fire').innerText = JSON.stringify( map_fire );
			
		} while ( j != 0 );

		// console.log("pset_on_field_use: " + cell_field );
		
		var id_canvas = "use_canvas" +  cell_field;
		
		if ( use_ship.includes( cell_field.toString() ) ) {
		
			use_ship.forEach( (item, index) => {
			  item == cell_field.toString() ? use_ship.splice( index, 1 ) : null;
			  document.getElementById('use_ship').innerText = window.btoa( JSON.stringify( use_ship ) );
			  document.getElementById('use').innerHTML = "USE the fleet is destroyed on " + ((10 - use_ship.length) * 10) + " %";
			});
			
			document.getElementById( cell_field.toString() ).style.backgroundColor = "red";
			my_toast("cpu exactly");
			setTimeout ( function(){ setFireCPU() }, 1500 );
			
			// setTimeout ( 'document.getElementById("' + cell_field.toString() + '").style.backgroundColor = "red"', 3000);
			// console.log("cpu exactly");

		} else {	
			// setTimeout ( drawPast( id_canvas ), 5000);
			
			my_toast("cpu off target");		
			drawPast( id_canvas );
			// console.log("cpu off target");
			document.getElementById("pc").style.pointerEvents = "auto";
		}			
		
	}
	
	function my_toast(arg) {
		new Toast({
			title: false,
			text: arg,
			theme: "secondary",
			autohide: true,
			interval: 1000
		  });
	}