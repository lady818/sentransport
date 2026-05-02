import "./Statistique.css";

function StatReseau({ lignes }) {
  const totalLignes = lignes.length;
  const totalArrets = lignes.reduce((somme, ligne) => somme + ligne.arrets, 0);
  const lignePlusArrets =
    lignes.length > 0
      ? lignes.reduce((max, ligne) => (ligne.arrets > max.arrets ? ligne : max))
      : null;

  return (
    <section
      style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}
    >
      <div className="stat">
        <h2>{totalLignes}</h2>
        <p>Lignes</p>
      </div>
      <div className="stat">
        <h2>{totalArrets}</h2>
        <p>Arrets (total)</p>
      </div>
      <div className="stat">
        <h2>{lignePlusArrets ? lignePlusArrets.numero : "-"}</h2>
        <p>Plus d'arrets</p>
      </div>
    </section>
  );
}

export default StatReseau;
