import React from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
//import Footer from "components/footers/FiveColumnWithInputForm.js";
import { Mail, User, Lock } from "react-feather"; // Instale react-feather se não tiver

const Container = tw.div`min-h-screen bg-gray-100 flex flex-col`;
const Content = tw.div`flex-1 flex flex-col items-center justify-center px-4`;
const FormContainer = tw.div`bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md`;
const Title = tw.h2`text-3xl font-bold text-center text-primary-700 mb-2`;
const Subtitle = tw.p`text-center text-gray-500 mb-6`;
const Field = tw.div`mb-4`;
const Label = tw.label`block mb-1 font-semibold text-gray-700`;
const InputWrapper = tw.div`relative`;
const Icon = tw.span`absolute left-0 top-1/2 transform -translate-y-1/2 text-primary-500`;
const Input = tw.input`
  w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg
  focus:outline-none focus:border-primary-500 transition
  bg-white text-gray-800 placeholder-gray-400
  shadow-sm
`;
const Button = tw.button`w-full bg-primary-500 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition mb-2 mt-2`;
const LinkText = tw.a`block text-center text-primary-500 hover:underline mt-2`;

export default function RegisterPage() {
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <Content>
          <FormContainer>
            <Title>Criar Conta</Title>
            <Subtitle>Preencha os campos para se cadastrar</Subtitle>
            <form>
              <Field>
                <Label htmlFor="name">Nome</Label>
                <InputWrapper>
                  <Icon>
                    <User size={20} />
                  </Icon>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    required
                  />
                </InputWrapper>
              </Field>
              <Field>
                <Label htmlFor="email">E-mail</Label>
                <InputWrapper>
                  <Icon>
                    <Mail size={20} />
                  </Icon>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Seu e-mail"
                    required
                  />
                </InputWrapper>
              </Field>
              <Field>
                <Label htmlFor="password">Senha</Label>
                <InputWrapper>
                  <Icon>
                    <Lock size={20} />
                  </Icon>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Senha"
                    required
                  />
                </InputWrapper>
              </Field>
              <Field>
                <Label htmlFor="confirm">Confirmar Senha</Label>
                <InputWrapper>
                  <Icon>
                    <Lock size={20} />
                  </Icon>
                  <Input
                    id="confirm"
                    type="password"
                    placeholder="Confirmar senha"
                    required
                  />
                </InputWrapper>
              </Field>
              <Button type="submit">Criar Conta</Button>
            </form>
            <LinkText href="/login">Já tem uma conta? Entrar</LinkText>
          </FormContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
}
