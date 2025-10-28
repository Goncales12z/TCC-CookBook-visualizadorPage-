-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 28/10/2025 às 01:23
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `cookbook`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `ingredientes`
--

CREATE TABLE `ingredientes` (
  `id_ingredientes` int(5) NOT NULL,
  `nome_ingredientes` varchar(30) NOT NULL,
  `tipo` enum('Proteína','Carboidrato','Lipídio') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `ingredientes`
--

INSERT INTO `ingredientes` (`id_ingredientes`, `nome_ingredientes`, `tipo`) VALUES
(1, 'Frango', 'Proteína'),
(2, 'Carne Bovina', 'Proteína'),
(3, 'Carne Suína', 'Proteína'),
(4, 'Peixe', 'Proteína'),
(5, 'Ovo', 'Proteína'),
(6, 'Feijão', 'Proteína'),
(7, 'Lentilha', 'Proteína'),
(8, 'Grão de Bico', 'Proteína'),
(9, 'Tofu', 'Proteína'),
(10, 'Queijo', 'Proteína'),
(11, 'Arroz', 'Carboidrato'),
(12, 'Macarrão', 'Carboidrato'),
(13, 'Batata', 'Carboidrato'),
(14, 'Pão', 'Carboidrato'),
(15, 'Farinha de Trigo', 'Carboidrato'),
(16, 'Farinha de Mandioca', 'Carboidrato'),
(17, 'Milho', 'Carboidrato'),
(18, 'Aveia', 'Carboidrato'),
(19, 'Açúcar', 'Carboidrato'),
(20, 'Batata Doce', 'Carboidrato'),
(21, 'Azeite de Oliva', 'Lipídio'),
(22, 'Óleo de Soja', 'Lipídio'),
(23, 'Manteiga', 'Lipídio'),
(24, 'Margarina', 'Lipídio'),
(25, 'Abacate', 'Lipídio'),
(26, 'Castanhas', 'Lipídio'),
(27, 'Bacon', 'Lipídio'),
(28, 'Cebola', NULL),
(29, 'Alho', NULL),
(30, 'Tomate', NULL),
(31, 'Cenoura', NULL),
(32, 'Alface', NULL),
(33, 'Brócolis', NULL),
(34, 'Pimentão', NULL),
(35, 'Sal', NULL),
(36, 'Pimenta do Reino', NULL),
(37, 'Salsinha', NULL),
(38, 'Cebolinha', NULL),
(39, 'Orégano', NULL),
(40, 'Limão', NULL),
(41, 'Vinagre', NULL),
(42, 'Leite', NULL),
(43, 'Creme de Leite', NULL),
(44, 'Leite Condensado', NULL),
(46, 'Fermento em Pó', NULL),
(47, 'Polvilho Azedo', NULL),
(48, 'Champignon', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `receitas`
--

CREATE TABLE `receitas` (
  `id_receita` int(10) NOT NULL,
  `nome_receita` varchar(50) NOT NULL,
  `descricao` longtext NOT NULL,
  `id_usuario` int(10) DEFAULT NULL,
  `categoria` varchar(50) NOT NULL,
  `imagem_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `receitas`
--

INSERT INTO `receitas` (`id_receita`, `nome_receita`, `descricao`, `id_usuario`, `categoria`, `imagem_url`) VALUES
(1, 'Bolo de Cenoura', 'Um bolo de cenoura clássico, fofinho e com uma deliciosa cobertura de chocolate.', NULL, 'Doces', 'https://images.tcdn.com.br/img/img_prod/691338/bolo_de_cenoura_com_cobertura_de_brigadeiro_413_1_3b73b645684628a4d29912a34088563a.jpg'),
(2, 'Frango Xadrez', 'Uma receita oriental clássica que combina pedaços de frango com pimentões coloridos e um molho agridoce.', NULL, 'Salgados', 'https://www.sabornamesa.com.br/media/k2/items/cache/a94064e54f350d35565f42b33924a549_XL.jpg'),
(3, 'Pudim de Leite Condensado', 'Uma sobremesa cremosa e irresistível, perfeita para qualquer ocasião. Feito no forno em banho-maria.', NULL, 'Doces', 'https://static.itdg.com.br/images/1200-630/a8e03615c033331969725b6f7034995f/322193-original.jpg'),
(4, 'Lasanha à Bolonhesa', 'Camadas de massa, molho à bolonhesa suculento e queijo derretido. Um prato que agrada a toda a família.', NULL, 'Salgados', 'https://static.itdg.com.br/images/1200-630/c8c5433884860933334270f881331345/324290-original.jpg'),
(5, 'Panquecas Americanas', 'Panquecas fofinhas e deliciosas, perfeitas para um café da manhã especial. Sirva com mel, frutas ou manteiga.', NULL, 'Café da manhã', 'https://assets.delirec.com/images%2Fvdpjbv1b%2Fproduction%2F4c2f75896a52c882a2f253339a03765a135337f7-1000x1500.jpg'),
(6, 'Strogonoff de Frango', 'Um clássico cremoso e rápido, perfeito para o almoço do dia a dia. Sirva com arroz branco e batata palha.', NULL, 'Almoço', 'https://www.unileverfoodsolutions.com.br/dam/global-ufs/mcos/SLA/calcmenu/recipes/BR-recipes/chicken-&-other-poultry-dishes/strogonoff-de-frango/main-header.jpg'),
(7, 'Pão de Queijo de Liquidificador', 'Uma versão super fácil e rápida do pão de queijo, ideal para um lanche da tarde delicioso.', NULL, 'Lanche da tarde', 'https://static.itdg.com.br/images/1200-630/b0f0b543555a97490193399433f68333/319675-original.jpg'),
(8, 'Sopa de Legumes Confortante', 'Uma sopa nutritiva e quentinha, perfeita para um jantar leve e reconfortante.', NULL, 'Jantar', 'https://www.mundoboaforma.com.br/wp-content/uploads/2021/05/sopa-de-legumes-com-carne.jpg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `receita_ingredientes`
--

CREATE TABLE `receita_ingredientes` (
  `id_receita_ingrediente` int(11) NOT NULL,
  `id_receita` int(10) NOT NULL,
  `id_ingrediente` int(5) NOT NULL,
  `quantidade` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `receita_ingredientes`
--

INSERT INTO `receita_ingredientes` (`id_receita_ingrediente`, `id_receita`, `id_ingrediente`, `quantidade`) VALUES
(1, 1, 5, '4 unidades'),
(2, 1, 15, '2 e 1/2 xícaras (chá)'),
(3, 1, 19, '2 xícaras (chá)'),
(4, 1, 22, '1/2 xícara (chá)'),
(5, 1, 31, '3 médias raladas'),
(6, 2, 1, '500g de peito, em cubos'),
(7, 2, 34, '1 unidade de cada cor'),
(8, 2, 28, '1 unidade'),
(9, 2, 29, '2 dentes'),
(10, 2, 22, '3 colheres (sopa)'),
(11, 2, 19, '1 colher (sopa)'),
(12, 2, 41, '3 colheres (sopa)'),
(13, 3, 44, '1 lata'),
(14, 3, 42, '1 medida (da lata)'),
(15, 3, 5, '3 unidades'),
(16, 3, 19, '1 xícara (chá)'),
(17, 4, 12, '500g de massa para lasanha'),
(18, 4, 2, '500g moída'),
(19, 4, 10, '400g de queijo mussarela'),
(20, 4, 30, '2 latas de tomate pelado'),
(21, 4, 28, '1 unidade picada'),
(22, 4, 29, '3 dentes picados'),
(23, 4, 21, '3 colheres (sopa)'),
(24, 5, 15, '1 e 1/2 xícara (chá)'),
(25, 5, 19, '2 colheres (sopa)'),
(26, 5, 46, '1 colher (sopa)'),
(27, 5, 35, '1/2 colher (chá)'),
(28, 5, 42, '1 e 1/4 xícara (chá)'),
(29, 5, 5, '1 unidade'),
(30, 5, 23, '2 colheres (sopa) derretida'),
(31, 6, 1, '1 kg de peito, em cubos'),
(32, 6, 29, '2 dentes picados'),
(33, 6, 28, '1 unidade picada'),
(34, 6, 23, '2 colheres (sopa)'),
(35, 6, 43, '1 lata'),
(36, 6, 48, '1 xícara (chá)'),
(37, 7, 47, '2 xícaras (chá)'),
(38, 7, 42, '1 xícara (chá)'),
(39, 7, 22, '1/2 xícara (chá)'),
(40, 7, 5, '1 unidade'),
(41, 7, 10, '100g ralado'),
(42, 8, 13, '2 unidades picadas'),
(43, 8, 31, '1 unidade picada'),
(44, 8, 28, '1 unidade picada'),
(45, 8, 30, '2 unidades picados'),
(46, 8, 21, '2 colheres (sopa)');

-- --------------------------------------------------------

--
-- Estrutura para tabela `receita_passos`
--

CREATE TABLE `receita_passos` (
  `id_passo` int(11) NOT NULL,
  `id_receita` int(10) NOT NULL,
  `ordem` int(3) NOT NULL,
  `descricao` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `receita_passos`
--

INSERT INTO `receita_passos` (`id_passo`, `id_receita`, `ordem`, `descricao`) VALUES
(1, 1, 1, 'Em um liquidificador, adicione a cenoura, os ovos e o óleo, depois misture.'),
(2, 1, 2, 'Acrescente o açúcar e bata novamente por 5 minutos.'),
(3, 1, 3, 'Em uma tigela ou na batedeira, adicione a farinha de trigo e depois misture novamente.'),
(4, 1, 4, 'Asse em um forno preaquecido a 180° C por aproximadamente 40 minutos.'),
(5, 2, 1, 'Em uma panela grande (wok, se tiver), aqueça o óleo e frite os cubos de frango até dourarem. Retire e reserve.'),
(6, 2, 2, 'Na mesma panela, refogue a cebola e o alho até ficarem macios.'),
(7, 2, 3, 'Adicione os pimentões e cozinhe por alguns minutos até que comecem a amaciar, mas ainda crocantes.'),
(8, 2, 4, 'Adicione o vinagre e o açúcar, misturando bem. Se desejar um molho mais espesso, dissolva uma colher de amido de milho em um pouco de água e adicione à panela.'),
(9, 2, 5, 'Volte o frango para a panela, misture tudo e cozinhe por mais 2 minutos.'),
(10, 2, 6, 'Sirva imediatamente, acompanhado de arroz branco.'),
(11, 3, 1, 'Calda: Em uma panela, derreta o açúcar em fogo baixo até obter um caramelo dourado. Despeje em uma forma com furo central e espalhe pelas laterais. Reserve.'),
(12, 3, 2, 'No liquidificador, bata o leite condensado, o leite e os ovos até obter uma mistura homogênea.'),
(13, 3, 3, 'Despeje a mistura do liquidificador na forma caramelizada.'),
(14, 3, 4, 'Cubra a forma com papel-alumínio e asse em banho-maria, em forno preaquecido a 180°C, por cerca de 1 hora e 30 minutos.'),
(15, 3, 5, 'Após assar, espere esfriar e leve à geladeira por no mínimo 6 horas.'),
(16, 3, 6, 'Para desenformar, passe uma faca nas laterais da forma e vire sobre um prato.'),
(17, 4, 1, 'Molho: Em uma panela, aqueça o azeite e refogue o alho e a cebola. Adicione a carne moída e cozinhe até dourar.'),
(18, 4, 2, 'Acrescente o tomate pelado, tempere com sal e pimenta a gosto e deixe cozinhar em fogo baixo por cerca de 20 minutos.'),
(19, 4, 3, 'Montagem: Em um refratário, comece com uma camada de molho à bolonhesa.'),
(20, 4, 4, 'Alterne camadas de massa de lasanha, molho e queijo mussarela, finalizando com uma camada de queijo.'),
(21, 4, 5, 'Cubra com papel-alumínio e leve ao forno preaquecido a 180°C por 20 minutos.'),
(22, 4, 6, 'Retire o papel-alumínio e deixe no forno por mais 10-15 minutos para gratinar. Sirva quente.'),
(23, 5, 1, 'Em uma tigela, misture a farinha, o açúcar, o fermento e o sal.'),
(24, 5, 2, 'Em outra tigela, misture o leite, o ovo e a manteiga derretida.'),
(25, 5, 3, 'Despeje os líquidos sobre os secos e misture apenas o suficiente para umedecer. Não misture demais.'),
(26, 5, 4, 'Aqueça uma frigideira antiaderente em fogo médio. Coloque porções da massa e cozinhe até bolhas aparecerem. Vire e doure o outro lado.'),
(27, 6, 1, 'Em uma panela, derreta a manteiga e doure o alho e a cebola.'),
(28, 6, 2, 'Junte o frango e deixe dourar por todos os lados.'),
(29, 6, 3, 'Adicione sal, pimenta e outros temperos a gosto. Adicione o champignon e misture.'),
(30, 6, 4, 'Desligue o fogo e acrescente o creme de leite. Mexa bem para não talhar e sirva em seguida.'),
(31, 7, 1, 'No liquidificador, bata o leite, o óleo e o ovo.'),
(32, 7, 2, 'Com o liquidificador ligado, adicione o polvilho aos poucos.'),
(33, 7, 3, 'Acrescente o queijo ralado e uma pitada de sal, e bata só para misturar.'),
(34, 7, 4, 'Despeje a massa em forminhas de empada ou cupcake untadas e leve ao forno preaquecido a 180°C por cerca de 25 minutos, ou até dourar.'),
(35, 8, 1, 'Em uma panela de pressão, aqueça o azeite e refogue a cebola.'),
(36, 8, 2, 'Adicione a batata, a cenoura e o tomate. Tempere com sal e pimenta.'),
(37, 8, 3, 'Cubra os legumes com água (cerca de 1 litro) e feche a panela.'),
(38, 8, 4, 'Cozinhe por 15 minutos após pegar pressão. Desligue, espere a pressão sair, abra a panela e sirva.');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `nome_usuario` varchar(50) NOT NULL,
  `data_nasc` date NOT NULL,
  `senha_hash` varchar(255) NOT NULL,
  `id_usuario` int(10) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`nome_usuario`, `data_nasc`, `senha_hash`, `id_usuario`, `email`) VALUES
('Dennis', '2007-10-30', '$2y$10$sWjewYeUmQUOkW9qAdIsiuxr2GAOwYuuo0xKpC6REqQ93Vj4D8PYS', 1, 'dennisdias2007@gmail.com'),
('Cintia', '2009-04-27', '$2y$10$2JCVfuGyFcullbvdwqgzZe/CzHtI9UxAtiuonumdIvq1aabQqOl5a', 2, 'Cintia@gmail.com');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario_ingredientes`
--

CREATE TABLE `usuario_ingredientes` (
  `id_usuario` int(10) NOT NULL,
  `id_ingrediente` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `ingredientes`
--
ALTER TABLE `ingredientes`
  ADD PRIMARY KEY (`id_ingredientes`),
  ADD UNIQUE KEY `nome_ingredientes` (`nome_ingredientes`);

--
-- Índices de tabela `receitas`
--
ALTER TABLE `receitas`
  ADD PRIMARY KEY (`id_receita`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `categoria` (`categoria`);

--
-- Índices de tabela `receita_ingredientes`
--
ALTER TABLE `receita_ingredientes`
  ADD PRIMARY KEY (`id_receita_ingrediente`),
  ADD KEY `fk_receita_ingredientes_receita` (`id_receita`),
  ADD KEY `fk_receita_ingredientes_ingrediente` (`id_ingrediente`);

--
-- Índices de tabela `receita_passos`
--
ALTER TABLE `receita_passos`
  ADD PRIMARY KEY (`id_passo`),
  ADD KEY `id_receita` (`id_receita`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `usuario_ingredientes`
--
ALTER TABLE `usuario_ingredientes`
  ADD PRIMARY KEY (`id_usuario`,`id_ingrediente`),
  ADD KEY `id_ingrediente` (`id_ingrediente`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `ingredientes`
--
ALTER TABLE `ingredientes`
  MODIFY `id_ingredientes` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de tabela `receitas`
--
ALTER TABLE `receitas`
  MODIFY `id_receita` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `receita_ingredientes`
--
ALTER TABLE `receita_ingredientes`
  MODIFY `id_receita_ingrediente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de tabela `receita_passos`
--
ALTER TABLE `receita_passos`
  MODIFY `id_passo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `receitas`
--
ALTER TABLE `receitas`
  ADD CONSTRAINT `receitas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Restrições para tabelas `receita_ingredientes`
--
ALTER TABLE `receita_ingredientes`
  ADD CONSTRAINT `fk_receita_ingredientes_ingrediente` FOREIGN KEY (`id_ingrediente`) REFERENCES `ingredientes` (`id_ingredientes`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_receita_ingredientes_receita` FOREIGN KEY (`id_receita`) REFERENCES `receitas` (`id_receita`) ON DELETE CASCADE;

--
-- Restrições para tabelas `receita_passos`
--
ALTER TABLE `receita_passos`
  ADD CONSTRAINT `fk_receita_passos_receita` FOREIGN KEY (`id_receita`) REFERENCES `receitas` (`id_receita`) ON DELETE CASCADE;

--
-- Restrições para tabelas `usuario_ingredientes`
--
ALTER TABLE `usuario_ingredientes`
  ADD CONSTRAINT `usuario_ingredientes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `usuario_ingredientes_ibfk_2` FOREIGN KEY (`id_ingrediente`) REFERENCES `ingredientes` (`id_ingredientes`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
