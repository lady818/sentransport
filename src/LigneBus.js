import "./LigneBus.css";

function LigneBus({ numero, depart, arrivee, arrets, couleur, estSelectionnee, onClick }) {
  return (
    <button
      type="button"
      className={`ligne-bus ${estSelectionnee ? "ligne-bus-active" : ""}`}
      onClick={onClick}
    >
      <div className="ligne-numero" style={{ backgroundColor: couleur }}>
        {numero}
      </div>

      <div className="ligne-info">
        <span className="ligne-trajet">
          {depart} → {arrivee}
        </span>

        <span className="ligne-arrets">{arrets} arrets</span>
      </div>
    </button>
  );
}

export default LigneBus;
