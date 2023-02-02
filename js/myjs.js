
 //Abrir/cerrar menu
function mostrar() {
				document.getElementById("sidebar").style.width = "200px";
				document.getElementById("contenido").style.marginLeft = "150px";
				document.getElementById("abrir").style.display = "none";
				document.getElementById("cerrar").style.display = "inline";
			}

function ocultar() {
				document.getElementById("sidebar").style.width = "0";
				document.getElementById("contenido").style.marginLeft = "0";
				document.getElementById("abrir").style.display = "inline";
				document.getElementById("cerrar").style.display = "none";
			}



// Abrir-cerrar menu movil
if (screen.width < 1024) {
	function mostrar() {
				document.getElementById("sidebar").style.width = "350px";
				document.getElementById("contenido").style.marginLeft = "270px";
                document.getElementById("abrir").style.display = "none";
				document.getElementById("cerrar").style.display = "inline";
			}
function ocultar() {
				document.getElementById("sidebar").style.width = "0";
				document.getElementById("contenido").style.marginLeft = "0";
				document.getElementById("abrir").style.display = "inline";
				document.getElementById("cerrar").style.display = "none";
			}
}