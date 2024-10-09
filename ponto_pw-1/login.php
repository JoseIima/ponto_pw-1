<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Verifica se o usuário existe
    $sql = "SELECT * FROM usuarios WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Usuário autenticado com sucesso
        header("Location: ponto.html"); // Redireciona para a página de bater ponto
        exit();
    } else {
        echo "Usuário ou senha incorretos!";
    }
}

$conn->close();
?>
