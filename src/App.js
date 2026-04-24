/* import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Statistique from "./Statistique";
import LigneBus from "./LigneBus ";

function App() {
  return (
    <div className="App">
      <Header />

      <main className="contenu">
        <p>
          Bienvenue ! Cette application vous aide à trouver votre ligne de bus à
          Dakar.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Statistique />
          <Statistique />
          <Statistique />
        </div>

        <LigneBus
          numero="15"
          depart="Parcelles Assainies"
          arrivee="Plateau"
          arrets={14}
        />

        <LigneBus
          numero="7"
          depart="Guédiawaye"
          arrivee="Place Obelisk"
          arrets={18}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;*/

import "./App.css";
import Header from "./Header";
import ListeLignes from "./ListeLignes";
import Footer from "./Footer";
import StatReseau from "./StatReseau";

function App() {
  const lignes = [
    {
      id: 1,
      numero: "1",
      depart: "Parcelles Assainies",
      arrivee: "Plateau",
      arrets: 14,
      couleur: "#0A6E31",
    },
    {
      id: 2,
      numero: "7",
      depart: "Guédiawaye",
      arrivee: "Place Obelisk",
      arrets: 18,
      couleur: "#1E88E5",
    },
    {
      id: 3,
      numero: "15",
      depart: "Pikine",
      arrivee: "Médina",
      arrets: 12,
      couleur: "#FB8C00",
    },
    {
      id: 4,
      numero: "23",
      depart: "Ouakam",
      arrivee: "Grand Dakar",
      arrets: 10,
      couleur: "#8E24AA",
    },
    {
      id: 5,
      numero: "8",
      depart: "Almadies",
      arrivee: "Colobane",
      arrets: 16,
      couleur: "#E53935",
    },
    {
      id: 6,
      numero: "12",
      depart: "Yoff",
      arrivee: "Sandaga",
      arrets: 11,
      couleur: "#00897B",
    },
    {
      id: 7,
      numero: "31",
      depart: "Fann",
      arrivee: "Liberté 6",
      arrets: 13,
      couleur: "#3949AB",
    },
    {
      id: 8,
      numero: "36",
      depart: "Médina",
      arrivee: "Dieuppeul",
      arrets: 9,
      couleur: "#6D4C41",
    },
    {
      id: 9,
      numero: "40",
      depart: "Sicap",
      arrivee: "HLM",
      arrets: 8,
      couleur: "#7CB342",
    },
    {
      id: 10,
      numero: "52",
      depart: "Liberté 5",
      arrivee: "Fann",
      arrets: 15,
      couleur: "#F4511E",
    },
  ];

  return (
    <div className="App">
      <Header />

      <main className="contenu">
        <StatReseau lignes={lignes} />
        <ListeLignes lignes={lignes} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
