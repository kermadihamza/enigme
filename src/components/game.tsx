import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Liste des énigmes
const enigmes = [
  { question: "C'est dans cet endroit que nos regards se sont croisés pour la première fois. Où étions-nous ?", reponse: "Mezzo" },
  { question: "Ce cocktail, que l'on a trouvé dégueulasse le premier soir, Quel était-il ?", reponse: "Gin Tonic" },
  { question: "Notre premier voyage ensemble a été inoubliable. Quelle ville avons-nous visitée pour la première fois ?", reponse: "Amsterdam" },
  { question: "La première fois que nous avons partagé ce moment intime, et profond hehe c'était à quelle date ?", reponse: "31/10/2022" },
  { question: "De quelle couleur était le pantalon que tu portais lors de notre première fois ?", reponse: "Vert" },
  { question: "Cette chanson nous rappelle notre histoire. Quel est le titre de notre musique ?", reponse: "Pour moi" },
  { question: "Quel modèle de voiture avons-nous loué lors de notre premier road trip ensemble ? Modèle, pas la marque", reponse: "Polo" },
  { question: "La première nuit que nous avons passée ensemble, à quelle date correspond-elle ?", reponse: "10/10/2021" },
  { question: "Tu m'avais envoyé une playlist avec des styles musicaux pendant que j'étais à Lyon. Quel était le style musical ?", reponse: "K-Pop" },
  { question: "Mais c'est qui ... ?", reponse: "Aly" },
  { question: "Le premier jeudi ou je suis venu faire une soirée jeux de societes, qu'est ce que j'qi été acheter au carrefour et que je n'ai pas utilisé ?", reponse: "Capotes" },
  { question: "Dans quel parc avons-nous fait une longue balade ensemble lors de notre première sortie ?", reponse: "Parc du Cinquantenaire" },
  { question: "Quel artiste on a vu en premier aux Ardentes ?", reponse: "Niro" }
];

// Composants stylisés
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Arial', sans-serif;
  padding: 20px;
  color: #333;
`;

const Header = styled.header`
  width: 100%;
  background-color: #d94e8c;
  padding: 30px;
  text-align: center;
  color: white;
  font-size: 2.2rem;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #d94e8c;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 20px;
  max-width: 700px;
  text-align: center;
`;

const Section = styled.section`
  width: 100%;
  max-width: 1000px;
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

const EnvelopeImage = styled.img`
  width: 150px;
  height: 150px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  width: 384px;
  height: 84px;
  background-image: url('/arrow.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  animation: bounce 1s infinite;

  @keyframes bounce {
    0% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(-5px);
    }
    100% {
      transform: translateX(-50%) translateY(0);
    }
  }
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 0 auto;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid #d94e8c;
  z-index: 100;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #d94e8c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #c4376c;
  }
`;

const InputField = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #d94e8c;
  border-radius: 5px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const ResetButton = styled(Button)`
  background-color: #ff5050;
  &:hover {
    background-color: #e44d4d;
  }
`;

const CongratulationMessage = styled.div`
  font-size: 1.5rem;
  color: #28a745;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

export default function EnigmeGame() {
  // Charger les données depuis localStorage lors du montage du composant
  const [motsTrouves, setMotsTrouves] = useState<string[]>([]);
  const [enigmeActuelleIndex, setEnigmeActuelleIndex] = useState<number>(0);

  useEffect(() => {
    // Charger les données du localStorage au premier rendu
    const motsTrouvesFromStorage = localStorage.getItem("motsTrouves");
    const motsTrouvesInitial = motsTrouvesFromStorage ? JSON.parse(motsTrouvesFromStorage) : [];
    setMotsTrouves(motsTrouvesInitial);

    const enigmeActuelleIndexFromStorage = localStorage.getItem("enigmeActuelleIndex");
    const enigmeActuelleIndexInitial = enigmeActuelleIndexFromStorage ? parseInt(enigmeActuelleIndexFromStorage) : 0;
    setEnigmeActuelleIndex(enigmeActuelleIndexInitial);
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [selectedEnigme, setSelectedEnigme] = useState<any>(null);
  const [input, setInput] = useState("");
  const [erreur, setErreur] = useState("");

  const verifierReponse = () => {
    if (input.trim().toLowerCase() === selectedEnigme.reponse.toLowerCase()) {
      const nouveauxMots = [...motsTrouves, selectedEnigme.reponse];
      setMotsTrouves(nouveauxMots);
      localStorage.setItem("motsTrouves", JSON.stringify(nouveauxMots));
      setOpenModal(false);
      setInput("");
      setErreur("");
      setEnigmeActuelleIndex(enigmeActuelleIndex + 1);
      localStorage.setItem("enigmeActuelleIndex", (enigmeActuelleIndex + 1).toString());
    } else {
      setErreur("T'es éclaté, c'est faux... Retente chacal !");
    }
  };

  const openEnigmeModal = (enigme: any, index: number) => {
    if (index > enigmeActuelleIndex) {
      return;
    }
    setSelectedEnigme(enigme);
    setOpenModal(true);
    setErreur("");
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedEnigme(null);
  };

  const resetGame = () => {
    localStorage.removeItem("motsTrouves");
    localStorage.removeItem("enigmeActuelleIndex");
    setMotsTrouves([]);
    setErreur("");
    setEnigmeActuelleIndex(0);
  };

  const hasWon = motsTrouves.length === enigmes.length;

  return (
    <Container>
      <Header>Souviens-toi de Nous !</Header>
      <Title>Réponds et Gagne : Une Journée sur mesure pour mon ex préférée</Title>
      <Description>
        Hellooooooow ! J'ai eu une idée de petit jeu pendant ton voyage. C’est un jeu facile, et il y a une question par jour. Chaque jour, tu vas répondre à une question sur nous et nos souvenirs. Si tu réponds correctement à toutes les questions, une soirée spéciale sera organisée pour toi !
      </Description>

      <Section>
        <GridContainer>
          {enigmes.map((enigme, index) => (
            <div key={enigme.question} style={{ position: "relative" }}>
              {index === enigmeActuelleIndex && <Arrow />}
              <EnvelopeImage
                src="/env.png"
                alt="Enveloppe"
                onClick={() => openEnigmeModal(enigme, index)}
              />
            </div>
          ))}
        </GridContainer>
      </Section>

      {openModal && selectedEnigme && (
        <ModalContainer>
          <h3>{selectedEnigme.question}</h3>
          <InputField
            type="text"
            placeholder="Entrez votre réponse"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {erreur && <ErrorMessage>{erreur}</ErrorMessage>}
          <Button onClick={verifierReponse}>Vérifier la réponse</Button>
          <Button onClick={closeModal}>Fermer</Button>
        </ModalContainer>
      )}

      <ResetButton onClick={resetGame}>Réinitialiser le jeu, ne le fait pas chacal</ResetButton>

      {hasWon && <CongratulationMessage>Félicitations ! Envoie fesses et bon retour🎉</CongratulationMessage>}
    </Container>
  );
}
