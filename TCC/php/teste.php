<?php
require_once 'conexao.php'; // Inclui o arquivo de conexão com o banco de dados
$pdo = conectarDB();

$receita = "[DESCRIÇÃO]  
Pão francês, também conhecido como \"pain au levain\", é um pão tradicional francês com uma textura crocante e sabor doce. É servido em muitas ocasiões, como lanches da tarde, café da manhã ou como acompanhamento para pratos salgados.

[INGREDIENTES]  
- 500g de farinha de trigo
- 10g de sal
- 15g de açúcar
- 15g de fermento seco
- 350ml de água morna

[MODO DE PREPARO]  
1. Misture a farinha, o sal e o açúcar em um recipiente grande.  
2. Adicione a água e misture até que a massa comece a se formar.  
3. Adicione a levadura seca e misture bem.  
4. Deixe a massa descansar em um local quente por cerca de 1 hora, ou até que ela tenha dobrado de tamanho.  
5. Pré-aqueça o forno a 200°C.  
6. Enforme a massa em uma forma de pão e deixe-a descansar por mais 30 minutos antes de colocá-la no forno.  
7. Asse o pão por cerca de 25-30 minutos, ou até que ele tenha uma cor dourada.  

[CATEGORIA]  
Lanche da tarde";

// --- INTEGRAÇÃO COM BANCO DE DADOS (ESCRITA) ---
// 2. Salvar a nova receita gerada pela IA no banco de dados
try {
    $pdo->beginTransaction();

    // Extrai as seções da resposta da IA
    preg_match('/\[DESCRIÇÃO\](.*?)\[INGREDIENTES\]/s', $receita, $descMatches);
    $descricaoPrato = isset($descMatches[1]) ? trim($descMatches[1]) : 'Descrição não gerada.';
    echo var_dump($descricaoPrato);
    echo "<br>";
    
    preg_match('/\[INGREDIENTES\](.*?)\[MODO DE PREPARO\]/s', $receita, $ingMatches);
    $ingredientesTexto = isset($ingMatches[1]) ? trim($ingMatches[1]) : '';

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
        $quantidades = $ingredientes;
        $quantidades = array_map('trim', $ingredientes);
        $quantidades = array_filter($ingredientes);
        var_dump($quantidades);
        $procura = strchr($quantidades[3], "água");
        if($procura)
        echo var_dump($procura) . " <br>quantidades<br>";
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
        //$ingredientes = array_map('mb_strtolower', $ingredientes);
        echo var_dump($ingredientes) . "ingred<br><br>";
        $placeholders = str_repeat("?,", count($ingredientes) - 1) . "?";
        $stmt_ingred = $pdo->prepare("SELECT i.id_ingredientes, i.nome_ingredientes FROM ingredientes i WHERE LOWER(i.nome_ingredientes) IN ($placeholders)");
        $stmt_ingred->execute($ingredientes);
        $qtde_ingred = $stmt_ingred->fetchAll(PDO::FETCH_NUM);
        echo var_dump($qtde_ingred) . " " . count($qtde_ingred);
        echo " qtde ingred banco<br>";
        echo count($ingredientes);
        echo " qtde ingred<br>";

        
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
            echo var_dump(array_map('mb_strtolower', $ingredientesBanco));
            echo " banco<br>";
            $diffIngredientes = array_diff(array_map('mb_strtolower', $ingredientes), array_map('mb_strtolower', $ingredientesBanco));
            $diffIngredientes = array_values($diffIngredientes); // Reindexa o array
            echo var_dump($diffIngredientes);
            echo " DIFF<br>";

            $ids_new_ingredientes = [];
            for ($i = 0; $i < count($diffIngredientes); $i++) {
                // inserir os ingredientes no banco (tabela ingredientes)
                $stmtR = $pdo->prepare("INSERT INTO ingredientes (nome_ingredientes) VALUES (?)");
                $stmtR->execute([$diffIngredientes[$i]]);
                $ids_new_ingredientes = $pdo->lastInsertId();
            }
            var_dump($ids_new_ingredientes);
            echo " IDS<br>";

            $stmt_ids = $pdo->prepare("SELECT i.id_ingredientes, LOWER(i.nome_ingredientes) FROM ingredientes i WHERE LOWER(i.nome_ingredientes) IN ($placeholders)");
            $stmt_ids->execute(array_map('mb_strtolower', $ingredientes));
            $ids_ingredientes = $stmt_ids->fetchAll(PDO::FETCH_NUM);
            echo var_dump($ids_ingredientes) . " idsIngredientes<br>";

            // Agora inserir todos os ingredientes (novos e existentes) na tabela receita_ingredientes
            for($i=0; $i < count($quantidades); $i++)
            {
                for($j=0; $j < count($ids_ingredientes); $j++)
                {
                    echo "$quantidades[$i] {$ids_ingredientes[$j][1]} " . strchr($quantidades[$i], $ids_ingredientes[$j][1])."<br><br>";
                    if(strchr($quantidades[$i], $ids_ingredientes[$j][1]))
                    {
                        //echo "j = $j e i = $i";
                        echo "$quantidades[$i] {$ids_ingredientes[$j][1]} " . strchr($quantidades[$j], $ids_ingredientes[$j][1]) . " pass<br><br>";
                        $stmt_ingred = $pdo->prepare("INSERT INTO receita_ingredientes (id_receita, id_ingrediente, quantidade) VALUES (?, ?, ?)");
                        $stmt_ingred->execute([$id_nova_receita, $ids_ingredientes[$j][0], $quantidades[$i]]);
                        //  break;
                    }
                }

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


