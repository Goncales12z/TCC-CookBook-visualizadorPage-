import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import styled from "styled-components";
import Header from "components/headers/light.js";
import TabGrid from "components/cards/TabCardGrid.js"; // O componente TabGrid continua sendo usado
import { SectionHeading } from "components/misc/Headings.js";

const FormContainer = tw.form`flex justify-center mt-8 w-full`;
const SearchBarWrapper = tw.div`flex w-full max-w-xl px-2`;
const SearchInput = tw.input`
  flex-1
  py-3 px-5
  text-lg
  rounded-l-full
  border-2 border-primary-500
  outline-none
  transition-shadow
  focus:(ring-2 ring-primary-300)
  bg-white
`;
const SearchButton = tw.button`
  py-3 px-6
  text-lg
  rounded-r-full
  border-2 border-primary-500
  bg-primary-600
  text-white
  font-bold
  hover:bg-primary-700
  transition-colors
`;

const CafeText = tw.span`bg-yellow-300 text-yellow-900 px-4 rounded-lg font-bold`;
const AlmocoText = tw.span`bg-green-300 text-green-900 px-4 rounded-lg font-bold`;
const LancheText = tw.span`bg-pink-200 text-pink-800 px-4 rounded-lg font-bold`;
const JantarText = tw.span`bg-blue-900 text-blue-100 px-4 rounded-lg font-bold`;

const WelcomeMessage = tw.h2`text-2xl font-semibold text-center text-primary-700 my-8`;
// Componente para exibir o resultado
const ResultContainer = tw.div`mt-8 p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto`;
const ResultTitle = tw.h3`text-2xl font-bold text-gray-800`;
const ResultText = tw.p`mt-4 text-gray-600 whitespace-pre-wrap`;
const ErrorText = tw.p`mt-4 text-red-600 font-bold`;

// --- Componentes para a nova seção de Recomendações ---
const RecommendationsContainer = tw.div`max-w-screen-xl mx-auto py-12 lg:py-16`;
const RecommendationsGrid = tw.div`mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4`;
const RecommendationCard = tw(Link)`flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transform hocus:scale-105 transition-transform duration-300`;
const RecommendationImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-48 bg-cover bg-center`
]);
const RecommendationContent = tw.div`p-4 flex-grow`;
const RecommendationTitle = tw.h4`text-lg font-bold text-gray-800`;
const RecommendationMatch = tw.p`text-sm text-green-600 font-semibold mt-2`;
// --- Fim dos componentes de Recomendações ---

export default () => {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [recipeResult, setRecipeResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tabs, setTabs] = useState({}); // Novo estado para as abas de receitas
  const [recommendations, setRecommendations] = useState([]); // Novo estado para as recomendações

    const fetchRecipesForTabs = async (currentUser) => {
    try {
      const response = await fetch(`http://localhost/TCC/php/get_recipes.php?userId=${currentUser.id_usuario}`);
      const result = await response.json();
      if (result.success) {
        setTabs(result.data);
          } else {
            console.error("Erro ao buscar receitas para as abas:", result.error);
          }
          } catch (error) {
            console.error("Erro de conexão ao buscar receitas para as abas:", error);
          }
    };

  useEffect(() => {
    // Verifica se há um usuário logado no localStorage quando a página carrega
    const loggedInUser = localStorage.getItem("user");
    let currentUser = null;
    if (loggedInUser) {
      currentUser = JSON.parse(loggedInUser);
      setUser(currentUser);
      fetchRecipesForTabs(currentUser);

    }

    // Busca as receitas por categoria para exibir nas abas
    /*const fetchRecipesForTabs = async () => {
      if (!currentUser) return;

      try {
        const response = await fetch(`http://localhost/TCC/php/get_recipes.php?userId=${currentUser.id_usuario}`);
        const result = await response.json();
        if (result.success) {
          setTabs(result.data);
        } else {
          console.error("Erro ao buscar receitas para as abas:", result.error);
        }
      } catch (error) {
        console.error("Erro de conexão ao buscar receitas para as abas:", error);
      }
    };*/

    // Busca as recomendações para o usuário logado
    /*const fetchRecommendations = async () => {
      if (!currentUser) return; // Só busca se o usuário estiver logado

      const periodo = getPeriodo(true); // Pega o período como string

      try {
        const response = await fetch(`http://localhost/TCC/php/get_recommendations.php?userId=${currentUser.id_usuario}&categoria=${periodo}`);
        const result = await response.json();
        if (result.success) {
          setRecommendations(result.data);
        } else {
          console.error("Erro ao buscar recomendações:", result.error);
        }
      } catch (error) {
        console.error("Erro de conexão ao buscar recomendações:", error);
      }
    };*/

    fetchRecipesForTabs();
    //fetchRecommendations();
  }, []);

  function getPeriodo(asString = false) {
    const hora = new Date().getHours();
    if (hora >= 4 && hora < 10) return asString ? "Café da manhã" : <CafeText>café da manhã?</CafeText>;
    if (hora >= 10 && hora < 14) return asString ? "Almoço" : <AlmocoText>almoço?</AlmocoText>;
    if (hora >= 14 && hora < 17) return asString ? "Lanche da tarde" : <LancheText>lanche da tarde?</LancheText>;
    return asString ? "Jantar" : <JantarText>jantar?</JantarText>;
  }

  return (
    <AnimationRevealPage disabled>
      <Header />

      {/* Exibe a mensagem de boas-vindas se o usuário estiver logado */}
      {user && (
        <WelcomeMessage>Bem vindo, {user.nome_usuario}!</WelcomeMessage>
      )}
      <FormContainer
        onSubmit={async (e) => {
          e.preventDefault();
          // Aqui você pode filtrar dados, chamar API, etc.
          setRecipeResult(null); // Limpa resultado anterior
          setError(null); // Limpa erro anterior
          setIsLoading(true);

          try {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000000); // 120 segundos timeout

  const response = await fetch("http://localhost/TCC/php/processo.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ search: search, userId: user.id_usuario }),
    signal: controller.signal,
  });

  clearTimeout(timeoutId);
  
  // 🔍 PRIMEIRO: Pegar o texto RAW
  const rawText = await response.text();
  console.log("===== RESPOSTA RAW DO PHP =====");
  console.log(rawText);
  console.log("===== FIM DA RESPOSTA =====");

  // 🔍 TENTAR PARSEAR
  try {
    const data = JSON.parse(rawText);
    console.log("✅ JSON válido:", data);
    
    if (data.success) {
      setRecipeResult({ name: data.elements_used, instructions: data.receita});
    } else {
      setError(data.error || "Erro ao processar solicitação.");
    }
  } catch (parseError) {
    console.error("❌ ERRO AO PARSEAR JSON:", parseError);
    console.log("Texto que quebrou:", rawText.substring(0, 500)); // Primeiros 500 caracteres
    setError("Erro de formato na resposta do servidor (SyntaxError). Veja o console.");
  }

} catch (error) {
  if (error.name === "AbortError") {
    setError("A operação excedeu o tempo limite. Tente novamente.");
  } else {
    setError("Erro de conexão com o servidor: " + error.name);
  }
}

          setIsLoading(false);
        }}
      >
        <SearchBarWrapper>
          <SearchInput
            type="text"
            placeholder="Pesquise por pratos"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchButton type="submit" disabled={isLoading}>{isLoading ? "Buscando..." : "Buscar"}</SearchButton>
        </SearchBarWrapper>
      </FormContainer>

      {/* Exibição do resultado ou erro */}
      {isLoading && <ResultContainer><ResultText>Gerando receita, por favor aguarde...</ResultText></ResultContainer>}
      {error && <ResultContainer><ErrorText>{error}</ErrorText></ResultContainer>}
      {recipeResult && (
        <ResultContainer>
          <ResultTitle>Receita para: {recipeResult.name}</ResultTitle>
          <ResultText>{recipeResult.instructions}</ResultText>
        </ResultContainer>
      )}

      {/* Seção de Recomendações */}
      {user && recommendations.length > 0 && (
        <RecommendationsContainer>
          <SectionHeading>Recomendações para seu {getPeriodo()}</SectionHeading>
          <RecommendationsGrid>
            {recommendations.map(recipe => (
              <RecommendationCard key={recipe.id_receita} to={`/receita/${recipe.id_receita}`}>
                <RecommendationImage imageSrc={recipe.imagem_url} />
                <RecommendationContent>
                  <RecommendationTitle>{recipe.nome_receita}</RecommendationTitle>
                  <RecommendationMatch>
                    Você tem {recipe.ingredientes_em_comum} de {recipe.total_ingredientes} ingredientes!
                  </RecommendationMatch>
                </RecommendationContent>
              </RecommendationCard>
            ))}
          </RecommendationsGrid>
        </RecommendationsContainer>
      )}
      <TabGrid
        heading={<>O que vamos cozinhar hoje?</>}
        tabs={tabs} // Passa as receitas buscadas do banco de dados
        // A prop recipeResult não parece ser usada por TabGrid, então pode ser removida se não for necessária lá
      />
    </AnimationRevealPage>
  );
};
