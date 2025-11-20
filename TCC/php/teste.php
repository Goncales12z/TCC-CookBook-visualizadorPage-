<?php
require_once 'conexao.php'; // Inclui o arquivo de conexão com o banco de dados
$pdo = conectarDB();

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
    echo var_dump($descricaoPrato);
    echo "<br>";
    
    preg_match('/\[INGREDIENTES\](.*?)\[QUANTIDADES\]/s', $receita, $ingMatches);
    $ingredientesTexto = isset($ingMatches[1]) ? trim($ingMatches[1]) : '';

    preg_match('/\[QUANTIDADES\](.*?)\[MODO DE PREPARO\]/s', $receita, $qtdMatches);
    $quantidadesTexto = isset($qtdMatches[1]) ? trim($qtdMatches[1]) : '';

    preg_match('/\[MODO DE PREPARO\](.*?)\[CATEGORIA\]/s', $receita, $prepMatches);
    $preparoTexto = isset($prepMatches[1]) ? trim($prepMatches[1]) : '';

    preg_match('/\[CATEGORIA\](.*)/s', $receita, $catMatches);
    $categoriaPrato = isset($catMatches[1]) ? trim($catMatches[1]) : '';


    $search = "batata dgsdfdgdsfg";

    // Insere a receita principal e obtém o ID
    $stmt = $pdo->prepare("INSERT INTO receitas (nome_receita, descricao, categoria, id_usuario, imagem_url) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$search, $descricaoPrato, $categoriaPrato, $userId, 'https://placehold.co/500x500?text=AI+Generated+Recipe']);
    $id_nova_receita = $pdo->lastInsertId();

    echo $id_nova_receita;

    // Processa e insere os passos do modo de preparo
    if (!empty($preparoTexto)) {
        echo "inserindo modo de preparo";
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
        echo "SE INGREDIENTES TEXTO NAO ESTA VAZIO";
        $ingredientes = preg_split('/^-\s*/m', $ingredientesTexto, -1, PREG_SPLIT_NO_EMPTY);
        echo var_dump($ingredientes);
        $quantidades = preg_split('/^-\s*/m', $quantidadesTexto, -1, PREG_SPLIT_NO_EMPTY);
        $placeholders = str_repeat("?,", count($ingredientes) - 1) . "?";
        $stmt_ingred = $pdo->prepare("SELECT i.id_ingredientes FROM ingredientes i WHERE i.nome_ingredientes IN ($placeholders)");
        $stmt_ingred->execute($ingredientes);
        $qtde_ingred = $stmt_ingred->fetchAll(PDO::FETCH_NUM);
        
                //if(count($qtde_ingred) == count($ingredientes))

        if(false)
            {
            echo "quantidade de ingredientes é idêntica";

            $i = 0;
            $stmt_ingred = $pdo->prepare("INSERT INTO receita_ingredientes (id_receita, id_ingredientes, quantidade) VALUES (?, ?, ?)");
            foreach ($ingredientes as $ingrediente) {
                if (!empty($ingrediente)) {
                    $stmt_passo->execute([$id_nova_receita, $ingrediente, $quantidades[$i]]);
                    $i++;
                }
             }
        }
        else{
                echo "inserindo novo ingrediente";

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
            echo "<br>";
            echo var_dump($ingredientes);
            echo "<br>";
            for($i=0; $i < count($ingredientes); $i++){
                // inserir os ingredientes no banco (tabela ingredientes)
                $stmtR = $pdo->prepare("INSERT INTO ingredientes (nome_ingredientes) VALUES (?)");
                $stmtR->execute([$ingredientes[$i]]);

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


