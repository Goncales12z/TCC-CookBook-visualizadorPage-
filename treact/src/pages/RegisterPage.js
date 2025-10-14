import React, { useState } from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
//import Footer from "components/footers/FiveColumnWithInputForm.js";
import { Mail, User, Lock, Calendar } from "react-feather"; // Instale react-feather se não tiver


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
const Message = tw.p`text-center mt-4`;
const ErrorMessage = tw(Message)`text-red-500`;
const SuccessMessage = tw(Message)`text-green-500`;


export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthdate: "",
    password: "",
    confirm: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    if (formData.password !== formData.confirm) {
      setError("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost/TCC/php/register.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message + " Você será redirecionado para o login.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else {
        setError(data.error || 'Ocorreu um erro ao criar a conta.');
      }
    } catch (err) {
      setError('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <Content>
          <FormContainer>
            <Title>Criar Conta</Title>
            <Subtitle>Preencha os campos para se cadastrar</Subtitle>
            <form onSubmit={handleSubmit}>
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
                    value={formData.name}
                    onChange={handleChange}
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
                    value={formData.email}
                    onChange={handleChange}
                  />
                </InputWrapper>
              </Field>
              <Field>
                <Label htmlFor="birthdate">Data de Nascimento</Label>
                <InputWrapper>
                  <Icon>
                    <Calendar size={20} />
                  </Icon>
                  <Input
                    id="birthdate"
                    type="date"
                    required
                    value={formData.birthdate}
                    onChange={handleChange}
                    css={tw`pr-4`} // Ajuste para não sobrepor o ícone do calendário
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
                    value={formData.password}
                    onChange={handleChange}
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
                    value={formData.confirm}
                    onChange={handleChange}
                  />
                </InputWrapper>
              </Field>
              <Button type="submit" disabled={isLoading}>{isLoading ? "Criando conta..." : "Criar Conta"}</Button>
            </form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {message && <SuccessMessage>{message}</SuccessMessage>}
            <LinkText href="/login">Já tem uma conta? Entrar</LinkText>
          </FormContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
}
