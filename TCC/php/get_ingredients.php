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

try {
    $pdo = conectarDB();
    $stmt = $pdo->query("SELECT id_ingredientes, nome_ingredientes, tipo FROM ingredientes ORDER BY id_ingredientes LIMIT 10");
    $ingredientes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Organiza os ingredientes por tipo para exibir em grupos
    $groupedIngredients = [];
    foreach ($ingredientes as $ingrediente) {
        $tipo = $ingrediente['tipo'] ?: 'Outros'; // Agrupa ingredientes sem tipo em 'Outros'
        $groupedIngredients[$tipo][] = [
            'id' => $ingrediente['id_ingredientes'],
            'nome' => $ingrediente['nome_ingredientes']
        ];
    }

    echo json_encode(['success' => true, 'data' => $groupedIngredients]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erro ao buscar ingredientes: ' . $e->getMessage()]);
}
?>