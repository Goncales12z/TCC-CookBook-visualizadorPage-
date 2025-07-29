import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
//import styled from "styled-components";
import { css } from "styled-components/macro"; // eslint-disable-line
//import { ReactComponent as SaveIcon } from "feather-icons/dist/icons/save.svg";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex block justify-center flex-1`;
const MainContainer = tw.div`w-full lg:w-2/3 xl:w-1/2 p-6 sm:p-12`;
const MainContent = tw.div`mt-4 flex flex-col items-center`;
const Field = tw.div`mb-4`;

const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const Button = tw.button`flex flex-col h-10 bg-primary-500 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition mt-48`;

export default () => {
  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <Field>
            <Button>Salvar Configurações</Button>
          </Field>
          <br />
          <Field>
            <Button>Configurações de Conta</Button>
          </Field>
          <MainContainer>
            <MainContent>
              <Heading>Configuração</Heading>
            </MainContent>
          </MainContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};