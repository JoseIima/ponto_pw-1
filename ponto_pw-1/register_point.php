<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $usuario_id = $_POST['usuario_id']; // ID do usuário que registrou
    $acao = $_POST['acao']; // 'entrada' ou 'saida'
    $data_hora = date('Y-m-d H:i:s'); // Data e hora atual
    $arquivo = $_POST['arquivo'] ?? null; // Nome do arquivo, se houver
    $observacoes = $_POST['observacoes'] ?? null; // Observações, se houver

    $stmt = $pdo->prepare("INSERT INTO registros (usuario_id, data_hora, acao, arquivo, observacoes) VALUES (?, ?, ?, ?, ?)");
    if ($stmt->execute([$usuario_id, $data_hora, $acao, $arquivo, $observacoes])) {
        echo "Registro de ponto criado com sucesso!";
    } else {
        echo "Erro ao registrar ponto.";
    }
}
?>
