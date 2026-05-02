import "./DetailLigne.css";

function DetailLigne({ ligne }) {
  if (!ligne) {
    return (
      <section className="detail-ligne detail-vide">
        <p>Selectionnez une ligne pour afficher ses arrets.</p>
      </section>
    );
  }

  return (
    <section className="detail-ligne">
      <h3>Ligne {ligne.numero}: details du trajet</h3>
      <p>
        <strong>Trajet:</strong> {ligne.depart} {'>'} {ligne.arrivee}
      </p>
      <p>
        <strong>Nombre d'arrets:</strong> {ligne.arrets}
      </p>

      <h4>Liste des arrets</h4>
      <ul>
        {ligne.listeArrets.map((arret, index) => (
          <li key={`${ligne.id}-${index}`}>{arret}</li>
        ))}
      </ul>
    </section>
  );
}

export default DetailLigne;
