// JavaScript Document

//Desaparecer ayuda 
$(document).ready(function() {
    setTimeout(function() {
        $(".guia").fadeOut(1000);
    },4500);
});



//Abrir/cerrar menu
function mostrar() {
				document.getElementById("sidebar").style.width = "16%";
				document.getElementById("contenido").style.marginLeft = "14%";
				document.getElementById("abrir").style.display = "none";
				document.getElementById("cerrar").style.display = "inline";
			}
function ocultar() {
				document.getElementById("sidebar").style.width = "0";
				document.getElementById("contenido").style.marginLeft = "0";
				document.getElementById("abrir").style.display = "inline";
				document.getElementById("cerrar").style.display = "none";
			}

/*/Abrir/cerrar menu movil
if (screen.width > 1024) {
	function mostrar() {
				document.getElementById("sidebar").style.width = "60%";
				document.getElementById("contenido").style.marginLeft = "59%";
				
			}
} */

//Menu Toggle
$(document).ready(function(){
				$("#eventos").click(function(){			
					$(".dropdown-content").slideToggle();
				});
			});
				
			
			

//Horizontal 
$(function() {
			
			$('#wraper')
				.mousewheel(function(event, delta, deltaX, deltaY) {
					var o = '';
					if (delta > 0)
						//o = '#test4: up ('+delta+')';
						$("#wraper").animate({
							scrollLeft: ($("#wraper").scrollLeft() - 100)
						}, 1);
						
					else if (delta < 0)
						//o = '#test4: down ('+delta+')';
						$("#wraper").animate({
							scrollLeft: ($("#wraper").scrollLeft() + 100)
						}, 1);
					
					if (deltaX > 0)
						o = o + ', east ('+deltaX+')';
					else if (deltaX < 0)
						o = o + ', west ('+deltaX+')';
					
					if (deltaY > 0)
						o = o + ', north ('+deltaY+')';
					else if (deltaY < 0)
						o = o + ', south ('+deltaY+')';
					
					return false;
				})
				.unmousewheel(testRemoval);
		});
		
