import "./App.css";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ListeLignes from "./ListeLignes";
import StatReseau from "./StatReseau";
import Recherche from "./Recherche";
import DetailLigne from "./DetailLigne";

function App() {
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  const [nbRecherches, setNbRecherches] = useState(0);

  const lignes = [
    {
      id: 1,
      numero: "1",
      depart: "Parcelles Assainies",
      arrivee: "Plateau",
      arrets: 14,
      couleur: "#e74c3c",
      listeArrets: [
        "Parcelles U14",
        "Parcelles U10",
        "Camberene",
        "Patte d'Oie",
        "Grand Dakar",
        "Colobane",
        "Ponty",
        "Plateau",
      ],
    },
    {
      id: 2,
      numero: "7",
      depart: "Guediawaye",
      arrivee: "Place Obe",
      arrets: 18,
      couleur: "#3498db",
      listeArrets: [
        "Guediawaye",
        "Pikine",
        "Thiaroye",
        "Keur Massar",
        "Grand Yoff",
        "Parcelles",
        "Liberte 6",
        "Place Obe",
      ],
    },
    {
      id: 3,
      numero: "15",
      depart: "Pikine",
      arrivee: "Medina",
      arrets: 12,
      couleur: "#2ecc71",
      listeArrets: ["Pikine Centre", "Thiaroye Gare", "Hann", "Colobane", "Fass", "Medina"],
    },
    {
      id: 4,
      numero: "23",
      depart: "Ouakam",
      arrivee: "Grand Dakar",
      arrets: 10,
      couleur: "#f39c12",
      listeArrets: ["Ouakam Village", "Mermoz", "Fann", "Point E", "Liberte 5", "Grand Dakar"],
    },
    {
      id: 5,
      numero: "8",
      depart: "Almadies",
      arrivee: "Colobane",
      arrets: 16,
      couleur: "#9b59b6",
      listeArrets: ["Almadies", "Ngor", "Yoff", "Ouest Foire", "Liberte 6", "Colobane"],
    },
    {
      id: 6,
      numero: "12",
      depart: "Yoff",
      arrivee: "Sandaga",
      arrets: 11,
      couleur: "#1abc9c",
      listeArrets: ["Yoff Village", "Aeroport LSS", "Parcelles U17", "Grand Yoff", "HLM", "Sandaga"],
    },
  ];

  const lignesFiltrees = lignes.filter((ligne) => {
    const terme = recherche.toLowerCase();
    return (
      ligne.numero.toLowerCase().includes(terme) ||
      ligne.depart.toLowerCase().includes(terme) ||
      ligne.arrivee.toLowerCase().includes(terme)
    );
  });

  return (
    <div className="App">
      <Header />

      <main className="contenu">
        <p>Vous avez effectue {nbRecherches} recherche(s).</p>
        <p>Bienvenue ! Cette application vous aide a trouver votre ligne de bus a Dakar.</p>
        <Recherche
          valeur={recherche}
          onChange={(valeur) => {
            setRecherche(valeur);
            setNbRecherches((n) => n + 1);
          }}
          onClear={() => setRecherche("")}
        />
        <StatReseau lignes={lignesFiltrees} />
        {lignesFiltrees.length === 0 ? (
          <p>Aucune ligne trouvee.</p>
        ) : (
          <ListeLignes
            lignes={lignesFiltrees}
            ligneSelectionneeId={ligneSelectionnee ? ligneSelectionnee.id : null}
            onSelect={setLigneSelectionnee}
          />
        )}
        <DetailLigne ligne={ligneSelectionnee} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
