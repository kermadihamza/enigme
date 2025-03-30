import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Animation de l'avion
const flyAnimation = keyframes`
  0% { transform: translateX(-100%); opacity: 1; }
  100% { transform: translateX(100vw); opacity: 1; }
`;

const PlaneContainer = styled.div`
  position: fixed;
  top: 20%;
  left: -100px;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: ${flyAnimation} 6s linear infinite;
  white-space: nowrap;
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
  pointer-events: none;
  z-index: 10;
`;

const AirportBackground = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: url('/airport.png') no-repeat center bottom;
  background-size: cover;
  opacity: 1;
  z-index: 1;
`;

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
  overflow: hidden;
  position: relative;
  z-index: 2;
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
  z-index: 1000;
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
  z-index: 2;
`;

const CountdownText = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  z-index: 2;
`;

const Subtitle = styled.h3`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 20px;
  z-index: 2;
`;

export default function CountdownPage() {
  const storedEndTime = localStorage.getItem("endTime");
  const [endTime, setEndTime] = useState<number>(
    storedEndTime ? parseInt(storedEndTime) : Date.now() + 24 * 60 * 60 * 1000
  );
  const [timeLeft, setTimeLeft] = useState<number>(endTime - Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = endTime - currentTime;
      if (remainingTime <= 0) clearInterval(intervalId);
      setTimeLeft(remainingTime);
    }, 1000);

    if (!storedEndTime) localStorage.setItem("endTime", endTime.toString());
    return () => clearInterval(intervalId);
  }, [endTime]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Container>
      <Header>Souviens-toi de nous</Header>
      <Subtitle>Hellooow mon ex pref.. <br /> Le jeu commence dans :</Subtitle>
      <CountdownTimer>
        <CountdownText>{formatTime(timeLeft)}</CountdownText>
      </CountdownTimer>
      <PlaneContainer>
        ✈️ Bonne escale à Istanbul petite chinoise ✈️
      </PlaneContainer>
      <AirportBackground />
    </Container>
  );
}
