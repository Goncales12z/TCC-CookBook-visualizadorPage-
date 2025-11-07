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

$userId = isset($_GET['userId']) ? (int) $_GET['userId'] : null;

if (!$userId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'ID do usuário e categoria são obrigatórios.']);
    exit;
}


try {
    $pdo = conectarDB();

    $stmt = $pdo->query("SELECT id_receita, nome_receita, descricao, categoria, imagem_url FROM receitas ORDER BY categoria, nome_receita");

    $receitas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stmt2 = $pdo->prepare("SELECT ri.id_receita, ri.quantidade FROM receitas r, receita_ingredientes ri WHERE r.id_receita = ri.id_receita");
    $stmt2->execute();
    $ingredientes_receita = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    foreach ($receitas as &$receita) {
        $receita['ingredients'] = [];
        foreach ($ingredientes_receita as $ingrediente) {
            if ($ingrediente['id_receita'] === $receita['id_receita']) {
                $receita['ingredients'][] = $ingrediente['quantidade'];
            }
        }
    }
    // $stmt = $pdo->prepare("SELECT rp.ordem, rp.descricao FROM receitas r, receita_passos rp WHERE r.id_receita = rp.id_receita AND r.nome_receita LIKE ?");
    // $stmt->execute(["%{$search}%"]);
    // $passos_receita = $stmt->fetchAll(PDO::FETCH_ASSOC);

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

    $stmt4 = $pdo->prepare($sql);
    $stmt4->execute(['userId' => $userId]);

    $recomendacoes = $stmt4->fetchAll(PDO::FETCH_ASSOC);

    if(!empty($recomendacoes)){
        // Adiciona os ingredientes às receitas recomendadas
        foreach ($recomendacoes as &$receita) {
            $receita['ingredients'] = [];
            foreach ($ingredientes_receita as $ingrediente) {
                if ($ingrediente['id_receita'] === $receita['id_receita']) {
                    $receita['ingredients'][] = $ingrediente['quantidade'];
                }
            }
        }
    }

    $receitasPorCategoria = [];


    // Adiciona uma categoria "Recomendações" que conterá as receitas recomendadas
    $receitasPorCategoria['Recomendações'] = [];

    foreach ($recomendacoes as $receita) {
        // Adiciona a receita à categoria "Recomendações"
        $receitasPorCategoria['Recomendações'][] = [
            'id' => $receita['id_receita'],
            'title' => $receita['nome_receita'],
            'content' => $receita['descricao'],
            'imageSrc' => $receita['imagem_url'] ?: 'https://placehold.co/500x500?text=Recipe',
            'ingredients' => $receita['ingredients'],  
            'preparation' => []
        ];  
    }

    // Adiciona uma categoria "Todos" que conterá todas as receitas
    $receitasPorCategoria['Todos'] = [];
    
    foreach ($receitas as $receita) {
        // Adiciona a receita à categoria "Todos"
        $receitasPorCategoria['Todos'][] = [
            'id' => $receita['id_receita'],
            'title' => $receita['nome_receita'],
            'content' => $receita['descricao'],
            'imageSrc' => $receita['imagem_url'] ?: 'https://placehold.co/500x500?text=Recipe',
            'ingredients' => $receita['ingredients'],  
            'preparation' => []
        ];

        // Aqui to add a receita na categoria todos 
        // $receitasPorCategoria['Todos'][] = $receitaFormatada;

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