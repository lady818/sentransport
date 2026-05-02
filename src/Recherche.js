import "./Recherche.css";

function Recherche({ valeur, onChange, onClear }) {
  return (
    <div className="recherche-container">
      <label htmlFor="recherche-ligne" className="recherche-label">
        Rechercher une ligne
      </label>

      <div className="recherche-actions">
        <input
          id="recherche-ligne"
          className="recherche-input"
          type="text"
          placeholder="Numero, depart ou arrivee..."
          value={valeur}
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="button" className="recherche-effacer" onClick={onClear}>
          Effacer
        </button>
      </div>
    </div>
  );
}

export default Recherche;
