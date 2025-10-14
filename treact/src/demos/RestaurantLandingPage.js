import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import TabGrid from "components/cards/TabCardGrid.js";
import { tabsData } from "components/cards/TabCardGrid.js";

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

export default () => {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [recipeResult, setRecipeResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Verifica se há um usuário logado no localStorage quando a página carrega
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  function getPeriodo() {
    const hora = new Date().getHours();
    if (hora >= 4 && hora < 10) return <CafeText>café da manhã?</CafeText>;
    if (hora >= 10 && hora < 14) return <AlmocoText>almoço?</AlmocoText>;
    if (hora >= 14 && hora < 17) return <LancheText>lanche da tarde?</LancheText>;
    return <JantarText>jantar?</JantarText>;
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
                const response = await fetch("http://localhost/TCC/php/processo.php", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ search: search })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    setRecipeResult({ name: data.elements_used, instructions: data.receita });
                } else {
                    setError(data.error || 'Erro ao processar solicitação.');
                }
            } catch (error) {
                setError('Erro de conexão com o servidor. Verifique se o XAMPP e a IA estão rodando.');
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

      <TabGrid
        heading={<>O que você quer fazer de {getPeriodo()}</>}
        tabs={tabsData}
      />
    </AnimationRevealPage>
  );
};
