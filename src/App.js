import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ListeLignes from "./ListeLignes";
import StatReseau from "./StatReseau";
import Recherche from "./Recherche";
import DetailLigne from "./DetailLigne";
import Carte from "./Carte";
import Meteo from "./Meteo";
import SignalerIncident from "./SignalerIncident";

function App() {
  const [lignes, setLignes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  const [nbRecherches, setNbRecherches] = useState(0);

  const chargerLignes = useCallback(() => {
    setChargement(true);
    setErreur(null);

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

  useEffect(() => {
    chargerLignes();
  }, [chargerLignes]);

  const chargerDetailLigne = useCallback((ligne) => {
    fetch(`http://localhost:5000/lignes/${ligne.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur serveur : " + response.status);
        }

        return response.json();
      })
      .then((data) => {
        setLigneSelectionnee(data);
      })
      .catch((error) => {
        console.error("Erreur detail ligne :", error.message);
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

  let contenuPrincipal;

  if (chargement) {
    contenuPrincipal = (
      <p className="message-chargement">Chargement des lignes...</p>
    );
  } else if (erreur) {
    contenuPrincipal = (
      <div className="message-erreur">
        <p>Impossible de charger les lignes.</p>
        <p className="erreur-detail">{erreur}</p>
        <p>Verifiez que le serveur Flask est lance (python api/app.py).</p>
        <button type="button" className="bouton-recharger" onClick={chargerLignes}>
          Recharger
        </button>
      </div>
    );
  } else {
    contenuPrincipal = (
      <>
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
        <button type="button" className="bouton-recharger" onClick={chargerLignes}>
          Recharger
        </button>

        <StatReseau lignes={lignesFiltrees} />
        {lignesFiltrees.length === 0 ? (
          <p>Aucune ligne trouvee.</p>
        ) : (
          <ListeLignes
            lignes={lignesFiltrees}
            ligneSelectionneeId={ligneSelectionnee ? ligneSelectionnee.id : null}
            onSelect={chargerDetailLigne}
          />
        )}
        <DetailLigne ligne={ligneSelectionnee} />
        <Carte />
        <SignalerIncident />
      </>
    );
  }

  return (
    <div className="App">
      <Header />

      <main className="contenu">
        <Meteo />
        {contenuPrincipal}
      </main>

      <Footer />
    </div>
  );
}

export default App;
