<?php
// Exibir todos os erros
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Incluir o arquivo de configuração
include 'config.php';

// Receber dados do formulário
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Debug: Verifique se os dados estão sendo recebidos corretamente
    if (isset($_POST['username'], $_POST['password'], $_POST['role'])) {
        $user = $_POST['username'];
        $pass = $_POST['password'];
        $role = $_POST['role'];
    } else {
        die("Dados do formulário não foram recebidos.");
    }

    // Preparar e vincular
    $stmt = $conn->prepare("INSERT INTO usuarios (username, password, role) VALUES (?, ?, ?)");
    
    if ($stmt === false) {
        die("Erro na preparação do statement: " . $conn->error);
    }

    $stmt->bind_param("sss", $user, $pass, $role);

    // Executar
    if ($stmt->execute()) {
        // Redirecionar para a página de login com mensagem de sucesso
        header("Location: login.html?msg=Usuário criado com sucesso!");
        exit();
    } else {
        // Redirecionar para a página de login com mensagem de erro
        header("Location: login.html?msg=Erro ao criar usuário: " . $stmt->error);
        exit();
    }

    // Fechar a conexão
    $stmt->close();
} else {
    echo "Método de requisição inválido.";
}

$conn->close();
?>
