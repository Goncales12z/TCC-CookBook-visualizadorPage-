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

const HeaderRow = tw.div`flex justify-between items-center xl:flex-row`;
const Header = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;

const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = styled(motion(Link))`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
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
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
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
      imageSrc:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Chicken Chilled",
      content: "Chicken Main Course",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: "#"
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1582254465498-6bc70419b607?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Samsa Beef",
      content: "Fried Mexican Beef",
      price: "$3.99",
      rating: "4.5",
      reviews: "34",
      url: "#"
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1565310022184-f23a884f29da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Carnet Nachos",
      content: "Chilli Crispy Nachos",
      price: "$3.99",
      rating: "3.9",
      reviews: "26",
      url: "#"
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Guacamole Mex",
      content: "Mexican Chilli",
      price: "$3.99",
      rating: "4.2",
      reviews: "95",
      url: "#"
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1550461716-dbf266b2a8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Chillie Cake",
      content: "Deepfried Chicken",
      price: "$2.99",
      rating: "5.0",
      reviews: "61",
      url: "#"
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327??ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Nelli",
      content: "Hamburger & Fries",
      price: "$7.99",
      rating: "4.9",
      reviews: "89",
      url: "#"
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Jalapeno Poppers",
      content: "Crispy Soyabeans",
      price: "$8.99",
      rating: "4.6",
      reviews: "12",
      url: "#"
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      title: "Cajun Chicken",
      content: "Roasted Chicken & Egg",
      price: "$7.99",
      rating: "4.2",
      reviews: "19",
      url: "#"
    }
  ];

  // Shuffle array
  return cards.sort(() => Math.random() - 0.5);
};

export const tabsData = {
  Starters: [
    {
      imageSrc: 
        "https://www.estadao.com.br/resizer/v2/3MOX4CLWZVFHDKSRKXZFHO24EU.jpg?auth=2cb1e3d8335175bc90639a6fdf5e553cb4673e60ce6fcb8ac420ec34f5b3ccda",
      title: "Bruschetta de tomate e manjericão",
      content: "Tomate e Pão italiano",
      price: "$5.99",
      rating: "5.0",
      reviews: "87",
      url: ".src/components/Pages/RecipeDetailsPage.js", // Manteremos isso por enquanto, vamos trocar por um link no final
      slug: "bruschetta-de-tomate-e-manjericao",
      ingredients: ["tomate", "manjericão", "pão italiano", "azeite", "alho", "sal"],
      preparation: [
        "Corte o pão italiano em fatias de espessura média.",
        "Pique os tomates em cubos pequenos e o alho finamente.",
        "Em uma tigela, misture o tomate, o alho, o manjericão fresco, o azeite e o sal.",
        "Toste levemente as fatias de pão.",
        "Coloque a mistura de tomate sobre as fatias de pão tostadas e sirva imediatamente."
      ]
    },
    {
      imageSrc:
        "https://www.minhareceita.com.br/app/uploads/2025/02/carpaccio-de-carne-portal-minha-receita.webp",
      title: "Carpaccio de carne",
      content: "Filé-mignon e Queijo parmesão",
      price: "$2.99",
      rating: "4.8",
      reviews: "32",
      url: "#",
      slug: "carpaccio-de-carne",
      ingredients: ["filé-mignon", "queijo parmesão", "alcaparras", "azeite", "limão", "sal", "pimenta do reino"],
      preparation: [
        "Corte o filé-mignon congelado em fatias muito finas.",
        "Disponha as fatias de carne sobre um prato grande.",
        "Prepare o molho misturando azeite, suco de limão, sal e pimenta.",
        "Regue a carne com o molho e espalhe as alcaparras e o queijo parmesão ralado por cima."
      ]
    },
    {
      imageSrc:
        "https://s2-receitas.glbimg.com/g8xJERPO0rD8arQTLRw7hogSU_A=/0x0:690x460/984x0/smart/filters:strip_icc()/s.glbimg.com/po/rc/media/2013/11/29/16_28_16_103_Salada_Caprese_Faby_c_pia.jpg",
      title: "Salada Caprese",
      content: "Mussarela de búfala e Tomate",
      price: "$7.99",
      rating: "4.9",
      reviews: "89",
      url: "#",
      slug: "salada-caprese",
      ingredients: ["mussarela de búfala", "tomate", "manjericão", "azeite", "sal"],
      preparation: [
        "Fatie os tomates e a mussarela de búfala.",
        "Intercale as fatias de tomate e mussarela em um prato.",
        "Decore com folhas de manjericão fresco, regue com azeite e tempere com sal."
      ]
    },
    {
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5uCgg7xSUR6JzIGNzFPyFHauCHYJnbVSh1w&s",
      title: "Tartare de salmão com abacate",
      content: "Salmão e Abacate",
      price: "$8.99",
      rating: "4.6",
      reviews: "12",
      url: "#",
      slug: "tartare-de-salmao-com-abacate",
      ingredients: ["salmão", "abacate", "cebola roxa", "limão", "azeite", "cebolinha", "sal"],
      preparation: [
        "Pique o salmão fresco e o abacate em cubos pequenos.",
        "Pique a cebola roxa e a cebolinha.",
        "Misture todos os ingredientes delicadamente e tempere com azeite, suco de limão e sal."
      ]
    },
    {
      imageSrc:
        "https://claudia.abril.com.br/wp-content/uploads/2020/02/receita-sopa-creme-abobora-gengibre.jpg?quality=70&strip=info&w=620",
      title: "Creme de abóbora com gengibre",
      content: "Abóbora e Gengibre",
      price: "$7.99",
      rating: "4.2",
      reviews: "19",
      url: "#",
      slug: "creme-de-abobora-com-gengibre",
      ingredients: ["abóbora", "gengibre", "cebola", "alho", "caldo de legumes", "creme de leite"],
      preparation: [
        "Cozinhe a abóbora com cebola, alho e gengibre no caldo de legumes até ficar macia.",
        "Bata tudo no liquidificador até obter um creme homogêneo.",
        "Volte o creme para a panela, adicione o creme de leite e aqueça sem deixar ferver."
      ]
    },
    {
      imageSrc:
        "https://arosa.com.br/wp-content/uploads/2024/04/3Cestinhos-de-Massa-Fillo-com-Salada-Caprese_3012-copy.jpg",
      title: "Cestinha de massa folhada",
      content: "Massa folhada e Queijo brie",
      price: "$2.99",
      rating: "5.0",
      reviews: "61",
      url: "#",
      slug: "cestinha-de-massa-folhada",
      ingredients: ["massa folhada", "queijo brie", "geleia de damasco", "nozes"],
      preparation: [
        "Corte a massa folhada em quadrados e coloque em forminhas de muffin.",
        "Adicione um pedaço de queijo brie em cada cestinha.",
        "Asse até dourar e sirva com geleia de damasco e nozes por cima."
      ]
    },
    {
      imageSrc:
        "https://pastelitoscaruaru.s3.us-east-2.amazonaws.com/product/1632409090.jpg",
      title: "Pastéis de queijo com pimenta biquinho",
      content: "Queijo e Pimenta biquinho",
      price: "$3.99",
      rating: "4.2",
      reviews: "95",
      url: "#",
      slug: "pasteis-de-queijo-com-pimenta-biquinho",
      ingredients: ["massa de pastel", "queijo minas", "pimenta biquinho", "óleo para fritar"],
      preparation: [
        "Recheie os discos de massa de pastel com queijo minas e pimenta biquinho.",
        "Feche os pastéis, apertando as bordas com um garfo.",
        "Frite em óleo quente até dourarem."
      ]
    },
    {
      imageSrc:
        "https://www.minhareceita.com.br/app/uploads/2022/03/camarao-mobile.jpg",
      title: "Camarão empanado com coco",
      content: "Camarão e Coco",
      price: "$3.99",
      rating: "3.9",
      reviews: "26",
      url: "#",
      slug: "camarao-empanado-com-coco",
      ingredients: ["camarão", "coco ralado", "farinha de trigo", "ovo", "sal", "pimenta", "óleo para fritar"],
      preparation: [
        "Tempere os camarões com sal e pimenta.",
        "Passe cada camarão no ovo batido e depois na mistura de farinha de trigo com coco ralado.",
        "Frite em óleo quente até ficarem dourados e crocantes."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Rolinho primavera vegetariano",
      content: "Massa para rolinho e Repolho",
      price: "$4.00",
      rating: "4.2",
      reviews: "145",
      url: "#",
      slug: "rolinho-primavera-vegetariano",
      ingredients: ["massa de rolinho", "repolho", "cenoura", "cogumelos", "molho shoyu", "óleo de gergelim"],
      preparation: [
        "Corte os legumes em tiras finas e refogue-os com shoyu e óleo de gergelim.",
        "Recheie a massa de rolinho com os legumes refogados.",
        "Enrole e frite em óleo quente até ficarem crocantes e dourados."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Tábua de frios e queijos",
      content: "Queijos e Embutidos",
      price: "$12.00",
      rating: "4.9",
      reviews: "500",
      url: "#",
      slug: "tabua-de-frios-e-queijos",
      ingredients: ["queijos variados", "embutidos", "frutas secas", "geleias", "pães", "torradas"],
      preparation: [
        "Arrume uma variedade de queijos e embutidos em uma tábua de madeira.",
        "Adicione acompanhamentos como geleias, frutas secas e pães para harmonizar."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Guacamole com chips de tortilla",
      content: "Abacate e Tortilla",
      price: "$5.50",
      rating: "4.7",
      reviews: "230",
      url: "#",
      slug: "guacamole-com-chips-de-tortilla",
      ingredients: ["abacate", "tomate", "cebola roxa", "coentro", "limão", "sal", "chips de tortilla"],
      preparation: [
        "Amasse o abacate e misture com os demais ingredientes picados.",
        "Tempere com sal e suco de limão. Sirva com chips de tortilla."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Pão de alho recheado com queijo",
      content: "Pão e Queijo",
      price: "$3.20",
      rating: "4.5",
      reviews: "190",
      url: "#",
      slug: "pao-de-alho-recheado-com-queijo",
      ingredients: ["pão", "manteiga", "alho", "salsinha", "queijo muçarela"],
      preparation: [
        "Faça uma pasta com a manteiga, alho e salsinha.",
        "Corte o pão em fatias sem ir até o final.",
        "Recheie com a pasta e fatias de queijo. Asse até o queijo derreter."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Mini quiches de alho-poró",
      content: "Alho-poró e Creme de leite",
      price: "$4.80",
      rating: "4.6",
      reviews: "160",
      url: "#",
      slug: "mini-quiches-de-alho-poró",
      ingredients: ["massa para quiche", "alho-poró", "creme de leite", "ovos", "queijo parmesão", "noz-moscada"],
      preparation: [
        "Forre forminhas de mini quiche com a massa.",
        "Refogue o alho-poró e distribua nas forminhas.",
        "Misture os ovos, creme de leite, queijo e noz-moscada. Despeje sobre o recheio e asse."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Bolinho de bacalhau",
      content: "Bacalhau e Batata",
      price: "$6.00",
      rating: "4.8",
      reviews: "270",
      url: "#",
      slug: "bolinho-de-bacalhau",
      ingredients: ["bacalhau", "batata", "salsinha", "ovo", "cebola", "óleo para fritar"],
      preparation: [
        "Cozinhe a batata e o bacalhau. Amasse a batata e desfie o bacalhau.",
        "Misture a batata, bacalhau, salsinha, ovo e cebola picada.",
        "Modele os bolinhos e frite em óleo quente."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Crostini de cogumelos",
      content: "Pão e Cogumelos",
      price: "$4.20",
      rating: "4.4",
      reviews: "120",
      url: "#",
      slug: "crostini-de-cogumelos",
      ingredients: ["pão ciabatta", "cogumelos", "alho", "salsinha", "manteiga", "azeite de oliva"],
      preparation: [
        "Fatie o pão e toste-o levemente.",
        "Refogue os cogumelos com alho e salsinha na manteiga e azeite.",
        "Coloque o refogado sobre o pão e sirva."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Espetinho de frango com molho de amendoim",
      content: "Frango e Molho de amendoim",
      price: "$5.00",
      rating: "4.3",
      reviews: "100",
      url: "#",
      slug: "espetinho-de-frango-com-molho-de-amendoim",
      ingredients: ["peito de frango", "espetos de madeira", "amendoim", "leite de coco", "molho shoyu"],
      preparation: [
        "Corte o frango em cubos e coloque nos espetos.",
        "Grelhe os espetos até o frango cozinhar.",
        "Sirva com um molho cremoso feito de amendoim, leite de coco e shoyu."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Bolinho de arroz com queijo",
      content: "Arroz e Queijo",
      price: "$3.50",
      rating: "4.1",
      reviews: "85",
      url: "#",
      slug: "bolinho-de-arroz-com-queijo",
      ingredients: ["arroz cozido", "queijo", "ovo", "salsinha", "farinha de rosca", "óleo para fritar"],
      preparation: [
        "Misture o arroz cozido com queijo ralado, ovo e salsinha.",
        "Modele os bolinhos e passe-os na farinha de rosca.",
        "Frite em óleo quente até dourar."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Dadinhos de tapioca",
      content: "Tapioca e Queijo coalho",
      price: "$4.50",
      rating: "4.9",
      reviews: "310",
      url: "#",
      slug: "dadinhos-de-tapioca",
      ingredients: ["tapioca granulada", "queijo coalho", "leite", "sal", "pimenta do reino", "óleo para fritar"],
      preparation: [
        "Ferva o leite e misture com a tapioca e o queijo coalho ralado.",
        "Tempere, misture bem e despeje em uma assadeira. Deixe esfriar e endurecer.",
        "Corte em cubos e frite em óleo quente ou asse no forno."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Minipizza de calabresa",
      content: "Massa de pizza e Calabresa",
      price: "$4.00",
      rating: "4.0",
      reviews: "105",
      url: "#",
      slug: "minipizza-de-calabresa",
      ingredients: ["massa de minipizza", "molho de tomate", "muçarela", "calabresa", "orégano"],
      preparation: [
        "Espalhe molho de tomate sobre a massa.",
        "Cubra com queijo muçarela e rodelas de calabresa.",
        "Leve ao forno até o queijo derreter e a massa dourar. Polvilhe orégano."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Canapé de salmão defumado",
      content: "Salmão defumado e Pão",
      price: "$7.50",
      rating: "4.7",
      reviews: "250",
      url: "#",
      slug: "canape-de-salmao-defumado",
      ingredients: ["salmão defumado", "cream cheese", "endro", "limão", "pão integral"],
      preparation: [
        "Corte o pão em pequenos círculos ou quadrados e toste-os.",
        "Misture o cream cheese com endro picado e um pouco de limão.",
        "Espalhe a mistura sobre o pão e finalize com uma fatia de salmão defumado."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Sopa fria de pepino e iogurte",
      content: "Pepino e Iogurte",
      price: "$3.00",
      rating: "4.2",
      reviews: "70",
      url: "#",
      slug: "sopa-fria-de-pepino-e-iogurte",
      ingredients: ["pepino", "iogurte natural", "hortelã", "alho", "azeite de oliva", "limão"],
      preparation: [
        "Bata no liquidificador o pepino, iogurte, hortelã, alho e um pouco de azeite e limão.",
        "Tempere com sal e pimenta. Leve à geladeira por algumas horas antes de servir."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Torre de berinjela e tomate",
      content: "Berinjela e Tomate",
      price: "$4.50",
      rating: "4.5",
      reviews: "155",
      url: "#",
      slug: "torre-de-berinjela-e-tomate",
      ingredients: ["berinjela", "tomate", "muçarela", "molho de tomate", "manjericão", "azeite de oliva"],
      preparation: [
        "Fatie a berinjela e grelhe ou asse no forno.",
        "Em um prato, monte a torre intercalando fatias de berinjela, tomate e muçarela.",
        "Adicione molho de tomate e leve ao forno para gratinar. Finalize com manjericão."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Ostras frescas com limão",
      content: "Ostras e Limão",
      price: "$9.99",
      rating: "4.9",
      reviews: "400",
      url: "#",
      slug: "ostras-frescas-com-limao",
      ingredients: ["ostras frescas", "limão"],
      preparation: [
        "Abra as ostras com cuidado.",
        "Arrume-as em um prato com gelo.",
        "Sirva com rodelas de limão para que os clientes espremam na hora."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Cogumelos recheados com queijo",
      content: "Cogumelos e Queijo",
      price: "$6.00",
      rating: "4.6",
      reviews: "185",
      url: "#",
      slug: "cogumelos-recheados-com-queijo",
      ingredients: ["cogumelos grandes", "queijo de cabra", "cebolinha", "alho", "azeite de oliva"],
      preparation: [
        "Retire os talos dos cogumelos e pique-os.",
        "Misture os talos picados com queijo de cabra, alho e cebolinha.",
        "Recheie os cogumelos e asse no forno até o queijo derreter."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Bruschetta de figo e presunto cru",
      content: "Figo e Presunto cru",
      price: "$6.50",
      rating: "4.8",
      reviews: "220",
      url: "#",
      slug: "bruschetta-de-figo-e-presunto-cru",
      ingredients: ["pão", "figo", "presunto cru", "queijo gorgonzola", "mel", "alecrim"],
      preparation: [
        "Toste fatias de pão.",
        "Adicione fatias de figo, pedaços de presunto cru e queijo gorgonzola.",
        "Leve ao forno para aquecer. Finalize com um fio de mel e alecrim fresco."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Bolinho de aipim com carne seca",
      content: "Aipim e Carne seca",
      price: "$5.50",
      rating: "4.5",
      reviews: "175",
      url: "#",
      slug: "bolinho-de-aipim-com-carne-seca",
      ingredients: ["aipim cozido", "carne seca desfiada", "cebola", "salsinha", "farinha de rosca", "óleo para fritar"],
      preparation: [
        "Amasse o aipim cozido e misture com a carne seca refogada e temperada.",
        "Modele os bolinhos e passe na farinha de rosca.",
        "Frite em óleo quente até dourar e ficar crocante."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Anéis de cebola",
      content: "Cebola e Farinha",
      price: "$3.00",
      rating: "4.0",
      reviews: "130",
      url: "#",
      slug: "aneis-de-cebola",
      ingredients: ["cebola", "farinha de trigo", "amido de milho", "ovo", "leite", "sal", "óleo para fritar"],
      preparation: [
        "Corte a cebola em rodelas grossas e separe os anéis.",
        "Prepare uma massa com a farinha, amido, ovo e leite.",
        "Passe os anéis na massa e frite em óleo quente até dourar."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Coxinha de frango",
      content: "Frango e Massa de coxinha",
      price: "$2.80",
      rating: "4.8",
      reviews: "300",
      url: "#",
      slug: "coxinha-de-frango",
      ingredients: ["peito de frango", "massa de coxinha", "requeijão", "farinha de rosca", "óleo para fritar"],
      preparation: [
        "Cozinhe o frango e desfie, misturando com requeijão.",
        "Abra a massa de coxinha, recheie e modele.",
        "Passe na farinha de rosca e frite em óleo quente."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Salada de polvo",
      content: "Polvo e Pimentões",
      price: "$8.50",
      rating: "4.7",
      reviews: "195",
      url: "#",
      slug: "salada-de-polvo",
      ingredients: ["polvo cozido", "pimentões coloridos", "cebola roxa", "salsinha", "azeite de oliva", "limão"],
      preparation: [
        "Corte o polvo em rodelas e os pimentões em cubos.",
        "Misture o polvo com os pimentões, cebola roxa e salsinha picada.",
        "Tempere com azeite de oliva e suco de limão. Sirva gelado."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Canapé de caviar",
      content: "Caviar e Blinis",
      price: "$15.00",
      rating: "5.0",
      reviews: "90",
      url: "#",
      slug: "canape-de-caviar",
      ingredients: ["blinis", "crème fraîche", "caviar", "cebolinha"],
      preparation: [
        "Aqueça os blinis levemente.",
        "Espalhe uma camada de crème fraîche sobre cada blini.",
        "Cubra com uma pequena porção de caviar. Decore com cebolinha picada."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Bruschetta de abobrinha com ricota",
      content: "Abobrinha e Ricota",
      price: "$4.00",
      rating: "4.3",
      reviews: "115",
      url: "#",
      slug: "bruschetta-de-abobrinha-com-ricota",
      ingredients: ["pão", "abobrinha", "ricota", "hortelã", "limão", "azeite de oliva"],
      preparation: [
        "Toste as fatias de pão.",
        "Refogue a abobrinha em azeite e tempere. Amasse a ricota com hortelã e limão.",
        "Espalhe a ricota temperada sobre o pão e finalize com a abobrinha refogada."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Queijo coalho com melaço",
      content: "Queijo coalho e Melaço",
      price: "$4.50",
      rating: "4.6",
      reviews: "180",
      url: "#",
      slug: "queijo-coalho-com-melaco",
      ingredients: ["queijo coalho", "melaço de cana", "orégano"],
      preparation: [
        "Corte o queijo coalho em cubos.",
        "Grelhe os cubos em uma frigideira ou churrasqueira.",
        "Sirva o queijo quente, regado com melaço de cana e polvilhado com orégano."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Pastel de feira",
      content: "Massa de pastel e Recheio",
      price: "$3.50",
      rating: "4.7",
      reviews: "250",
      url: "#",
      slug: "pastel-de-feira",
      ingredients: ["massa de pastel", "recheio (carne, queijo, palmito)", "óleo para fritar"],
      preparation: [
        "Recheie a massa de pastel com o recheio de sua escolha.",
        "Feche bem as bordas e frite em óleo quente até a massa ficar dourada e crocante."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Tomate cereja confit",
      content: "Tomate cereja e Alho",
      price: "$4.00",
      rating: "4.4",
      reviews: "100",
      url: "#",
      slug: "tomate-cereja-confit",
      ingredients: ["tomate cereja", "alho", "alecrim", "azeite de oliva", "sal", "açúcar"],
      preparation: [
        "Coloque os tomates cereja inteiros em uma assadeira.",
        "Adicione dentes de alho, galhos de alecrim, azeite, sal e uma pitada de açúcar.",
        "Asse em fogo baixo por cerca de 1 hora. Sirva com pão ou torradas."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Bruschetta de cogumelos selvagens",
      content: "Cogumelos e Pão",
      price: "$5.50",
      rating: "4.7",
      reviews: "200",
      url: "#",
      slug: "bruschetta-de-cogumelos-selvagens",
      ingredients: ["pão rústico", "mix de cogumelos", "alho", "salsinha", "vinho branco", "azeite de oliva"],
      preparation: [
        "Toste as fatias de pão.",
        "Refogue os cogumelos com alho, salsinha e um pouco de vinho branco.",
        "Coloque o refogado sobre o pão e finalize com um fio de azeite."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Tempurá de legumes",
      content: "Legumes e Massa de tempurá",
      price: "$5.90",
      rating: "4.6",
      reviews: "190",
      url: "#",
      slug: "tempura-de-legumes",
      ingredients: ["legumes variados (abobrinha, cenoura)", "farinha de trigo", "amido de milho", "água gelada", "óleo para fritar"],
      preparation: [
        "Corte os legumes em palitos finos.",
        "Prepare a massa do tempurá misturando a farinha com amido e água gelada.",
        "Mergulhe os legumes na massa e frite em óleo quente até ficarem crocantes."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Salada de grão de bico com atum",
      content: "Grão de bico e Atum",
      price: "$4.50",
      rating: "4.3",
      reviews: "140",
      url: "#",
      slug: "salada-de-grao-de-bico-com-atum",
      ingredients: ["grão de bico cozido", "atum em lata", "cebola roxa", "tomate", "salsinha", "azeite de oliva", "limão"],
      preparation: [
        "Misture o grão de bico cozido com o atum, cebola e tomate picados.",
        "Tempere com azeite, suco de limão e salsinha fresca. Sirva em temperatura ambiente ou gelada."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Pão de queijo recheado",
      content: "Pão de queijo e Recheio",
      price: "$3.80",
      rating: "4.9",
      reviews: "380",
      url: "#",
      slug: "pao-de-queijo-recheado",
      ingredients: ["pão de queijo", "recheio (catupiry, carne seca)", "queijo minas"],
      preparation: [
        "Asse o pão de queijo até ficar levemente dourado.",
        "Abra-o e recheie com catupiry, carne seca ou queijo minas.",
        "Leve ao forno por mais alguns minutos para aquecer o recheio."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Guioza de porco",
      content: "Carne de porco e Massa de guioza",
      price: "$5.50",
      rating: "4.7",
      reviews: "210",
      url: "#",
      slug: "guioza-de-porco",
      ingredients: ["massa de guioza", "carne de porco moída", "repolho", "cebolinha", "gengibre", "shoyu"],
      preparation: [
        "Prepare o recheio misturando a carne moída, repolho, cebolinha, gengibre e shoyu.",
        "Recheie as massas de guioza e feche-as.",
        "Cozinhe no vapor e depois doure em uma frigideira com um pouco de óleo."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Tostex de queijo e presunto",
      content: "Pão e Queijo",
      price: "$2.50",
      rating: "4.1",
      reviews: "105",
      url: "#",
      slug: "tostex-de-queijo-e-presunto",
      ingredients: ["pão de forma", "presunto", "queijo muçarela", "manteiga"],
      preparation: [
        "Monte o sanduíche com as fatias de pão, presunto e queijo.",
        "Passe manteiga nos dois lados do pão e coloque na sanduicheira ou frigideira.",
        "Aqueça até o pão ficar dourado e crocante e o queijo derreter."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Torta de queijo",
      content: "Queijo e Massa",
      price: "$6.00",
      rating: "4.5",
      reviews: "180",
      url: "#",
      slug: "torta-de-queijo",
      ingredients: ["massa para torta", "queijo (ricota, requeijão)", "ovos", "creme de leite", "noz-moscada"],
      preparation: [
        "Forre uma forma com a massa.",
        "Prepare o recheio misturando o queijo, ovos, creme de leite e temperos.",
        "Despeje o recheio na massa e asse até ficar firme e dourado."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Minibolinho de carne",
      content: "Carne moída e Pão",
      price: "$4.00",
      rating: "4.2",
      reviews: "130",
      url: "#",
      slug: "minibolinhas-de-carne",
      ingredients: ["carne moída", "pão amanhecido", "cebola", "alho", "salsinha", "ovo"],
      preparation: [
        "Misture a carne moída com o pão amanhecido umedecido, cebola, alho, salsinha e ovo.",
        "Modele pequenas bolinhas e frite ou asse no forno até cozinhar por completo."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Bruschetta de queijo de cabra e geleia de pimenta",
      content: "Queijo de cabra e Pimenta",
      price: "$6.00",
      rating: "4.8",
      reviews: "250",
      url: "#",
      slug: "bruschetta-de-queijo-de-cabra-e-geleia-de-pimenta",
      ingredients: ["pão", "queijo de cabra", "geleia de pimenta", "alecrim"],
      preparation: [
        "Toste as fatias de pão.",
        "Espalhe o queijo de cabra sobre o pão e adicione uma colher de geleia de pimenta.",
        "Decore com um raminho de alecrim e sirva."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Casquinha de siri",
      content: "Carne de siri e Farinha de rosca",
      price: "$7.00",
      rating: "4.9",
      reviews: "320",
      url: "#",
      slug: "casquinha-de-siri",
      ingredients: ["carne de siri", "leite de coco", "tomate", "cebola", "coentro", "farinha de rosca"],
      preparation: [
        "Refogue a carne de siri com tomate, cebola e coentro.",
        "Adicione o leite de coco e cozinhe por alguns minutos.",
        "Transfira a mistura para casquinhas de siri, cubra com farinha de rosca e leve ao forno para gratinar."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Bruschetta de salmão defumado",
      content: "Salmão defumado e Pão",
      price: "$7.50",
      rating: "4.7",
      reviews: "220",
      url: "#",
      slug: "bruschetta-de-salmao-defumado",
      ingredients: ["pão integral", "cream cheese", "salmão defumado", "cebolinha", "alcaparras", "limão"],
      preparation: [
        "Toste as fatias de pão.",
        "Espalhe uma camada de cream cheese temperado com limão sobre o pão.",
        "Coloque fatias de salmão defumado e decore com alcaparras e cebolinha."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Bolinho de feijoada",
      content: "Feijoada e Couve",
      price: "$5.00",
      rating: "4.6",
      reviews: "200",
      url: "#",
      slug: "bolinho-de-feijoada",
      ingredients: ["feijoada cozida e triturada", "farinha de mandioca", "couve", "bacon", "óleo para fritar"],
      preparation: [
        "Misture a feijoada triturada com a farinha de mandioca até dar ponto de enrolar.",
        "Recheie com couve refogada e um pedacinho de bacon. Modele e frite em óleo quente."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Espetinho de linguiça e queijo",
      content: "Linguiça e Queijo coalho",
      price: "$4.00",
      rating: "4.5",
      reviews: "180",
      url: "#",
      slug: "espetinho-de-linguica-e-queijo",
      ingredients: ["linguiça calabresa", "queijo coalho", "espetos de madeira"],
      preparation: [
        "Corte a linguiça e o queijo em cubos.",
        "Monte os espetinhos, intercalando a linguiça e o queijo.",
        "Grelhe os espetinhos até a linguiça cozinhar e o queijo dourar."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Ceviche de peixe branco",
      content: "Peixe branco e Limão",
      price: "$8.00",
      rating: "4.9",
      reviews: "300",
      url: "#",
      slug: "ceviche-de-peixe-branco",
      ingredients: ["filé de peixe branco", "limão", "cebola roxa", "pimenta dedo-de-moça", "coentro"],
      preparation: [
        "Corte o peixe em cubos e adicione suco de limão para 'cozinhar'.",
        "Misture o peixe com cebola roxa, pimenta dedo-de-moça e coentro picados.",
        "Deixe marinar na geladeira por alguns minutos. Sirva gelado."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Focaccia com alecrim e sal grosso",
      content: "Focaccia e Alecrim",
      price: "$3.50",
      rating: "4.6",
      reviews: "170",
      url: "#",
      slug: "focaccia-com-alecrim-e-sal-grosso",
      ingredients: ["massa de focaccia", "alecrim", "sal grosso", "azeite de oliva"],
      preparation: [
        "Abra a massa de focaccia em uma assadeira.",
        "Regue com azeite de oliva e pressione os dedos na massa.",
        "Espalhe raminhos de alecrim e sal grosso. Asse até dourar."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Mini hambúrgueres",
      content: "Carne moída e Pão",
      price: "$5.00",
      rating: "4.5",
      reviews: "220",
      url: "#",
      slug: "mini-hamburgueres",
      ingredients: ["carne moída", "mini pães de hambúrguer", "queijo", "alface", "tomate"],
      preparation: [
        "Modele pequenos hambúrgueres e grelhe.",
        "Monte os mini pães com a carne, queijo e os vegetais. Sirva com molhos."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Dadinhos de queijo provolone",
      content: "Queijo provolone e Farinha",
      price: "$6.00",
      rating: "4.4",
      reviews: "150",
      url: "#",
      slug: "dadinhos-de-queijo-provolone",
      ingredients: ["queijo provolone", "farinha de trigo", "ovo", "farinha de rosca", "óleo para fritar"],
      preparation: [
        "Corte o queijo provolone em cubos.",
        "Empane os cubos na farinha de trigo, ovo e depois na farinha de rosca.",
        "Frite em óleo quente até a casca ficar dourada e o queijo derreter."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Bruschetta de queijo e tomate seco",
      content: "Tomate seco e Pão",
      price: "$5.00",
      rating: "4.6",
      reviews: "190",
      url: "#",
      slug: "bruschetta-de-queijo-e-tomate-seco",
      ingredients: ["pão", "queijo muçarela", "tomate seco", "azeitonas pretas"],
      preparation: [
        "Toste as fatias de pão e coloque o queijo e o tomate seco por cima.",
        "Leve ao forno para o queijo derreter.",
        "Finalize com azeitonas pretas picadas."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Salada de carpaccio de abobrinha",
      content: "Abobrinha e Parmesão",
      price: "$4.50",
      rating: "4.5",
      reviews: "165",
      url: "#",
      slug: "salada-de-carpaccio-de-abobrinha",
      ingredients: ["abobrinha", "queijo parmesão", "azeite de oliva", "limão", "alcaparras", "pimenta do reino"],
      preparation: [
        "Fatie a abobrinha em lâminas finas com um mandoline.",
        "Arrume as fatias em um prato.",
        "Tempere com azeite, suco de limão, lascas de parmesão e alcaparras. Finalize com pimenta do reino."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Bolinho de mandioca com queijo",
      content: "Mandioca e Queijo",
      price: "$4.00",
      rating: "4.4",
      reviews: "120",
      url: "#",
      slug: "bolinho-de-mandioca-com-queijo",
      ingredients: ["mandioca cozida", "queijo muçarela", "ovo", "farinha de rosca", "óleo para fritar"],
      preparation: [
        "Amasse a mandioca cozida.",
        "Recheie com pedaços de queijo muçarela e enrole. Passe na farinha de rosca.",
        "Frite em óleo quente até dourar."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Espetinho de camarão e tomate cereja",
      content: "Camarão e Tomate cereja",
      price: "$7.00",
      rating: "4.8",
      reviews: "240",
      url: "#",
      slug: "espetinho-de-camarao-e-tomate-cereja",
      ingredients: ["camarão", "tomate cereja", "manjericão", "azeite de oliva", "limão"],
      preparation: [
        "Monte os espetinhos alternando camarão e tomate cereja.",
        "Grelhe os espetinhos até o camarão ficar rosado.",
        "Regue com azeite de oliva e suco de limão. Decore com folhas de manjericão."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Bruschetta de presunto de parma e rúcula",
      content: "Presunto de parma e Pão",
      price: "$6.50",
      rating: "4.7",
      reviews: "210",
      url: "#",
      slug: "bruschetta-de-presunto-de-parma-e-rucula",
      ingredients: ["pão", "presunto de parma", "rúcula", "queijo parmesão", "azeite de oliva"],
      preparation: [
        "Toste as fatias de pão.",
        "Coloque uma camada de rúcula, uma fatia de presunto de parma e finalize com lascas de parmesão.",
        "Regue com azeite de oliva e sirva."
      ]
    },
    {
      imageSrc: "https://placehold.co/500x500/EFEFEF/AAAAAA&text=Recipe",
      title: "Mini kibe",
      content: "Carne moída e Trigo para kibe",
      price: "$4.50",
      rating: "4.5",
      reviews: "180",
      url: "#",
      slug: "mini-kibe",
      ingredients: ["carne moída", "trigo para kibe", "hortelã", "cebola", "sal", "pimenta síria"],
      preparation: [
        "Hidrate o trigo para kibe e misture com a carne moída, hortelã, cebola e temperos.",
        "Modele pequenos kibes e frite ou asse até dourar."
      ]
    }
  ],
  Main: getRandomCards(),
  Soup: getRandomCards(),
  Desserts: getRandomCards()
};

export default ({
  heading = "Checkout the Menu",
  tabs = tabsData
}) => {
  /*
   * To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab
   * as the key and value of the key will be its content (as an array of objects).
   * To see what attributes are configurable of each object inside this array see the example above for "Starters".
   */
  const tabsKeys = Object.keys(tabs);
  const [activeTab, setActiveTab] = useState(tabsKeys[0]);

  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>{heading}</Header>
          <TabsControl>
            {Object.keys(tabs).map((tabName, index) => (
              <TabControl key={index} active={activeTab === tabName} onClick={() => setActiveTab(tabName)}>
                {tabName}
              </TabControl>
            ))}
          </TabsControl>
        </HeaderRow>

        {tabsKeys.map((tabKey, index) => (
          <TabContent
            key={index}
            variants={{
              current: {
                opacity: 1,
                scale:1,
                display: "flex",
              },
              hidden: {
                opacity: 0,
                scale:0.8,
                display: "none",
              }
            }}
            transition={{ duration: 0.4 }}
            initial={activeTab === tabKey ? "current" : "hidden"}
            animate={activeTab === tabKey ? "current" : "hidden"}
          >
            {tabs[tabKey].map((card, index) => (
              <CardContainer key={index}>
                <Card className="group" to={`/receita/${card.slug}`} initial="rest" whileHover="hover" animate="rest">
                  <CardImageContainer imageSrc={card.imageSrc}>
                    <CardRatingContainer>
                      <CardRating>
                        <StarIcon />
                        {card.rating}
                      </CardRating>
                      <CardReview>({card.reviews})</CardReview>
                    </CardRatingContainer>
                    <CardHoverOverlay
                      variants={{
                        hover: {
                          opacity: 1,
                          height: "auto"
                        },
                        rest: {
                          opacity: 0,
                          height: 0
                        }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardButton>Ver Receita</CardButton>
                    </CardHoverOverlay>
                  </CardImageContainer>
                  <CardText>
                    <CardTitle>{card.title}</CardTitle>
                    <CardContent>{card.content}</CardContent>
                    <CardPrice>{card.price}</CardPrice>
                  </CardText>
                </Card>
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
