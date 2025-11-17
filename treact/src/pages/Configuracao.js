import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import Header from "components/headers/light.js";

const FilterInput = tw.input`w-full p-3 mb-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow`;
const Container = tw.div`min-h-screen bg-gray-100 flex flex-col items-center pt-16`;
const Content = tw.div`w-full max-w-4xl mx-auto p-8`;
const Heading = tw.h1`text-3xl xl:text-4xl font-extrabold text-center text-primary-700 mb-8`;
const IngredientGroup = tw.div`mb-8`;
const GroupTitle = tw.h2`text-2xl font-bold text-gray-800 border-b-2 border-primary-500 pb-2 mb-4`;
const CheckboxGrid = tw.div`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4`;
const CheckboxLabel = tw.label`flex items-center space-x-3 p-3 bg-white rounded-lg shadow-md cursor-pointer hover:bg-primary-100 transition duration-300`;
const Checkbox = tw.input`h-5 w-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500`;
const IngredientName = tw.span`text-gray-700 font-medium`;
const ButtonContainer = tw.div`flex justify-center mt-8`;
const Button = tw.button`px-8 py-3 bg-primary-500 text-white font-bold rounded-lg hover:bg-primary-700 transition disabled:bg-gray-400`;
const Message = tw.p`text-center mt-4`;
const ErrorMessage = tw(Message)`text-red-500`;
const SuccessMessage = tw(Message)`text-green-500`;

export const Link = tw.a`px-8 py-3 bg-primary-500 text-white font-bold rounded-lg hover:bg-primary-700 transition disabled:bg-gray-400`;

export default () => {
    const [user, setUser] = useState(null);
  const [ingredients, setIngredients] = useState({});
  const [selectedIngredients, setSelectedIngredients] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [filterText, setFilterText] = useState("");

  // Carrega o usuário logado e busca os ingredientes
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    let currentUser;
    if (loggedInUser) {
      currentUser = JSON.parse(loggedInUser);
      setUser(currentUser);
    } else {
      // Idealmente, redirecionar para o login se não estiver logado
      window.location.href = "/login";
      return; // Para a execução se não houver usuário
    }

    const fetchIngredients = async () => {
      try {
        const response = await fetch("http://localhost/TCC/php/get_ingredients.php");
        const data = await response.json();
        if (data.success) {
          setIngredients(data.data);

          // Agora, busca os ingredientes já salvos pelo usuário
          const userIngredientsResponse = await fetch(`http://localhost/TCC/php/get_user_ingredients.php?userId=${currentUser.id_usuario}`);
          const userIngredientsData = await userIngredientsResponse.json();
          if (userIngredientsData.success) {
            // Pré-seleciona os checkboxes com os ingredientes salvos
            setSelectedIngredients(new Set(userIngredientsData.data.map(id => parseInt(id))));
          }
        } else {
          setError(data.error || "Não foi possível carregar os ingredientes.");
        }
      } catch (err) {
        setError("Erro de conexão ao buscar ingredientes.");
      }
    };

    fetchIngredients();
  }, []);

  const handleCheckboxChange = (ingredientId) => {
    setSelectedIngredients(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(ingredientId)) {
        newSelected.delete(ingredientId);
      } else {
        newSelected.add(ingredientId);
      }
      return newSelected;
    });
  };

  const handleSave = async () => {
    if (!user) {
      setError("Usuário não identificado. Faça login novamente.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("http://localhost/TCC/php/save_user_ingredients.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id_usuario,
          ingredientIds: Array.from(selectedIngredients)
        })
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage(data.message);
      } else {
        setError(data.error || "Ocorreu um erro ao salvar.");
      }
    } catch (err) {
      setError("Erro de conexão ao salvar ingredientes.");
    } finally {
      setIsLoading(false);
    }
  };

  // Filtra os ingredientes com base no texto de busca
  const filteredIngredients = Object.fromEntries(
    Object.entries(ingredients)
      .map(([group, items]) => {
        const lowerCaseFilter = filterText.toLowerCase();

        // Itens cujo nome corresponde ao filtro
        const filteredItems = items.filter(item =>
          item.nome.toLowerCase().includes(lowerCaseFilter)
        );

        // O grupo corresponde ao filtro?
        const groupMatches = group.toLowerCase().includes(lowerCaseFilter);

        // Se o nome do grupo corresponder, mostre todos os itens do grupo.
        // Se não, mostre apenas os itens filtrados.
        if (groupMatches) {
          return [group, items];
        }
        return [group, filteredItems];
      })
      // Remove grupos que ficaram vazios após a filtragem
      .filter(([, items]) => items.length > 0)
  );

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <Content>
          <Heading>Meu Inventário de Ingredientes</Heading>

          <FilterInput
            type="text"
            placeholder="Pesquisar ingredientes ou tipos..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />

          <ButtonContainer>
          <Link href="/addingredients">Adicionar Ingredientes</Link>
          </ButtonContainer>

          {Object.keys(filteredIngredients).length > 0 ? (
            Object.entries(filteredIngredients).map(([group, items]) => (
              <IngredientGroup key={group}>
                <GroupTitle>{group}</GroupTitle>
                <CheckboxGrid>
                  {items.map(item => (
                    <CheckboxLabel key={item.id}>
                      <Checkbox
                        type="checkbox"
                        checked={selectedIngredients.has(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                      <IngredientName>{item.nome}</IngredientName>
                    </CheckboxLabel>
                  ))}
                </CheckboxGrid>
              </IngredientGroup>
            ))
          ) : (
            <p tw="text-center text-gray-500">
              {Object.keys(ingredients).length > 0 ? "Nenhum ingrediente encontrado para sua busca." : "Carregando ingredientes..."}
            </p>
          )}

          <ButtonContainer>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Meu Inventário"}
            </Button>
          </ButtonContainer>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};