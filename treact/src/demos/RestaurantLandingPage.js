import React, { useState } from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import TabGrid from "components/cards/TabCardGrid.js";

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

export default () => {
  const [search, setSearch] = useState("");

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
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Você pesquisou por: ${search}`);
        }}
      >
        <SearchBarWrapper>
          <SearchInput
            type="text"
            placeholder="Pesquise por pratos"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchButton type="submit">Buscar</SearchButton>
        </SearchBarWrapper>
      </FormContainer>
      <TabGrid heading={<>O que você quer fazer de {getPeriodo()}</>} />
    </AnimationRevealPage>
  );
};
