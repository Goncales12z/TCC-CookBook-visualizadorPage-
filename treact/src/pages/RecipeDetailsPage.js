// src/pages/RecipeDetailsPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line

import Header from "components/headers/light.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { SectionHeading } from "components/misc/Headings.js";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const Image = styled.div((props) => [
	`background-image: url("${props.imageSrc}");`,
	tw`h-96 bg-cover bg-center rounded-lg`,
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

const LoadingContainer = tw.div`text-center py-24`;
const ErrorContainer = tw.div`text-center py-24 text-red-500 font-bold`;

export default () => {
	const { id } = useParams(); // Pega o "id" da URL, que agora é o ID da receita
	const [recipe, setRecipe] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRecipeDetails = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await fetch(
					`http://localhost/TCC/php/get_recipe_details.php?id=${id}`
				);
				const result = await response.json();
				if (result.success) {
					setRecipe(result.data);
				} else {
					setError(
						result.error || "Não foi possível carregar os detalhes da receita."
					);
				}
			} catch (err) {
				setError("Erro de conexão ao buscar os detalhes da receita.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecipeDetails();
	}, [id]); // Executa sempre que o ID na URL mudar

	if (isLoading) {
		return (
			<AnimationRevealPage>
				<Header />
				<LoadingContainer>Carregando receita...</LoadingContainer>
			</AnimationRevealPage>
		);
	}

	if (error || !recipe) {
		return (
			<AnimationRevealPage>
				<Header />
				<ErrorContainer>{error || "Receita não encontrada!"}</ErrorContainer>
			</AnimationRevealPage>
		);
	}

	return (
		<AnimationRevealPage>
			<Header />
			<Container>
				<Content>
					<Title>{recipe.nome_receita}</Title>
					<p tw="text-gray-600 mt-4">{recipe.descricao}</p>

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
		</AnimationRevealPage>
	);
};
