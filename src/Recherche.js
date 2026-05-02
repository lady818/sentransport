import "./Recherche.css";

function Recherche({ valeur, onChange }) {
  return (
    <div className="recherche-container">
      <label htmlFor="recherche-ligne" className="recherche-label">
        Rechercher une ligne
      </label>
      <input
        id="recherche-ligne"
        className="recherche-input"
        type="text"
        placeholder="Numero, depart ou arrivee..."
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default Recherche;
