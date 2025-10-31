<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');

require_once 'conexao.php';

try {
    $pdo = conectarDB();

    $stmt = $pdo->query("SELECT id_receita, nome_receita, descricao, categoria, imagem_url FROM receitas ORDER BY categoria, nome_receita");

    $receitas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $receitasPorCategoria = [];
    
    // Adiciona uma categoria "Todos" que conterá todas as receitas
    $receitasPorCategoria['Todos'] = [];
    
    foreach ($receitas as $receita) {
        // Adiciona a receita à categoria "Todos"
        $receitasPorCategoria['Todos'][] = [
            'id' => $receita['id_receita'],
            'title' => $receita['nome_receita'],
            'content' => $receita['descricao'],
            'imageSrc' => $receita['imagem_url'] ?: 'https://placehold.co/500x500?text=Recipe'
        ];

        // Se a receita tem uma categoria específica, adiciona também à sua categoria
        $categoria = $receita['categoria'] ?: 'Outras';
        if (!isset($receitasPorCategoria[$categoria])) {
            $receitasPorCategoria[$categoria] = [];
        }
        
        $receitasPorCategoria[$categoria][] = [
            'id' => $receita['id_receita'],
            'title' => $receita['nome_receita'],
            'content' => $receita['descricao'],
            'imageSrc' => $receita['imagem_url'] ?: 'https://placehold.co/500x500?text=Recipe'
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