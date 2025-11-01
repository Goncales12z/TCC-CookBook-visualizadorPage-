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
$categoria = $_GET['categoria'] ?? null;

if (!$userId || !$categoria) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'ID do usuário e categoria são obrigatórios.']);
    exit;
}

try {
    $pdo = conectarDB();

    // Query corrigida: busca receitas com base nos ingredientes do usuário
    $sql = "
        SELECT 
            r.id_receita, 
            r.nome_receita, 
            r.descricao, 
            r.imagem_url,
            COUNT(DISTINCT ri.id_ingrediente) as total_ingredientes,
            COUNT(DISTINCT CASE WHEN ui.id_usuario IS NOT NULL THEN ri.id_ingrediente END) as ingredientes_em_comum
        FROM 
            receitas r
        LEFT JOIN 
            receita_ingredientes ri ON r.id_receita = ri.id_receita
        LEFT JOIN 
            usuario_ingredientes ui ON ri.id_ingrediente = ui.id_ingrediente AND ui.id_usuario = :userId
        WHERE 
            1
        GROUP BY 
            r.id_receita, r.nome_receita, r.descricao, r.imagem_url
        ORDER BY 
            ingredientes_em_comum DESC, 
            total_ingredientes ASC
        LIMIT 4
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute(['userId' => $userId]);
    
    $recomendacoes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $recomendacoes
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'Erro ao buscar recomendações: ' . $e->getMessage()
    ]);
}
?>