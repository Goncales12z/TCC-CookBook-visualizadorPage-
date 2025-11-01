<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');

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

    // Encontra receitas da catewgoria, ordenadas pela quantidade de ingredientes que o usuário possui
    $sql = "
        SELECT 
            r.id_receita, 
            r.nome_receita, 
            r.descricao, 
            r.imagem_url,
            (SELECT COUNT(*) FROM receita_ingredientes ri, receitas r WHERE ri.id_receita = r.id_receita) as total_ingredientes,
            (SELECT COUNT(*) 
             FROM receita_ingredientes ri, receitas r 
             WHERE ri.id_receita = r.id_receita 
             AND ri.id_ingrediente IN (SELECT ui.id_ingrediente FROM usuario_ingredientes ui WHERE ui.id_usuario = :userId)
            ) as ingredientes_em_comum
        FROM 
            receitas r
        WHERE 
            1
        ORDER BY 
            ingredientes_em_comum DESC, total_ingredientes ASC
        LIMIT 4;
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute(['userId' => $userId, 'categoria' => $categoria]);
    
    $recomendacoes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $recomendacoes
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erro ao buscar recomendações: ' . $e->getMessage()]);
}
?>
