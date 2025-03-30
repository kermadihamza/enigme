import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

// Animation de l'avion
const flyAnimation = keyframes`
  0% { transform: translateX(-100%); opacity: 1; }
  100% { transform: translateX(100vw); opacity: 1; }
`;

const PlaneContainer = styled.div`
  position: fixed;
  top: 10%;
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
  background: url('/airport-silhouette.png') no-repeat center bottom;
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

const MemoryGameContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
`;

const Card = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff4b5c;
  color: white;
  font-size: 2rem;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
`;

const images: string[] = [
  "/IMG_4118.jpg",
  "/IMG_4119.jpg",
  "/IMG_4120.jpg",
  "/IMG_4121.jpg",
  "/IMG_4122.jpg",
  "/IMG_4123.jpg",
  "/IMG_4124.jpg",
  "/IMG_4125.jpg"
];
const shuffledCards: string[] = [...images, ...images].sort(() => Math.random() - 0.5);

export default function CountdownPage() {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  const handleCardClick = (index: number) => {
    if (selectedCards.length === 2 || selectedCards.includes(index)) return;
    
    const newSelection = [...selectedCards, index];
    setSelectedCards(newSelection);
    
    if (newSelection.length === 2) {
      setTimeout(() => {
        if (shuffledCards[newSelection[0]] === shuffledCards[newSelection[1]]) {
          setMatchedCards([...matchedCards, ...newSelection]);
        }
        setSelectedCards([]);
      }, 1000);
    }
  };

  return (
    <Container>
      <Header>Souviens-toi de nous</Header>
      {/* <PlaneContainer>
        ✈️ Bonne escale à Istanbul ✈️
      </PlaneContainer> */}
      <AirportBackground />
      <h2>Histoire d'oublier un peu les turbulances hehe</h2>
      <MemoryGameContainer>
        {shuffledCards.map((image, index) => (
          <Card key={index} onClick={() => handleCardClick(index)}>
            {(selectedCards.includes(index) || matchedCards.includes(index)) ? (
              <img src={image} alt="Memory card" style={{ width: "100%", height: "100%", borderRadius: "10px" }} />
            ) : (
              "❓"
            )}
          </Card>
        ))}
      </MemoryGameContainer>
    </Container>
  );
}
