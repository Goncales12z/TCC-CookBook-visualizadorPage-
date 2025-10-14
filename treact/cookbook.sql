-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 14/10/2025 às 04:49
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
(43, 'Creme de Leite', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `receitas`
--

CREATE TABLE `receitas` (
  `id_receita` int(10) NOT NULL,
  `nome_receita` varchar(50) NOT NULL,
  `descricao` longtext NOT NULL,
  `id_usuario` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Despejando dados para a tabela `usuario_ingredientes`
--

INSERT INTO `usuario_ingredientes` (`id_usuario`, `id_ingrediente`) VALUES
(1, 14),
(1, 20),
(1, 32),
(1, 39);

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
  ADD KEY `id_usuario` (`id_usuario`);

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
  MODIFY `id_ingredientes` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de tabela `receitas`
--
ALTER TABLE `receitas`
  MODIFY `id_receita` int(10) NOT NULL AUTO_INCREMENT;

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
-- Restrições para tabelas `usuario_ingredientes`
--
ALTER TABLE `usuario_ingredientes`
  ADD CONSTRAINT `usuario_ingredientes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `usuario_ingredientes_ibfk_2` FOREIGN KEY (`id_ingrediente`) REFERENCES `ingredientes` (`id_ingredientes`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
