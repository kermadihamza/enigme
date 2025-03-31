import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Liste des énigmes
const enigmes = [
  { question: "C'est dans cet endroit que nos regards se sont croisés pour la première fois. Où étions-nous ?", reponse: "Mezzo" },
  { question: "Ce cocktail, que l'on a trouvé dégueulasse le premier soir, Quel était-il ?", reponse: "Gin Tonic" },
  { question: "Notre premier voyage ensemble a été inoubliable. Quelle ville avons-nous visitée pour la première fois ?", reponse: "Amsterdam" },
  { question: "La première fois que nous avons partagé ce moment intime, et profond hehe c'était à quelle date ?", reponse: "31/10/2021" },
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
  background: linear-gradient(135deg, #fe4a49 0%, #f6a5c0 100%);  // Dégradé de couleur comme Tinder
  font-family: 'Poppins', sans-serif;
  padding: 20px;
  color: #333;
  text-align: center;
`;


const Header = styled.header`
  width: 100%;
  padding: 20px;
  background-color: #ff4b5c;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center; /* Centre le texte horizontalement */
  border-radius: 10px;
  margin: 0; /* Évite toute marge par défaut */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center; /* Centre le contenu horizontalement */
  align-items: center; /* Centre le contenu verticalement */
  height: 80px; /* Ajuste la hauteur si nécessaire */
  box-sizing: border-box; /* Assure que padding et bordure ne modifient pas la largeur totale */
`;


const Section = styled.section`
  width: 100%;
  max-width: 350px;
  margin-top: 80px; /* Ajout d'un espacement pour le header fixe */
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #ff4b5c;
  margin-bottom: 20px;
  text-align: center;  /* Centrer le texte */
`;


const Question = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  font-size: 1rem;
  border: 2px solid #ff4b5c;
  border-radius: 5px;
  margin-bottom: 15px;
  text-align: center;
`;

const Button = styled.button`
  padding: 12px;
  background: #ff4b5c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  margin-top: 10px;
  transition: background 0.3s ease;

  &:hover {
    background: #e43a4e;
  }
`;

const ResetButton = styled(Button)`
  background: #555;
  margin-top: 10px;

  &:hover {
    background: #333;
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
  const storedIndex = localStorage.getItem("enigmeIndex");
  const [index, setIndex] = useState(() => storedIndex ? parseInt(storedIndex) : 0);  // Handle null case
  const [reponse, setReponse] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("enigmeIndex", index.toString());  // Ensure index is a string
  }, [index]);

  const verifierReponse = () => {
    if (reponse.trim().toLowerCase() === enigmes[index].reponse.toLowerCase()) {
      setMessage("Bravo ! 🎉");
      setTimeout(() => {
        setMessage("");
        setReponse("");
        if (index < enigmes.length - 1) {
          setIndex(index + 1);
        } else {
          setMessage("Félicitations, tu as fini toutes les énigmes ! 🎊");
        }
      }, 1500);
    } else {
      setMessage("Mauvaise réponse, réessaie ! ❌");
      setTimeout(() => setMessage(""), 1500);
    }
  };

  const resetGame = () => {
    setIndex(0);
    localStorage.removeItem("enigmeIndex");
    setReponse("");  // Clear response input as well
  };

  return (
    <Container>
      <Header>Souviens-toi de nous</Header> {/* Nouveau header */}
      <Section>
        <Question>{enigmes[index].question}</Question>
        <Input 
          type="text" 
          value={reponse} 
          onChange={(e) => setReponse(e.target.value)} 
          placeholder="Ta réponse ici..." 
        />
        <Button onClick={verifierReponse}>Valider</Button>
        <ResetButton onClick={resetGame}>Réinitialiser</ResetButton>
        {message && <CongratulationMessage>{message}</CongratulationMessage>}
      </Section>
    </Container>
  );
}