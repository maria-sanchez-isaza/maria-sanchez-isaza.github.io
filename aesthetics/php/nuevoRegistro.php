<?php

$phpNombre = $_POST["nombre"];
$phpCorreo = $_POST["correo"];
$phpFechaNacimiento = $_POST["fecha_nacimiento"];
$phpCelular = $_POST["celular"];


$servername = "localhost";
$username = "id5885630_ariam1900";
$password = "Wasa123";
$dbname= "id5885630_mydb";

$conn = mysqli_connect($servername, $username, $password, $dbname);
//validar conexión
if(!$conn){ 
    die("Falló la conexión :".mysqli_connect_error());
}

$sql = "INSERT INTO registro(nombre,correo,fecha_nacimiento,celular) VALUES ('$phpNombre','$phpCorreo','$phpFechaNacimiento','$phpCelular')";

if(mysqli_query($conn,$sql)){ 
    header('Location: ../html/suscripcion.html');
    }
else{
    echo "Error: ".$sql."<br>".mysqli_error($conn);
    }
	
?>