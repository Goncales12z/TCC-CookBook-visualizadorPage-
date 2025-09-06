// src/pages/RecipeDetailsPage.js
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line

import Header from "components/headers/light.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { SectionHeading } from "components/misc/Headings.js";

// Importando os dados diretamente. Em um app maior, isso viria de uma API ou estado global.
import { default as TABS_DATA } from "components/cards/TabCardGrid.js";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-96 bg-cover bg-center rounded-lg`
]);
const Title = tw(SectionHeading)`mt-8`;
const IngredientsContainer = tw.div`mt-8`;
const Subtitle = tw.h3`text-2xl font-bold mt-12 mb-4`;
const IngredientsList = tw.ul`list-disc list-inside text-lg`;
const Ingredient = tw.li`mb-2`;
const PreparationList = tw.ol`list-decimal list-inside text-lg`;
const Step = tw.li`mb-4 leading-relaxed`;

export default () => {
  const { slug } = useParams(); // Pega o "slug" da URL

  // Junta todos os pratos de todas as abas em uma única lista
  const allDishes = Object.values(TABS_DATA({}).tabs).flat();
  
  // Encontra o prato que corresponde ao slug da URL
  const recipe = allDishes.find(dish => dish.slug === slug);

  if (!recipe) {
    return (
      <AnimationRevealPage>
        <Header />
        <Container>
          <Content>
            <Title>Receita não encontrada!</Title>
          </Content>
        </Container>
      </AnimationRevealPage>
    );
  }

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <Content>
          <Image imageSrc={recipe.imageSrc} />
          <Title>{recipe.title}</Title>
          
          <IngredientsContainer>
            <Subtitle>Ingredientes</Subtitle>
            <IngredientsList>
              {recipe.ingredients.map((ingredient, index) => (
                <Ingredient key={index}>{ingredient}</Ingredient>
              ))}
            </IngredientsList>
          </IngredientsContainer>

          <div>
            <Subtitle>Modo de Preparo</Subtitle>
            <PreparationList>
              {recipe.preparation.map((step, index) => (
                <Step key={index}>{step}</Step>
              ))}
            </PreparationList>
          </div>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};
