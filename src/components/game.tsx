import React from "react";

const FelicitationsPakistan = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-green-800 via-green-600 to-green-400 overflow-hidden">

      {/* Header - En-tête avec plus de hauteur et taille de texte */}
      <header className="bg-green-800 text-white p-8 w-full fixed top-0 left-0 shadow-lg z-10">
        <h1 className="text-6xl font-extrabold text-center">Félicitations !</h1>
      </header>
        {/* Le texte qui reste par-dessus l'image */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full text-center text-white">
          <p className="italic text-gray-200 text-xl px-4">
            "محبت ہر چیز جیت لیتی ہے" — L'amour triomphe de tout. 💚
          </p>
        </div>
      {/* Contenu principal avec photo qui prend tout l'écran */}
      <div className="flex flex-col items-center justify-center h-full absolute top-0 left-0 w-full">
        <img
          src="/mariage.jpg" // Remplace par le chemin réel de l'image
          alt="Les Mariés"
          className="object-cover w-full h-full absolute top-0 left-0"
        />
        
      </div>
    </div>
  );
};

export default FelicitationsPakistan;
