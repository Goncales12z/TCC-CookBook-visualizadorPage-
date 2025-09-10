// src/pages/RecipeDetailsPage.js
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line

import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { SectionHeading } from "components/misc/Headings.js";

// Importando os dados diretamente. Em um app maior, isso viria de uma API ou estado global.
import { tabsData } from "components/cards/TabCardGrid.js";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-96 bg-cover bg-center rounded-lg`
]);
const Title = tw(SectionHeading)`mt-8 text-left`;
const DetailsContainer = tw.div`mt-12`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between`;
const Column = tw.div`md:w-5/12`;

const Subtitle = tw.h3`text-2xl font-bold mt-6 mb-6`;
const IngredientsList = tw.ul`list-disc list-inside text-lg space-y-2`;
const Ingredient = tw.li``;
const PreparationList = tw.ol`list-decimal list-inside text-lg space-y-4`;
const Step = tw.li`leading-relaxed`;

export default () => {
  const { slug } = useParams(); // Pega o "slug" da URL

  // Junta todos os pratos de todas as abas em uma única lista
  const allDishes = Object.values(tabsData).flat();
  
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
        <Footer />
      </AnimationRevealPage>
    );
  }

  return (
    <AnimationRevealPage disabled>
      <Header />
      <Container>
        <Content>
          <Image imageSrc={recipe.imageSrc} />
          <Title>{recipe.title}</Title>
          <p tw="text-gray-600 mt-4">{recipe.content}</p>

          <DetailsContainer>
            <TwoColumn>
              <Column>
                <Subtitle>Ingredientes</Subtitle>
                <IngredientsList>
                  {recipe.ingredients.map((ingredient, index) => (
                    <Ingredient key={index}>{ingredient}</Ingredient>
                  ))}
                </IngredientsList>
              </Column>
              <Column>
                <Subtitle>Modo de Preparo</Subtitle>
                <PreparationList>
                  {recipe.preparation.map((step, index) => (
                    <Step key={index}>{step}</Step>
                  ))}
                </PreparationList>
              </Column>
            </TwoColumn>
          </DetailsContainer>
        </Content>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
