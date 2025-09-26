<?php 
header('Access-Control-Allow-Origin: http://localhost:3000'); // Porta do React
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

// Configurações do Ollama
$ollamaUrl = 'http://localhost:11434/api/generate';
$model = 'llama3.2';


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

// Criar o prompt
//$elementsString = implode(', ', $search);
$prompt = "Faça uma receita de {$search}. Explique o passo a passo de forma clara e educativa em português.";


// Parâmetros do Ollama, vocês não vão precisar mudar nada aqui. É uma forma de "calibrar" como o modelo responde
$data = [
    'model' => $model,
    'prompt' => $prompt,
    'stream' => false,
    'options' => [
        'temperature' => 0.7,
        'max_tokens' => 500
    ]
];


// Curl = command url, é como se o script php estivesse chamando diretamente o modelo que está rodando na nossa máquina. Ao invés de nós mandarmos o prompt, o script php que vai
$ch = curl_init($ollamaUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 300);        // 3 minutos total
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);  // 30s para conectar
curl_setopt($ch, CURLOPT_LOW_SPEED_LIMIT, 1);  // Mínimo 1 byte/segundo
curl_setopt($ch, CURLOPT_LOW_SPEED_TIME, 0);


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

if (!$responseData) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'Resposta inválida do Ollama. Response: ' . $response
    ]);
    exit;
}

// Verificar se há erro na resposta do Ollama
if (isset($responseData['error'])) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'Erro do Ollama: ' . $responseData['error']
    ]);
    exit;
}

// Extrair a composição gerada
$receita = isset($responseData['response']) ? $responseData['response'] : '';

if (empty($receita)) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'Nenhuma composição foi gerada'
    ]);
    exit;
}

// Retornar sucesso
$final_response = [
    'success' => true,
    'receita' => trim($receita),
    'elements_used' => $search
];

echo json_encode($final_response);

?>