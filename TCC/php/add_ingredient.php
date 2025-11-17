<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "conexao.php";


$data = json_decode(file_get_contents("php://input"), true);

$nome = $data["nome"] ?? "";
$tipo = $data["tipo"] ?? "";

$pdo = conectarDB();

try {
    $pdo->beginTransaction();
    if (!$nome || !$tipo) {
    echo json_encode(["success" => false, "error" => "Dados incompletos"]);
    exit;
}

    $stmt = $pdo->prepare("INSERT INTO ingredientes (nome_ingredientes, tipo) VALUES (?, ?)");
    $stmt->execute([$nome, $tipo]);

    $pdo->commit();
    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erro add ingredientes: ' . $e->getMessage()]);
}
?>