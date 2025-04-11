import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Liste des énigmes
const enigmes = [
  { question: "L", reponse: "Anderlecht" },
  { question: "L", reponse: "Anderlecht" },
  { question: "Le jour ou on m'a enlevé le platre, j'avais le short de quelle équipe de foot ?", reponse: "Anderlecht" }
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

const Header = styled.header`
  width: 100%;
  padding: 20px;
  background-color: #ff4b5c;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  box-sizing: border-box;
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
  animation: fadeIn 2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const CinematicBox = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
  overflow: hidden;
`;

const CinematicText = styled.div`
  font-size: 1.5rem;
  color: #fff;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  max-width: 90vw; /* Restreindre la largeur du texte */
  padding: 10px;
  box-sizing: border-box;
  animation: scrollUp 20s linear infinite;

  @keyframes scrollUp {
    0% {
      transform: translate3d(0, 100%, 0); /* Utiliser translate3d pour plus de fluidité */
    }
    100% {
      transform: translate3d(0, -100%, 0); /* Éviter le flou en Y */
    }
  }

  p {
    margin: 10px 0;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 10px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 10px;
  }

  /* Ajustements pour les grands écrans comme l'iPhone 14 et 15 Pro Max (screen width 430px et plus) */
  @media (max-width: 420px) {
    font-size: 0.9rem; /* Réduire un peu la taille du texte */
    padding: 5px 10px;
    max-width: 80vw; /* Élargir légèrement la largeur du texte */
  }

  @media (min-width: 421px) and (max-width: 600px) {
    font-size: 1.1rem; /* Taille légèrement plus grande pour des écrans moyens */
    padding: 10px;
    max-width: 90vw; /* Largeur encore plus grande pour des écrans plus grands */
  }
`;

export default function EnigmeGame() {
  const storedIndex = localStorage.getItem("enigmeIndex");
  const [index, setIndex] = useState(() => storedIndex ? parseInt(storedIndex) : 0);
  const [reponse, setReponse] = useState("");
  const [message, setMessage] = useState("");
  const [lastAnsweredTime, setLastAnsweredTime] = useState<string | null>(
    localStorage.getItem("lastAnsweredTime")
  );
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    localStorage.setItem("enigmeIndex", index.toString());
  }, [index]);

  useEffect(() => {
    if (lastAnsweredTime) {
      localStorage.setItem("lastAnsweredTime", lastAnsweredTime);
    }
  }, [lastAnsweredTime]);

  const canAnswer = lastAnsweredTime ? Date.now() - parseInt(lastAnsweredTime) >= 3 * 60 * 60 * 1000 : true;

  const verifierReponse = () => {
    if (reponse.trim().toLowerCase() === enigmes[index].reponse.toLowerCase()) {
      // Bonne réponse
      setMessage("Bonne réponse wesh, envoie fesse a kermadi2 pour fêter ça ! 🎉");
      setLastAnsweredTime(Date.now().toString());
      localStorage.setItem("lastAnsweredTime", Date.now().toString());
  
      setTimeout(() => {
        setReponse("");
  
        if (index < enigmes.length - 1) {
          setMessage(""); // Effacer le message avant de passer à la question suivante
          setIndex(index + 1);
        } else {
          // Game Over: Afficher le texte cinématique de fin
          setGameOver(true);
        }
      }, 5000); // Temps d'attente avant de passer à la question suivante
    } else {
      // Mauvaise réponse
      setMessage("Mauvaise réponse chacal, réessaie tching tchang tchong ! ❌");
      setTimeout(() => setMessage(""), 3000); // Effacer le message après 3 secondes
    }
  };

  const resetGame = () => {
    setIndex(0);
    localStorage.removeItem("enigmeIndex");
    setReponse("");
    setLastAnsweredTime(null);
    localStorage.removeItem("lastAnsweredTime");
    setGameOver(false);
  };

  return (
    <Container>
      <Header>Souviens-toi de nous</Header>
      {!gameOver && (
        <Section>
          <Title>Question {index + 1}</Title>
          <Question isBlurred={false}>{enigmes[index].question}</Question>

          {canAnswer ? (
            <>
              <Input
                type="text"
                value={reponse}
                onChange={(e) => setReponse(e.target.value)}
                placeholder="Ta réponse..."
              />
              <Button onClick={verifierReponse}>Valider</Button>
              <ResetButton onClick={resetGame}>Réinitialiser; TOUCHE PAS MA'AM</ResetButton>
            </>
          ) : (
            <>
              <ResetButton onClick={resetGame}>Réinitialiser; TOUCHE PAS MA'AM</ResetButton>
            </>
          )}

          {/* Affichage du message, qu'il soit bon ou mauvais */}
          {message && <CongratulationMessage>{message}</CongratulationMessage>}
        </Section>
      )}

      {gameOver && (
          <CinematicText>
            <p>Tu as résolu la dernière énigme...</p>
            <br />
            <p><strong>Mais le vrai voyage, <br /> il commence quand tu rentres...</strong></p>
            <p>Merci d’avoir partagé tous <br />ces moments avec moi,</p>
            <p>Chaque question était un souvenir <br />qu'on avait en commun,</p>
            <p>Chaque réponse, même facile, <br />est un pas vers peut-être un futur nous...</p>
            <br />
            <p>J'espère qu'on s'en rappellera, <br />peu importe où la vie nous mène...</p>
            <p><strong>Prépare ton sac et choisis week-end <br />ou nous pourrons partir fêter cette victoire💫</strong></p>          </CinematicText>
      )}
    </Container>
  );
}
