import React, { useState } from "react";
import tw from "twin.macro";
//import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
//import Hero from "components/hero/TwoColumnWithVideo.js";
import Header from "components/headers/light.js"; // Adicione esta linha
//import Features from "components/features/ThreeColSimple.js";
//import MainFeature from "components/features/TwoColWithButton.js";
//wimport MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
import TabGrid from "components/cards/TabCardGrid.js";
//import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
//import DownloadApp from "components/cta/DownloadApp.js";
//import Footer from "components/footers/FiveColumnWithInputForm.js";

//import chefIconImageSrc from "images/chef-icon.svg";
//import celebrationIconImageSrc from "images/celebration-icon.svg";
//import shopIconImageSrc from "images/shop-icon.svg";

export default () => {
  const [search, setSearch] = useState("");
  //const Subheading = tw.span`tracking-wider text-sm font-medium`;
  //const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  //const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  //const Description = tw.span`inline-block mt-8`;
  const CafeText = tw.span`bg-yellow-300 text-yellow-900 px-4 rounded-lg font-bold`;
  const AlmocoText = tw.span`bg-green-300 text-green-900 px-4 rounded-lg font-bold`;
  const LancheText = tw.span`bg-pink-200 text-pink-800 px-4 rounded-lg font-bold`;
  const JantarText = tw.span`bg-blue-900 text-blue-100 px-4 rounded-lg font-bold`;

  function getPeriodo() {
    const hora = new Date().getHours();
    if (hora >= 4 && hora < 10) return <CafeText>café da manhã?</CafeText>;
    if (hora >= 10 && hora < 14) return <AlmocoText>almoço?</AlmocoText>;
    if (hora >= 14 && hora < 17)
      return <LancheText>lanche da tarde?</LancheText>;
    return <JantarText>jantar?</JantarText>;
  }

  //const imageCss = tw`rounded-4xl`;
  return (
    <AnimationRevealPage disabled>
      <Header /> {/* Adiciona o menu com os botões de navegação */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          alert(`Você pesquisou por: ${search}`);
          // Aqui você pode filtrar dados, chamar API, etc.
          try {
                const response = await fetch("http://localhost/TCC/php/processo.php", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        search: search
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert(`Receita gerada: ${data.receita}`);
                    // result.classList.remove('error');
                    // result.style.display = 'block';
                } else {
                    alert(`Erro: ${data.error}`);
                    // resultText.textContent = data.error || 'Erro ao processar solicitação.';
                    // result.classList.add('error');
                    // result.style.display = 'block';
                }
            } catch (error) {
                alert('Erro de conexão com o servidor.');
                // resultText.textContent = 'Erro de conexão com o servidor.';
                // result.classList.add('error');
                // result.style.display = 'block';
            }
        }}
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
      <div id="search-bar" style={{ display: "flex", paddingTop: "80px" }}>
        <input
          type="text"
          placeholder="Pesquise por pratos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "1rem 1rem",
            fontSize: "1.25rem",
            borderRadius: "30px 0 0 30px",
            border: "2px solid #6415ff",
            outline: "none",
            width: "350px",
            maxWidth: "90vw",
          }}
        />
        <button
          type="submit"
          className="p-4 px-8 text-lg rounded-r-full border-2 border-primary-700 bg-primary-700 text-white font-bold"
        >
          Buscar
        </button>
        </div>
      </form>
      <TabGrid heading={<>O que você quer fazer de {getPeriodo()}</>} />
      {/*<section
        id="sobre-nos"
        style={{ scrollMarginTop: "100px", padding: "60px 0" }}
      >
        <h2
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
        >
          Sobre Nós
        </h2>
        <p>
          Somos um grupo de estudandes apaixonados por tecnologia e culinária,
          dedicados a criar uma plataforma que conecta pessoas a experiências
          gastronômicas únicas. Nossa missão é facilitar o acesso a pratos
          deliciosos e promover a facilidade na decisão da sua refeição. Acreditamos que a
          comida é uma forma de arte e queremos compartilhar essa paixão com o
          mundo.
        </p>
      </section>*/}
      {/*<Features
        heading={
          <>
            Amazing <HighlightedText>Services.</HighlightedText>
          </>
        }
        cards={[
          {
            imageSrc: shopIconImageSrc,
            title: "230+ Locations",
            description: "Lorem ipsum donor amet siti ceali placeholder text",
            url: "https://google.com",
          },
          {
            imageSrc: chefIconImageSrc,
            title: "Professional Chefs",
            description: "Lorem ipsum donor amet siti ceali placeholder text",
            url: "https://timerse.com",
          },
          {
            imageSrc: celebrationIconImageSrc,
            title: "Birthday Catering",
            description: "Lorem ipsum donor amet siti ceali placeholder text",
            url: "https://reddit.com",
          },
        ]}
        imageContainerCss={tw`p-2!`}
        imageCss={tw`w-20! h-20!`}
      />
      <MainFeature2
        subheading={<Subheading>A Reputed Brand</Subheading>}
        heading={
          <>
            Why <HighlightedText>Choose Us ?</HighlightedText>
          </>
        }
        statistics={[
          {
            key: "Orders",
            value: "94000+",
          },
          {
            key: "Customers",
            value: "11000+",
          },
          {
            key: "Chefs",
            value: "1500+",
          },
        ]}
        primaryButtonText="Order Now"
        primaryButtonUrl="https://order.now.com"
        imageInsideDiv={false}
        imageSrc="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEzNzI2fQ&auto=format&fit=crop&w=768&q=80"
        imageCss={Object.assign(tw`bg-cover`, imageCss)}
        imageContainerCss={tw`md:w-1/2 h-auto`}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25`}
        textOnLeft={true}
      />
      <section id="depoimentos" style={{ scrollMarginTop: "100px" }}>
        <Testimonial
          subheading=""
          heading={
            <>
              Customers <HighlightedText>Love Us.</HighlightedText>
            </>
          }
        />
      </section>
      <DownloadApp
        text={
          <>
            People around you are ordering delicious meals using the{" "}
            <HighlightedTextInverse>Treact App.</HighlightedTextInverse>
          </>
        }
      />
      <Footer />*/}
    </AnimationRevealPage>
  );
};
