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

// 1. Ler os dados de entrada
$input = json_decode(file_get_contents('php://input'), true);

$email = $input['email'] ?? '';
$senha = $input['password'] ?? '';

if (empty($email) || empty($senha)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'E-mail e senha são obrigatórios.']);
    exit;
}

$pdo = conectarDB();

// 2. Buscar o usuário pelo e-mail
try {
    $stmt = $pdo->prepare("SELECT id_usuario, nome_usuario, email, senha_hash FROM usuario WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // 3. Verificar se o usuário existe e se a senha está correta
    if ($user && password_verify($senha, $user['senha_hash'])) {
        // Senha correta!
        
        // Remove a senha hash da resposta por segurança
        unset($user['senha_hash']);

        echo json_encode([
            'success' => true, 
            'message' => 'Login realizado com sucesso!',
            'user' => $user // Envia os dados do usuário para o frontend
        ]);

    } else {
        // Usuário não encontrado ou senha incorreta
        http_response_code(401); // 401 Unauthorized
        echo json_encode(['success' => false, 'error' => 'E-mail ou senha inválidos.']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erro no servidor: ' . $e->getMessage()]);
    exit;
}
?>