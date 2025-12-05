<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'conexao.php';

// Pega o ID do usuário da query string
$userId = $_GET['userId'] ?? null;

if (!$userId) {
    echo json_encode([
        'success' => false,
        'error' => 'ID do usuário não fornecido'
    ]);
    exit;
}

try {
    $pdo = conectarDB();

    // Busca os ingredientes do usuário
    $stmt = $pdo->prepare("
        SELECT ui.id_ingrediente 
        FROM usuario_ingredientes ui 
        WHERE ui.id_usuario = ?
    ");

    $stmt->execute([$userId]);
    $ingredientes = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // Converte todos para inteiros
    $ingredientes = array_map('intval', $ingredientes);

    echo json_encode([
        'success' => true,
        'data' => $ingredientes,
        'count' => count($ingredientes),
        'userId' => intval($userId)
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Erro ao buscar ingredientes do usuário: ' . $e->getMessage()
    ]);
}
