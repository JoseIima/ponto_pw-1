<?php
$servername = "localhost"; // ou o endereço do seu servidor
$username = "root";
$password = "";
$dbname = "controle_ponto";

// Criando a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificando a conexão
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
