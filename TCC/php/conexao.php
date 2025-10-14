<?php

function conectarDB() {
    $host = 'localhost';    // Servidor do banco de dados
    $dbname = 'cookbook';   // Nome do banco de dados que você criou
    $user = 'root';         // Usuário padrão do XAMPP
    $password = '';         // Senha padrão do XAMPP é vazia

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
        // Configura o PDO para lançar exceções em caso de erro
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        // Se a conexão falhar, envia uma resposta JSON estruturada em vez de usar die().
        // Isso evita que o frontend quebre ao tentar analisar a resposta.
        http_response_code(500); // Internal Server Error
        echo json_encode([
            'success' => false,
            'error' => 'Erro de conexão com o banco de dados. Verifique se o serviço MySQL (XAMPP) está rodando e se o banco de dados "cookbook" existe.'
        ]);
        exit;
    }
}

?>
