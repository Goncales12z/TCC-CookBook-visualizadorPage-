<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'conexao.php';

$raw_input = file_get_contents('php://input');
$input = json_decode($raw_input, true);

$userId = $input['userId'] ?? null;
$ingredientIds = $input['ingredientIds'] ?? [];

if (!$userId) {
    echo json_encode([
        'success' => false,
        'error' => 'ID do usuário não fornecido'
    ]);
    exit;
}

try {
    $pdo = conectarDB();
    $pdo->beginTransaction();

    // 1. Remove todos os ingredientes anteriores do usuário
    $stmt = $pdo->prepare("DELETE FROM usuario_ingredientes WHERE id_usuario = ?");
    $stmt->execute([$userId]);

    // 2. Insere os novos ingredientes
    if (!empty($ingredientIds)) {
        $stmt = $pdo->prepare("INSERT INTO usuario_ingredientes (id_usuario, id_ingrediente) VALUES (?, ?)");

        foreach ($ingredientIds as $ingredientId) {
            $stmt->execute([$userId, intval($ingredientId)]);
        }
    }

    $pdo->commit();

    echo json_encode([
        'success' => true,
        'message' => 'Ingredientes salvos com sucesso!',
        'saved_count' => count($ingredientIds),
        'ingredient_ids' => $ingredientIds
    ]);
} catch (PDOException $e) {
    $pdo->rollBack();
    echo json_encode([
        'success' => false,
        'error' => 'Erro ao salvar ingredientes: ' . $e->getMessage()
    ]);
}
