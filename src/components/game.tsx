import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Liste des énigmes
const enigmes = [
  { question: "Quel artiste on a vu en premier aux Ardentes ?", reponse: "Niro" },
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

  const canAnswer = lastAnsweredTime ? Date.now() - parseInt(lastAnsweredTime) >= 3 * 60 * 60 * 1000 : true;

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
          (3 * 60 * 60 * 1000 - (Date.now() - parseInt(lastAnsweredTime))) / 1000
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
          Une question par jour ! Tu as 3 heures pour répondre à chaque question. 
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
            <ResetButton onClick={resetGame}>Réinitialiser; TOUCHE PAS MA'AM</ResetButton>
          </>
        ) : (
          <>
            <p>Tu dois attendre {hours}h {minutes}m {seconds}s avant de répondre à la prochaine question.</p>
            <ResetButton onClick={resetGame}>Réinitialiser; TOUCHE PAS MA'AM</ResetButton>

          </>
        )}
        {message && <CongratulationMessage>{message}</CongratulationMessage>}
      </Section>
    </Container>
  );
}