import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ListeLignes from "./ListeLignes";
import StatReseau from "./StatReseau";
import Recherche from "./Recherche";
import DetailLigne from "./DetailLigne";

function App() {
  const [lignes, setLignes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  const [nbRecherches, setNbRecherches] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/lignes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur serveur : " + response.status);
        }

        return response.json();
      })
      .then((data) => {
        setLignes(data);
        setChargement(false);
      })
      .catch((error) => {
        setErreur(error.message);
        setChargement(false);
      });
  }, []);

  const lignesFiltrees = lignes.filter((ligne) => {
    const terme = recherche.toLowerCase();
    return (
      ligne.numero.toLowerCase().includes(terme) ||
      ligne.depart.toLowerCase().includes(terme) ||
      ligne.arrivee.toLowerCase().includes(terme)
    );
  });
  // ecran de chargement
  if (chargement) {
    return (
      <div className="App">
        <Header />
        <main className="contenu">
          <p className="message-chargement">Chargement des lignes...</p>
        </main>
      </div>
    );
  }
  // ecran d'erreur
  if (erreur) {
    return (
      <div className="App">
        <Header />
        <main className="contenu">
          <div className="message-erreur">
            <p>Impossible de charger les lignes.</p>
            <p className="erreur-detail">{erreur}</p>
            <p>Verifiez que le serveur Flask est lance (python api/app.py).</p>
          </div>
        </main>
      </div>
    );
  }

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
