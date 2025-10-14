import React, { useState } from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import { Mail, Lock } from "react-feather";

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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost/TCC/php/login.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Login bem-sucedido!
        // Salva os dados do usuário no localStorage para mantê-lo logado
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redireciona para a página de perfil
        window.location.href = "/perfil";
      } else {
        // Erro de login (e-mail/senha errados, etc.)
        setError(data.error || 'Ocorreu um erro ao fazer login.');
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
            <Title>Entrar</Title>
            <Subtitle>Acesse sua conta para ver suas receitas</Subtitle>
            <form onSubmit={handleSubmit}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Sua senha"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputWrapper>
              </Field>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <LinkText href="/register">Não tem uma conta? Cadastre-se</LinkText>
          </FormContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
}