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

    $stmt = $pdo->prepare("SELECT ri.quantidade FROM receitas r, receita_ingredientes ri WHERE r.id_receita = ri.id_receita AND r.nome_receita LIKE ?");
    $stmt->execute(["%{$search}%"]);
    $ingredientes_receita = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //$ingredientes_receita = array_column($ingredientes_receita, 'quantidade'); faz a msm coisa que o foreach
    foreach ($ingredientes_receita as &$ingrediente) {
        $ingrediente = $ingrediente['quantidade'];
    }
    $ingredientes = "";
    for($i=0; $i < count($ingredientes_receita); $i++) {
        $ingredientes = $ingredientes . $ingredientes_receita[$i] . "\n";
    }

    $stmt = $pdo->prepare("SELECT rp.ordem, rp.descricao FROM receitas r, receita_passos rp WHERE r.id_receita = rp.id_receita AND r.nome_receita LIKE ?");
    $stmt->execute(["%{$search}%"]);
    $passos_receita = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $passos = "";
    for($i=0; $i < count($passos_receita); $i++) {
        $passos = $passos . $passos_receita[$i]['ordem'] . ". " . $passos_receita[$i]['descricao'] . "\n";
    }

    $stmt1 = $pdo->prepare("SELECT ing.nome_ingredientes FROM ingredientes ing, usuario_ingredientes ui WHERE ing.id_ingredientes = ui.id_ingrediente AND ui.id_usuario = ?");
    $stmt1->execute([$userId]);
    $ingrediente_existente = $stmt1->fetchAll(PDO::FETCH_COLUMN);
    // Formatar ingredientes
    
    if ($receita_existente) {
        // Se encontrou, retorna a receita do banco e finaliza o script
        echo json_encode([
            'success' => true,
            'receita' => trim($receita_existente['descricao']) . $ingredientes . $passos,
            'ingredientes' => $ingredientes_receita,
            'passos' => $passos_receita,
            'elements_used' => $receita_existente['nome_receita'],
            'source' => 'database'
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


    // Prompt padrão aprimorado
    $prompt = "Crie uma receita para {$search}.
A resposta deve seguir EXATAMENTE o formato abaixo, sem adicionar explicações extras, comentários ou emojis:

[DESCRIÇÃO]  
Uma breve descrição do prato, explicando seu sabor, textura e quando costuma ser servido.

[INGREDIENTES]  
- Ingrediente 1  
- Ingrediente 2  
- Ingrediente 3  
(adicione quantos ingredientes forem necessários)

[QUANTIDADES]  
- Quantidade do Ingrediente 1  
- Quantidade do Ingrediente 2  
- Quantidade do Ingrediente 3  
(adicione quantos ingredientes forem necessários)

[MODO DE PREPARO]  
1. Descreva o primeiro passo de forma clara e prática.  
2. Continue listando os passos seguintes até o preparo estar completo.  
(adicione quantos passos forem necessários)

[CATEGORIA]  
Escolha **uma** categoria entre: 'Doces', 'Salgados', 'Almoço', 'Jantar', 'Café da manhã', 'Lanche da tarde' ou 'Outros'.";

$data = [
    'model' => $model,
    'prompt' => $prompt,
    'stream' => false,
    'options' => [
        'temperature' => 0.6,
        'max_tokens' => 500
    ]
];

/* para falar com o modelo
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
*/

$receita = "[DESCRIÇÃO]
Risotto de abobora é um prato cremoso e saboroso, feito com a abobora como ingrediente principal. O risoto tem uma textura suave e leve, com sabores doce e levemente amargo da abobora. É típico de refeições à noite.

[INGREDIENTES]
- 250g de arroz
- 1 abobora média picada
- 2 colheres de sopa de azeite
- 1 cebola picada
- 3 dentes de alho picados
- 500ml de caldo de galinha
- Sal e pimenta a gosto

[QUANTIDADES]
- 250g de arroz
- 1 abobora média
- 2 colheres de sopa de azeite
- 1 cebola
- 3 dentes de alho

[MODO DE PREPARO]
1. Em uma panela grande, aqueça o azeite em fogo médio e adicione a cebola e o alho. Cozinhe até que a cebola esteja translúcida.

2. Adicione a abobora picada à panela e cozinhe por 5 minutos, mexendo ocasionalmente.

3. Adicione o arroz à panela e cozinhe por 1-2 minutos, mexendo constantemente.

4. Adicione o caldo de galinha à panela, uma xícara de cada vez, mexendo bem após cada adição.

5. Cozinhe o risoto por cerca de 20-25 minutos, ou até que o arroz esteja cozido e a abobora tenha se absorvido completamente.

6. Tempere com sal e pimenta a gosto.

[CATEGORIA]
Jantar";

// --- INTEGRAÇÃO COM BANCO DE DADOS (ESCRITA) ---
// 2. Salvar a nova receita gerada pela IA no banco de dados
try {
    $pdo->beginTransaction();

    // Extrai as seções da resposta da IA
    preg_match('/\[DESCRIÇÃO\](.*?)\[INGREDIENTES\]/s', $receita, $descMatches);
    $descricaoPrato = isset($descMatches[1]) ? trim($descMatches[1]) : 'Descrição não gerada.';
    
    preg_match('/\[INGREDIENTES\](.*?)\[QUANTIDADES\]/s', $receita, $ingMatches);
    $ingredientesTexto = isset($ingMatches[1]) ? trim($ingMatches[1]) : '';

    preg_match('/\[QUANTIDADES\](.*?)\[MODO DE PREPARO\]/s', $receita, $ingMatches);
    $quantidadesTexto = isset($ingMatches[1]) ? trim($ingMatches[1]) : '';

    preg_match('/\[MODO DE PREPARO\](.*?)\[CATEGORIA\]/s', $receita, $prepMatches);
    $preparoTexto = isset($prepMatches[1]) ? trim($prepMatches[1]) : '';

    preg_match('/\[CATEGORIA\](.*)/s', $receita, $catMatches);
    $categoriaPrato = isset($catMatches[1]) ? trim($catMatches[1]) : '';

    // Insere a receita principal e obtém o ID
    $stmt = $pdo->prepare("INSERT INTO receitas (nome_receita, descricao, categoria, id_usuario, imagem_url) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$search, $descricaoPrato, $categoriaPrato, $userId, 'https://placehold.co/500x500?text=AI+Generated+Recipe']);
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

    $ingredientes = null;
    $quantidades = null;

    if(!empty($ingredientesTexto)){
        $ingredientes = preg_split('/^-\s*/m', $ingredientesTexto, -1, PREG_SPLIT_NO_EMPTY);
        $quantidades = preg_split('/^-\s*/m', $quantidadesTexto, -1, PREG_SPLIT_NO_EMPTY);
        $placeholders = str_repeat("?,", count($ingredientes) - 1) . "?";
        $stmt_ingred = $pdo->prepare("SELECT i.id_ingredientes FROM ingredientes i WHERE i.nome_ingredientes IN ($placeholders)");
        $stmt_ingred->execute($ingredientes);
        $qtde_ingred = $stmt_ingred->fetchAll(PDO::FETCH_NUM);
        if(count($qtde_ingred) == count($ingredientes)){
            $i = 0;
            $stmt_ingred = $pdo->prepare("INSERT INTO receita_ingredientes (id_receita, id_ingredientes, quantidade) VALUES (?, ?, ?)");
            foreach ($ingredientes as $ingrediente) {
            if (!empty($ingrediente)) {
                $stmt_passo->execute([$id_nova_receita, $qtde_ingred[$i], $quantidades]);
                $i++;
            }
        }
        }
        else{
            // EXERCICIO 1 CADASTRAR TODOS OS INGREDIENTES NA TABELA, MESMO QUE HAJA REPETICAO
            // EXERCICIO 2 SEGUIR COM A DIFRENCA DE INGREDIENTES 
            // criar um vetor $diffIngredientes, contendo a diferença de registros entre $ingredientes - $ingredientesBanco
            // $ingredientes = ["batata", "cenoura"] e $ingredientesBanco = ["cenoura"]
            // $diffIngredientes = array_diff($ingredientes, $igredientesBanco);
            // $diffingredientes = ["batata"]
            /*
            for($i=0; $i < count($ingredientes); $i++){

                $ingrediente = $ingredientes[$i];
                // ATENÇÃO nesse vetor de quantidades 
                $quantidade = $quantidadesTexto[$i];
            }
                */

            /*
            for($i=0; $i < count($ingredientes); $i++){
                // inserir os ingredientes no banco (tabela ingredientes)
                $stmtR = $pdo->prepare("INSERT INTO ingredientes (nome_ingredientes) VALUES (?)");
                $stmtR->execute([$ingredientes]);

            }
                */
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
    'elements_used' => $search,
    'ingredientes' => $ingredientes,
    'quantidades' => $quantidades,
    'ingredientesTexto' => var_dump($ingredientesTexto)
];

echo json_encode($final_response);
