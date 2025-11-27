<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Content-Type: application/json');

require_once 'conexao.php';

$recipeId = $_GET['id'] ?? null;

if (!$recipeId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'ID da receita não fornecido.']);
    exit;
}

try {
    $pdo = conectarDB();

    $stmt = $pdo->prepare("SELECT id_receita, nome_receita, descricao, categoria, imagem_url FROM receitas WHERE id_receita = ?");
    $stmt->execute([$recipeId]);
    
    $receita = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($receita) {
        $stmt_ing = $pdo->prepare("SELECT i.nome_ingredientes, ri.quantidade FROM receita_ingredientes ri JOIN ingredientes i ON ri.id_ingrediente = i.id_ingredientes WHERE ri.id_receita = ?");
        $stmt_ing->execute([$recipeId]);
        $ingredientes_db = $stmt_ing->fetchAll(PDO::FETCH_ASSOC);
        $receita['ingredients'] = array_map(fn($ing) => "{$ing['quantidade']}", $ingredientes_db);

        $stmt_prep = $pdo->prepare("SELECT descricao FROM receita_passos WHERE id_receita = ? ORDER BY ordem ASC");
        $stmt_prep->execute([$recipeId]);
        $receita['preparation'] = $stmt_prep->fetchAll(PDO::FETCH_COLUMN);

        echo json_encode(['success' => true, 'data' => $receita]);
    } else {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Receita não encontrada.']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erro ao buscar detalhes da receita: ' . $e->getMessage()]);
}
?>
