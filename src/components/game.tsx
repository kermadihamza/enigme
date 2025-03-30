import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Composants stylisés
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #fe4a49 0%, #f6a5c0 100%);  // Dégradé de couleur
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
  border-radius: 10px;
  margin: 0;
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

const CountdownTimer = styled.div`
  font-size: 3rem;
  color: #ff4b5c;
  font-weight: bold;
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
`;

const CountdownText = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 20px;
`;

export default function CountdownPage() {
  // Essayons de récupérer la valeur du compteur dans le localStorage
  const storedTimeLeft = localStorage.getItem("timeLeft");

  const [timeLeft, setTimeLeft] = useState<number>(
    storedTimeLeft ? parseInt(storedTimeLeft) : 24 * 60 * 60 * 1000 // 24 heures en millisecondes
  );

  useEffect(() => {
    // Si le temps restant est supérieur à 0, commence le décompte
    if (timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(intervalId);
            return 0;
          }
          const newTime = prevTime - 1000;
          // Sauvegarde la nouvelle valeur dans le localStorage à chaque tick
          localStorage.setItem("timeLeft", newTime.toString());
          return newTime;
        });
      }, 1000);

      return () => clearInterval(intervalId);  // Cleanup lors du démontage du composant
    }
  }, [timeLeft]); // Le useEffect se réexécutera chaque fois que `timeLeft` change

  const formatTime = (ms: number) => {  // Déclaration du type du paramètre ms
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Container>
      <Header>Souviens-toi de nous</Header>
      <Subtitle>Hellooow mon ex pref.. <br></br>Le jeu commence dans :</Subtitle>
      <CountdownTimer>
        <CountdownText>{formatTime(timeLeft)}</CountdownText>
      </CountdownTimer>
    </Container>
  );
}
