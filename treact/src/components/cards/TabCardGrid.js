import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as StarIcon } from "images/star-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";

const HeaderRow = tw.div`flex justify-center items-center flex-col`;
const Header = tw(SectionHeading)``;
const TabsControl = styled.div`
	${tw`flex flex-wrap justify-center px-2 py-2 rounded leading-none mt-8 overflow-x-auto`}
	/* Esconde a barra de rolagem */
  -ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	&::-webkit-scrollbar {
		display: none;
	}
	/* Garante que a categoria "Todos" apareça primeiro */
	& > div:first-child {
		order: -1;
	}
`;

const TabControl = styled.div`
	${tw`cursor-pointer px-6 py-3 m-2 rounded-full font-medium transition duration-300 text-sm sm:text-base text-center bg-gray-200 text-gray-700 hover:bg-gray-300`}
	&:hover {
		${tw`shadow-md`}
	}
	${(props) => props.active && tw`bg-primary-500! text-gray-100! shadow-lg!`}
`;

const TabContent = tw(
	motion.div
)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const ContainerCard = tw.div`bg-gray-300 flex flex-col items-center p-1 rounded-lg h-full shadow hover:shadow-xl transition-shadow duration-700`;
const Card = styled(
	motion(Link)
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
	${(props) =>
		css`
			background-image: url("${props.imageSrc}");
		`}
	${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
	${tw`mr-1 text-sm font-bold flex items-end`}
	svg {
		${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
	}
`;

const CardHoverOverlay = styled(motion.div)`
	background-color: rgba(255, 255, 255, 0.5);
	${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = styled.p`
	${tw`mt-1 text-sm font-medium text-gray-600`}
	display: -webkit-box;
	-webkit-line-clamp: 3; /* número de linhas */
	-webkit-box-orient: vertical;
	overflow: hidden;
`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
	${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
	${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

/* This function is only there for demo purposes. It populates placeholder cards */
const getRandomCards = () => {
	const cards = [
		{
			title: "Chicken Chilled",
			content: "Chicken Main Course",
			price: "$5.99",
			rating: "5.0",
			reviews: "87",
			url: "#",
		},
		{
			title: "Samsa Beef",
			content: "Fried Mexican Beef",
			price: "$3.99",
			rating: "4.5",
			reviews: "34",
			url: "#",
		},
		{
			title: "Carnet Nachos",
			content: "Chilli Crispy Nachos",
			price: "$3.99",
			rating: "3.9",
			reviews: "26",
			url: "#",
		},
		{
			title: "Guacamole Mex",
			content: "Mexican Chilli",
			price: "$3.99",
			rating: "4.2",
			reviews: "95",
			url: "#",
		},
		{
			title: "Chillie Cake",
			content: "Deepfried Chicken",
			price: "$2.99",
			rating: "5.0",
			reviews: "61",
			url: "#",
		},
		{
			title: "Nelli",
			content: "Hamburger & Fries",
			price: "$7.99",
			rating: "4.9",
			reviews: "89",
			url: "#",
		},
		{
			title: "Jalapeno Poppers",
			content: "Crispy Soyabeans",
			price: "$8.99",
			rating: "4.6",
			reviews: "12",
			url: "#",
		},
		{
			title: "Cajun Chicken",
			content: "Roasted Chicken & Egg",
			price: "$7.99",
			rating: "4.2",
			reviews: "19",
			url: "#",
		},
	];

	// Shuffle array
	return cards.sort(() => Math.random() - 0.5);
};

export let tabsData = {
	1: [
		{
			title: "",
			content: "",
			price: "",
			rating: "",
			reviews: "",
			url: "#",
			slug: "",
			ingredients: [""],
			preparation: [""],
		},
	],
	2: getRandomCards(),
	3: getRandomCards(),
	4: getRandomCards(),
};

export default ({
	heading = "Checkout the Menu",
	tabs = tabsData,
	recipeResult,
}) => {
	let updatedTabs = tabs;

	if (recipeResult) {
		tabsData = {
			1: [
				{
					title: recipeResult.name,
					content: recipeResult.description,
					price: "—",
					rating: "5.0",
					reviews: "IA",
					slug: "resultado-da-busca",
					ingredients: recipeResult.instructions.split("\n"),
					preparation: recipeResult.instructions.split("\n"),
					url: "#",
				},
			],
		};
	}

	const tabsKeys = Object.keys(updatedTabs);
	const [activeTab, setActiveTab] = useState(tabsKeys[0]);

	return (
		<Container>
			<ContentWithPaddingXl>
				<HeaderRow>
					<Header>{heading}</Header>
				</HeaderRow>
				<TabsControl>
					{Object.keys(updatedTabs).map((tabName, index) => (
						<TabControl
							key={index}
							active={activeTab === tabName}
							onClick={() => setActiveTab(tabName)}>
							{tabName}
						</TabControl>
					))}
				</TabsControl>
				{tabsKeys.map((tabKey, index) => (
					<TabContent
						key={index}
						variants={{
							current: {
								opacity: 1,
								scale: 1,
								display: "flex",
							},
							hidden: {
								opacity: 0,
								scale: 0.8,
								display: "none",
							},
						}}
						transition={{ duration: 0.4 }}
						initial={activeTab === tabKey ? "current" : "hidden"}
						animate={activeTab === tabKey ? "current" : "hidden"}>
						{tabs[tabKey].map((card, index) => (
							<CardContainer key={index}>
								<ContainerCard>
									<Card
										className="group"
										to={`/receita/${card.id}`}
										initial="rest"
										whileHover="hover"
										animate="rest">
										<CardText>
											<CardTitle>{card.title}</CardTitle>
											<CardContent>{card.content}</CardContent>
											<CardPrice>{card.price}</CardPrice>
										</CardText>
									</Card>
								</ContainerCard>
							</CardContainer>
						))}
					</TabContent>
				))}
			</ContentWithPaddingXl>
			<DecoratorBlob1 />
			<DecoratorBlob2 />
		</Container>
	);
};
