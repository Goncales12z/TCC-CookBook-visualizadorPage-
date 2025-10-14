<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'conexao.php';

$input = json_decode(file_get_contents('php://input'), true);

$userId = $input['userId'] ?? null;
$ingredientIds = $input['ingredientIds'] ?? [];

if (!$userId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'ID do usuário é obrigatório.']);
    exit;
}

$pdo = conectarDB();

try {
    $pdo->beginTransaction();

    // 1. Limpa os ingredientes antigos do usuário para evitar duplicatas
    $stmt = $pdo->prepare("DELETE FROM usuario_ingredientes WHERE id_usuario = ?");
    $stmt->execute([$userId]);

    // 2. Insere os novos ingredientes selecionados
    if (!empty($ingredientIds)) {
        $stmt = $pdo->prepare("INSERT INTO usuario_ingredientes (id_usuario, id_ingrediente) VALUES (?, ?)");
        foreach ($ingredientIds as $ingredientId) {
            $stmt->execute([$userId, $ingredientId]);
        }
    }

    $pdo->commit();
    echo json_encode(['success' => true, 'message' => 'Ingredientes salvos com sucesso!']);
} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erro ao salvar ingredientes: ' . $e->getMessage()]);
}
?>