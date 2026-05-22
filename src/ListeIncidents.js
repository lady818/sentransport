import { useEffect, useState } from "react";
import "./ListeIncidents.css";

function ListeIncidents({ actualiser = 0 }) {
  const [incidents, setIncidents] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    setChargement(true);
    setErreur(null);

    fetch("http://localhost:5000/incidents")
      .then((r) => {
        if (!r.ok) {
          throw new Error("Erreur : " + r.status);
        }

        return r.json();
      })
      .then((data) => {
        setIncidents(data);
        setChargement(false);
      })
      .catch((err) => {
        setErreur(err.message);
        setChargement(false);
      });
  }, [actualiser]);

  if (chargement) {
    return (
      <section className="liste-incidents">
        <h3 className="liste-incidents-titre">Incidents signalés</h3>
        <p className="liste-incidents-chargement">Chargement...</p>
      </section>
    );
  }

  if (erreur) {
    return (
      <section className="liste-incidents">
        <h3 className="liste-incidents-titre">Incidents signalés</h3>
        <p className="liste-incidents-erreur">Impossible de charger les incidents.</p>
      </section>
    );
  }

  return (
    <section className="liste-incidents">
      <h3 className="liste-incidents-titre">
        Incidents signalés ({incidents.length})
      </h3>

      {incidents.length === 0 ? (
        <p className="liste-incidents-vide">Aucun incident pour le moment.</p>
      ) : (
        <ul className="liste-incidents-items">
          {incidents.map((incident) => (
            <li key={incident.id} className="incident-carte">
              <span className="incident-id">#{incident.id}</span>
              <span className="incident-ligne">Ligne {incident.ligne}</span>
              <span className="incident-lieu">{incident.lieu}</span>
              <p className="incident-description">{incident.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ListeIncidents;
