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
  const storedTimeLeft = localStorage.getItem("timeLeft");
  const storedEndTime = localStorage.getItem("endTime");

  // Si une fin de compte à rebours est enregistrée dans le localStorage, on l'utilise
  const [endTime, setEndTime] = useState<number>(
    storedEndTime ? parseInt(storedEndTime) : Date.now() + 24 * 60 * 60 * 1000 // 24 heures par défaut
  );

  const [timeLeft, setTimeLeft] = useState<number>(endTime - Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = endTime - currentTime;

      if (remainingTime <= 0) {
        clearInterval(intervalId); // Arrête le décompte une fois terminé
      }

      setTimeLeft(remainingTime);
      localStorage.setItem("timeLeft", remainingTime.toString());
    }, 1000);

    // Sauvegarde l'heure de fin du décompte dans localStorage si ce n'est pas encore fait
    if (!storedEndTime) {
      localStorage.setItem("endTime", endTime.toString());
    }

    return () => clearInterval(intervalId);  // Cleanup lors du démontage du composant
  }, [endTime]);

  const formatTime = (ms: number) => {
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
      <Subtitle>Hellooow mon ex pref.. <br /> Le jeu commence dans :</Subtitle>
      <CountdownTimer>
        <CountdownText>{formatTime(timeLeft)}</CountdownText>
      </CountdownTimer>
    </Container>
  );
}
