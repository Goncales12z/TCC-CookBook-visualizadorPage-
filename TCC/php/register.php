<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'conexao.php';

// 1. Ler e validar os dados de entrada
$input = json_decode(file_get_contents('php://input'), true);

$nome = $input['name'] ?? '';
$email = $input['email'] ?? '';
$data_nasc = $input['birthdate'] ?? '';
$senha = $input['password'] ?? '';
$confirmarSenha = $input['confirm'] ?? '';

if (empty($nome) || empty($email) || empty($data_nasc) || empty($senha) || empty($confirmarSenha)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Todos os campos são obrigatórios.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Formato de e-mail inválido.']);
    exit;
}

if ($senha !== $confirmarSenha) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'As senhas não coincidem.']);
    exit;
}

if (strlen($senha) < 6) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'A senha deve ter pelo menos 6 caracteres.']);
    exit;
}

$pdo = conectarDB();

// 2. Verificar se o e-mail já existe
try {
    $stmt = $pdo->prepare("SELECT id_usuario FROM usuario WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        http_response_code(409); // 409 Conflict
        echo json_encode(['success' => false, 'error' => 'Este e-mail já está cadastrado.']);
        exit;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erro ao verificar o e-mail: ' . $e->getMessage()]);
    exit;
}

// 3. Criptografar a senha e inserir o novo usuário
try {
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO usuario (nome_usuario, email, data_nasc, senha_hash) VALUES (?, ?, ?, ?)");
    $stmt->execute([$nome, $email, $data_nasc, $senhaHash]);

    echo json_encode(['success' => true, 'message' => 'Conta criada com sucesso!']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erro ao criar a conta: ' . $e->getMessage()]);
    exit;
}
