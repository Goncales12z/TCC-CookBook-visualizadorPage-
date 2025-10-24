<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');

require_once 'conexao.php';

try {
    $pdo = conectarDB();

    $stmt = $pdo->query("SELECT id_receita, nome_receita, descricao, categoria, imagem_url FROM receitas WHERE categoria IS NOT NULL AND categoria != '' ORDER BY categoria, nome_receita");

    $receitas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $receitasPorCategoria = [];
    foreach ($receitas as $receita) {
        $categoria = $receita['categoria'];
        if (!isset($receitasPorCategoria[$categoria])) {
            $receitasPorCategoria[$categoria] = [];
        }
        
        $receitasPorCategoria[$categoria][] = [
            'id' => $receita['id_receita'],
            'title' => $receita['nome_receita'],
            'content' => $receita['descricao'],
            'imageSrc' => $receita['imagem_url']
        ];
    }

    echo json_encode([
        'success' => true,
        'data' => $receitasPorCategoria
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erro ao buscar receitas: ' . $e->getMessage()]);
}
?>