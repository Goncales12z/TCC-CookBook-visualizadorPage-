<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'conexao.php';

$userId = $_GET['userId'] ?? null;

if (!$userId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'ID do usuário é obrigatório.']);
    exit;
}

try {
    $pdo = conectarDB();
    $stmt = $pdo->prepare("SELECT id_ingrediente FROM usuario_ingredientes WHERE id_usuario = ?");
    $stmt->execute([$userId]);
    $userIngredients = $stmt->fetchAll(PDO::FETCH_COLUMN, 0); // Retorna apenas a coluna id_ingrediente

    echo json_encode(['success' => true, 'data' => $userIngredients]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erro ao buscar ingredientes do usuário: ' . $e->getMessage()]);
}
?>
