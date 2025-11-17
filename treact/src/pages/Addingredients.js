import React, { useState } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import Header from "../components/headers/light.js";


const Container = tw.div`min-h-screen bg-gray-100 flex flex-col items-center pt-16`;
const Content = tw.div`w-full max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg`;
const Heading = tw.h1`text-3xl font-extrabold text-center text-primary-700 mb-8`;

const Input = tw.input`w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500`;
const CheckboxGroup = tw.div`grid grid-cols-1 gap-4 mb-6`;
const CheckboxLabel = tw.label`flex items-center space-x-3 p-3 bg-gray-100 rounded-lg shadow cursor-pointer hover:bg-primary-100 transition`;
const Checkbox = tw.input`h-5 w-5 text-primary-600`;
const Button = tw.button`w-full py-3 bg-primary-500 text-white font-bold rounded-lg hover:bg-primary-700 transition`;
const SubHeading = tw.h2`font-semibold text-lg mb-3 text-gray-700`;
const TypeSpan = tw.span`capitalize`;
export default function AddIngredients() {
  const [ingredientName, setIngredientName] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async () => {
    if (ingredientName.trim() === "" || category === "") {
      alert("Preencha o nome e selecione o tipo.");
      return;
    }

    try {
      const response = await fetch("http://localhost/TCC/php/add_ingredient.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: ingredientName,
          tipo: category
        })
      });

      const data = await response.json();

      if (data.success) {
        alert("Ingrediente adicionado com sucesso!");
        window.location.href = "/configuracao"; // volta para a página anterior
      } else {
        alert(data.error || "Erro ao adicionar ingrediente.");
      }
    } catch (error) {
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <Content>
          <Heading>Adicionar Novo Ingrediente</Heading>

          <Input
            type="text"
            placeholder="Digite o nome do ingrediente..."
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
          />

          <SubHeading>Selecione o tipo:</SubHeading>
          <CheckboxGroup>
            {["outros", "proteína", "carboidrato", "lipídio"].map((type) => (
              <CheckboxLabel key={type}>
                <Checkbox
                  type="checkbox"
                  checked={category === type}
                  onChange={() => setCategory(type)}
                />
                <TypeSpan>{type}</TypeSpan>
              </CheckboxLabel>
            ))}
          </CheckboxGroup>

          <Button onClick={handleSubmit}>Confirmar</Button>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
}