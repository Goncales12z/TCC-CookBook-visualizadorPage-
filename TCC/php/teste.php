<?php
require_once 'conexao.php'; // Inclui o arquivo de conexão com o banco de dados
$pdo = conectarDB();

$receita = "[DESCRIÇÃO]
Mousse de maracujá é um prato refrescante e doce, com sabor suave e acarajado. A textura cremosa e leve é perfeita para lanches da tarde ou café da manhã.

[INGREDIENTES]
- 250g de leite
- 100g de açúcar
- 2 colheres de sopa de amido de milho
- 2 colheres de sopa de água
- 1 colher de sopa de extrato de maracujá
- 30g de gelatina
- 200g de suco de maracujá
- Arroz
- Batata

[QUANTIDADES]
- 250g de leite
- 100g de açúcar
- 2 colheres de sopa de amido de milho
- 2 colheres de sopa de água
- 1 colher de sopa de extrato de maracujá
- 30g de gelatina
- 200g de suco de maracujá

[MODO DE PREPARO]
1. Em uma panela, misture o leite, o açúcar, o amido de milho e a água. Cozinhe em fogo médio, mexendo constantemente, até que o açúcar dissolva e a mistura engrosse.
2. Retire do fogo e adicione a gelatina e o extrato de maracujá. Misture bem e deixe esfriar.
3. Adicione o suco de maracujá à mistura e mexa até que esteja bem incorporado.
4. Despeje a mistura em uma tigela e deixe esfriar completamente.
5. Cubra com plástico filme e refrigere por pelo menos 3 horas, ou até que estiver firme.
6. Sirva fresca e deliciosa.

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
    $stmt->execute([$search, $descricaoPrato, $categoriaPrato, 1, 'https://placehold.co/500x500?text=AI+Generated+Recipe']);
    $id_nova_receita = $pdo->lastInsertId();

    echo $id_nova_receita . "<br>";

    // Processa e insere os passos do modo de preparo
    if (!empty($preparoTexto)) {
        echo "inserindo modo de preparo<br>";
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
        echo "SE INGREDIENTES TEXTO NAO ESTA VAZIO<br><br>";
        $ingredientes = preg_split('/^-\s*/m', $ingredientesTexto, -1, PREG_SPLIT_NO_EMPTY);
        echo var_dump($ingredientes) . "ingred antes<br><br>";
        $ingredientes = array_map(function ($ing) {
            $ing = trim($ing);

            // 1. Remove quantidades e medidas do início
            // Ex: "250g", "2 colheres de sopa", "1 colher de chá"
            $ing = preg_replace('/^\d+\s*(g|kg|ml|l|mg|litros?|gramas?|quilos?|miligramas?|mililitros?|unidades?|dentes?|xícaras?|colher(es)?(\s+(de\s+)?(sopa|chá|café))?)\s*/iu', '', $ing);

            // 2. Remove "de" no início que sobrou
            $ing = preg_replace('/^de\s+/iu', '', $ing);

            // 3. Remove prefixos como "extrato de", "suco de", mantendo só o principal
            //$ing = preg_replace('/^(extrato|suco|farinha|creme|polpa|molho|pasta|óleo|leite|pó|purê)\s+de\s+/iu', '', $ing);

            return trim($ing);
        }, $ingredientes);
        $ingredientes = array_map('trim', $ingredientes);
        $ingredientes = array_filter($ingredientes); // Remove vazios
        echo var_dump($ingredientes) . "ingred<br><br>";
        $quantidades = preg_split('/^-\s*/m', $quantidadesTexto, -1, PREG_SPLIT_NO_EMPTY);
        $placeholders = str_repeat("?,", count($ingredientes) - 1) . "?";
        $stmt_ingred = $pdo->prepare("SELECT i.id_ingredientes, i.nome_ingredientes FROM ingredientes i WHERE i.nome_ingredientes IN ($placeholders)");
        $stmt_ingred->execute($ingredientes);
        $qtde_ingred = $stmt_ingred->fetchAll(PDO::FETCH_NUM);
        echo var_dump($qtde_ingred) . " " . count($qtde_ingred);
        echo " qtde <br>";
        echo count($ingredientes);
        echo "ingred banco <br>";

        
                //if(count($qtde_ingred) == count($ingredientes))

        if(false)
            {
            echo "quantidade de ingredientes é idêntica <br>";

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
                echo "inserindo novo ingrediente <br>";

            // EXERCICIO 1 CADASTRAR TODOS OS INGREDIENTES NA TABELA, MESMO QUE HAJA REPETICAO
            // EXERCICIO 2 SEGUIR COM A DIFRENCA DE INGREDIENTES 
            // criar um vetor $diffIngredientes, contendo a diferença de registros entre $ingredientes - $ingredientesBanco
            // $ingredientes = ["batata", "cenoura"] e $ingredientesBanco = ["cenoura"]
            // $diffIngredientes = array_diff($ingredientes, $igredientesBanco);
            // $diffingredientes = ["batata"]
            
            for($i=0; $i < count($qtde_ingred); $i++){
                $ingredientesBanco[] = $qtde_ingred[$i][1];
            }
            echo var_dump($ingredientesBanco);
            echo "<br>";
            $diffIngredientes = array_diff($ingredientes, $ingredientesBanco);
            $diffIngredientes = array_values($diffIngredientes); // Reindexa o array
            echo var_dump($diffIngredientes);

            $ids_new_ingredientes = [];
            for ($i = 0; $i < count($diffIngredientes); $i++) {
                // inserir os ingredientes no banco (tabela ingredientes)
                $stmtR = $pdo->prepare("INSERT INTO ingredientes (nome_ingredientes) VALUES (?)");
                $stmtR->execute([$diffIngredientes[$i]]);
                $ids_new_ingredientes = $pdo->lastInsertId();
            }
            var_dump($ids_new_ingredientes);
            echo " IDS<br>";
            

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


