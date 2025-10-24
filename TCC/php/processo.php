<?php 
header('Access-Control-Allow-Origin: http://localhost:3000'); // Porta do React
require_once 'conexao.php'; // Inclui o arquivo de conexão com o banco de dados

header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
// Ler dados JSON do corpo da requisição
$raw_input = file_get_contents('php://input');

$input = json_decode($raw_input, true);

$userId = $input['userId'] ?? null;


if (!$userId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'ID do usuário é obrigatório.']);
    exit;
}



if (!$input || !isset($input['search']) || empty(trim($input['search']))) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Dados inválidos']);
    exit;
}

$search = trim($input['search']);

if (empty($search)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Nenhum elemento selecionado']);
    exit;
}

// --- INTEGRAÇÃO COM BANCO DE DADOS (LEITURA) ---
$pdo = conectarDB();

// 1. Tenta encontrar a receita no banco de dados
try {
    $stmt = $pdo->prepare("SELECT nome_receita, descricao FROM receitas WHERE nome_receita LIKE ?");
    $stmt->execute(["%{$search}%"]); // Usando LIKE para uma busca mais flexível
    $receita_existente = $stmt->fetch(PDO::FETCH_ASSOC);
    $stmt1 = $pdo->prepare("SELECT ing.nome_ingredientes FROM ingredientes ing, usuario_ingredientes ui WHERE ing.id_ingredientes = ui.id_ingrediente AND ui.id_usuario = ?");
    $stmt1->execute([$userId]);
    $ingrediente_existente = $stmt1->fetchAll(PDO::FETCH_COLUMN);
    if ($receita_existente) {
        // Se encontrou, retorna a receita do banco e finaliza o script
        echo json_encode([
            'success' => true,
            'receita' => trim($receita_existente['descricao']),
            'elements_used' => $receita_existente['nome_receita'], // Retorna o nome exato do prato do BD
            'source' => 'database' // Informa que a fonte foi o banco de dados
        ]);
        exit;
    }
} catch (PDOException $e) {
    // Se houver um erro na consulta SQL (ex: tabela ou coluna não existe),
    // envie uma resposta de erro JSON e pare a execução.
    http_response_code(500); // Internal Server Error
    echo json_encode([
        'success' => false,
        'error' => 'Erro ao consultar o banco de dados: ' . $e->getMessage()
    ]);
    exit;
}
// Configurações do Ollama
$ollamaUrl = 'http://localhost:11434/api/generate';
$model = 'llama3.2'; // IMPORTANTE: Este nome deve ser EXATAMENTE igual ao que aparece no comando 'ollama list'


// Teste se o Ollama está rodando
$test_ch = curl_init('http://localhost:11434/api/tags');
curl_setopt($test_ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($test_ch, CURLOPT_TIMEOUT, 5);
$test_response = curl_exec($test_ch);
$test_error = curl_error($test_ch);
curl_close($test_ch);

if ($test_error) {
    echo json_encode([
        'success' => false, 
        'error' => 'Ollama não está rodando ou não está acessível: ' . $test_error
    ]);
    exit;
}

// --- CRIAÇÃO DO PROMPT PARA A IA ---
// Transforma a lista de ingredientes do usuário em uma string
$ingredientesDisponiveis = implode(', ', $ingrediente_existente);

if (!empty($ingredientesDisponiveis)) {
    // Prompt aprimorado pedindo uma estrutura específica
    $prompt = "Crie uma receita para '{$search}' usando principalmente estes ingredientes que eu tenho: {$ingredientesDisponiveis}. Formate a resposta EXATAMENTE assim:\n\n[DESCRIÇÃO]\nUma breve descrição do prato.\n\n[INGREDIENTES]\n- Ingrediente 1 (quantidade)\n- Ingrediente 2 (quantidade)\n\n[MODO DE PREPARO]\n1. Primeiro passo.\n2. Segundo passo.";
} else {
    // Prompt padrão aprimorado
    $prompt = "Crie uma receita para '{$search}'. Formate a resposta EXATAMENTE assim:\n\n[DESCRIÇÃO]\nUma breve descrição do prato.\n\n[INGREDIENTES]\n- Ingrediente 1 (quantidade)\n- Ingrediente 2 (quantidade)\n\n[MODO DE PREPARO]\n1. Primeiro passo.\n2. Segundo passo.";
}

$data = [
    'model' => $model,
    'prompt' => $prompt,
    'stream' => false,
    'options' => [
        'temperature' => 0.7,
        'max_tokens' => 500
    ]
];


$ch = curl_init($ollamaUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 300);        // Timeout total de 5 minutos.
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);  // 30s para conectar.
// As linhas abaixo foram removidas para evitar o erro de "operação muito lenta".
// A configuração de limite de velocidade foi removida para permitir que a IA processe sem interrupção.


// Executar requisição
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);


curl_close($ch);

// Verificar erros de cURL
if ($curlError) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'Erro de conexão com o Ollama: ' . $curlError
    ]);
    exit;
}

// Verificar código HTTP
if ($httpCode !== 200) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'Ollama retornou erro HTTP: ' . $httpCode . '. Response: ' . $response
    ]);
    exit;
}

// Decodificar resposta
$responseData = json_decode($response, true);

// Verificar se há erro na resposta do Ollama
if (isset($responseData['error'])) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'Erro do Ollama: ' . $responseData['error']
    ]);
    exit;
}

// Verificar se a resposta da receita existe e não está vazia
if (!isset($responseData['response']) || empty(trim($responseData['response']))) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'A IA não gerou uma receita. Resposta recebida: ' . $response
    ]);
    exit;
}

// Extrair a composição gerada
$receita = $responseData['response'];

// --- INTEGRAÇÃO COM BANCO DE DADOS (ESCRITA) ---
// 2. Salvar a nova receita gerada pela IA no banco de dados
try {
    $pdo->beginTransaction();

    // Extrai as seções da resposta da IA
    preg_match('/\[DESCRIÇÃO\](.*?)\[INGREDIENTES\]/s', $receita, $descMatches);
    $descricaoPrato = isset($descMatches[1]) ? trim($descMatches[1]) : 'Descrição não gerada.';

    preg_match('/\[INGREDIENTES\](.*?)\[MODO DE PREPARO\]/s', $receita, $ingMatches);
    $ingredientesTexto = isset($ingMatches[1]) ? trim($ingMatches[1]) : '';

    preg_match('/\[MODO DE PREPARO\](.*)/s', $receita, $prepMatches);
    $preparoTexto = isset($prepMatches[1]) ? trim($prepMatches[1]) : '';

    // Insere a receita principal e obtém o ID
    $stmt = $pdo->prepare("INSERT INTO receitas (nome_receita, descricao, categoria, id_usuario) VALUES (?, ?, ?, ?)");
    $stmt->execute([$search, $descricaoPrato, 'Gerada por IA', $userId]);
    $id_nova_receita = $pdo->lastInsertId();

    // Processa e insere os passos do modo de preparo
    if (!empty($preparoTexto)) {
        $passos = preg_split('/^\d+\.\s*/m', $preparoTexto, -1, PREG_SPLIT_NO_EMPTY);
        $stmt_passo = $pdo->prepare("INSERT INTO receita_passos (id_receita, ordem, descricao) VALUES (?, ?, ?)");
        foreach ($passos as $ordem => $passo) {
            if (!empty(trim($passo))) {
                $stmt_passo->execute([$id_nova_receita, $ordem + 1, trim($passo)]);
            }
        }
    }

    // A lógica para salvar os ingredientes da IA seria mais complexa,
    // pois exigiria encontrar os IDs de cada ingrediente no banco.
    // Por enquanto, salvamos a descrição e os passos.

    $pdo->commit();
} catch (PDOException $e) {
    $pdo->rollBack();
    // Não vamos parar o script se falhar ao salvar (ex: receita duplicada),
    // mas podemos logar o erro para depuração.
    error_log("Falha ao salvar receita no banco: " . $e->getMessage());
}

// Retornar sucesso
$final_response = [
    'success' => true,
    'receita' => trim($receita),
    'elements_used' => $search
];

echo json_encode($final_response);

?>