import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Page d'énigme
const enigmes = [
  { question: "De quelle couleur était le pantalon que tu portais lors de notre première fois ?", reponse: "Vert" },
  { question: "Cette chanson nous rappelle notre histoire. Quel est le titre de notre musique ?", reponse: "Pour moi" },
  { question: "Quel modèle de voiture avons-nous loué lors de notre premier road trip ensemble ? Modèle, pas la marque", reponse: "Polo" },
  { question: "La première nuit que nous avons passée ensemble, à quelle date correspond-elle ?", reponse: "10/10/2021" },
  { question: "Tu m'avais envoyé une playlist avec des styles musicaux pendant que j'étais à Lyon. Quel était le style musical ?", reponse: "K-Pop" },
  { question: "Mais c'est qui ... ?", reponse: "Aly" },
  { question: "Le premier jeudi où je suis venu faire une soirée jeux de sociétés, qu'est-ce que j'ai été acheter au carrefour et que je n'ai pas utilisé ?", reponse: "Capotes" },
  { question: "Dans quel parc avons-nous fait une longue balade ensemble lors de notre première sortie ?", reponse: "Parc du Cinquantenaire" },
  { question: "Quel artiste on a vu en premier aux Ardentes ?", reponse: "Niro" }
];

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #fe4a49 0%, #f6a5c0 100%);
  font-family: 'Poppins', sans-serif;
  padding: 20px;
  color: #333;
  text-align: center;
`;

const ContainerError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #000000;
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
  margin-top: 80px;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #ff4b5c;
  margin-bottom: 20px;
`;

const SubTitle = styled.div`
  font-size: 1.2rem;
  color: #fff;
  background: linear-gradient(135deg, #ff4b5c 0%, #f6a5c0 100%);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 30px;
  text-align: center;
  font-weight: 500;
  line-height: 1.6;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: linear-gradient(135deg, #f6a5c0 0%, #ff4b5c 100%);
  }

  p {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    line-height: 1.4;
  }

  span {
    font-weight: bold;
    color: #fff7d9;
  }
`;

const Question = styled.h2<{ isBlurred: boolean }>`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
  filter: ${(props) => (props.isBlurred ? "blur(5px)" : "none")};
  transition: filter 0.3s ease;
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
  background: #000000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  margin-top: 10px;
  transition: background 0.3s ease;

  &:hover {
    background: #ffffff;
  }
`;
const ErrorMessage = styled.p`
  color: #da291c;
  font-weight: bold;
  margin-top: 10px;
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

const GlitchText = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
  position: relative;
  color: red;
  text-shadow: 3px 3px 0px #ff0000, -3px -3px 0px #00ff00;
  animation: glitch 0.75s infinite alternate;

  @keyframes glitch {
    0% { transform: translate(2px, -2px); }
    100% { transform: translate(-2px, 2px); }
  }
`;

function EnigmeGame() {
  const storedIndex = localStorage.getItem("enigmeIndex");
  const [index, setIndex] = useState(() => storedIndex ? parseInt(storedIndex) : 0);
  const [reponse, setReponse] = useState("");
  const [message, setMessage] = useState("");
  const [lastAnsweredTime, setLastAnsweredTime] = useState<string | null>(
    localStorage.getItem("lastAnsweredTime")
  );

  useEffect(() => {
    localStorage.setItem("enigmeIndex", index.toString());
  }, [index]);

  useEffect(() => {
    if (lastAnsweredTime) {
      localStorage.setItem("lastAnsweredTime", lastAnsweredTime);
    }
  }, [lastAnsweredTime]);

  const canAnswer = lastAnsweredTime ? Date.now() - parseInt(lastAnsweredTime) >= 12 * 60 * 60 * 1000 : true;

  const verifierReponse = () => {
    if (reponse.trim().toLowerCase() === enigmes[index].reponse.toLowerCase()) {
      setMessage("Bonne réponse wesh, envoie fesse a kermadi2 pour fêter ça ! 🎉");
      setLastAnsweredTime(Date.now().toString());
      localStorage.setItem("lastAnsweredTime", Date.now().toString());
      setTimeout(() => {
        setMessage("");
        setReponse("");
        if (index < enigmes.length - 1) {
          setIndex(index + 1);
        } else {
          setMessage("Félicitations, tu as fini toutes les énigmes ! 🎊");
        }
      }, 5000);
    } else {
      setMessage("Mauvaise réponse chacal, réessaie tching tchang tchong ! ❌");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const resetGame = () => {
    setIndex(0);
    localStorage.removeItem("enigmeIndex");
    setReponse("");
    setLastAnsweredTime(null);
    localStorage.removeItem("lastAnsweredTime");
  };

  const remainingTime = lastAnsweredTime
    ? Math.max(
        0,
        Math.ceil(
          (12 * 60 * 60 * 1000 - (Date.now() - parseInt(lastAnsweredTime))) / 1000
        )
      )
    : 0;

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  return (
    <Container>
      <Header>Souviens-toi de nous</Header>
      <SubTitle>
        <p>
          Une question par jour ! Tu as 12 heures pour répondre à chaque question. 
          Si tu veux un indice, tu peux me demander à tout moment.
        </p>
        <p>
          Si tu réussis toutes les énigmes, tu gagneras une soirée ou un week-end 
          totalement organisé par moi ! <span>Tout dépendra de ta gentillesse 🎉</span>
        </p>
      </SubTitle>
      <Section>
        <Title>Question {index + 1}</Title>
        <Question isBlurred={!canAnswer}>{enigmes[index].question}</Question>
        {canAnswer ? (
          <>
            <Input
              type="text"
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
              placeholder="Ta réponse..."
            />
            <Button onClick={verifierReponse}>Valider</Button>
          </>
        ) : (
          <>
            <p>Tu dois attendre {hours}h {minutes}m {seconds}s avant de répondre à la prochaine question.</p>
          </>
        )}
        <ResetButton onClick={resetGame}>Réinitialiser, TOUCHE PAS FDP</ResetButton>
        {message && <CongratulationMessage>{message}</CongratulationMessage>}
      </Section>
    </Container>
  );
}

export default function SecretPage() {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Ajout d'un état pour l'erreur
  const [unlocked, setUnlocked] = useState(false);
  const secretWord = "Global Village";

  // Vérifie si la page a déjà été débloquée
  useEffect(() => {
    const isUnlocked = localStorage.getItem("pageUnlocked");
    if (isUnlocked) {
      setUnlocked(true);
    }
  }, []);


  const handleUnlock = () => {
    if (input.toLowerCase().trim() === secretWord.toLowerCase()) {
      console.log("Mot correct !");
      setUnlocked(true);
      localStorage.setItem("pageUnlocked", "true");  // Marquer la page comme débloquée
      setErrorMessage(""); // Réinitialiser le message d'erreur si le mot est correct
    } else {
      console.log("Mauvais mot...");
      setErrorMessage("Beurk ma'am, You stink like butt cheeks... try again! 🤢");
    }
  };


  if (unlocked) {
    return <EnigmeGame />; // Retourne le jeu d'énigmes si le mot est correct
  }

  return (
    <ContainerError>
      <GlitchText>Error GV-2025 - Lost in the desert</GlitchText>
      <p style={{ color: 'white' }}>
  Where do all the cultures meet in the desert? The answer is closer than you think—maybe the title holds the key.
</p>
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Secret word"
      />
      <Button onClick={handleUnlock}>❓🔑</Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} {/* Affichage du message d'erreur */}
    </ContainerError>
  );
}
