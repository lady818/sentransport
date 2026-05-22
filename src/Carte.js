import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Carte.css";

// Corriger les icones Leaflet (bug webpack)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const iconeArret = new L.Icon.Default();

const iconeArretProche = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Calculer la distance entre 2 points GPS (km)
function calculerDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // rayon de la Terre en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function BoutonCentrerPosition({ positionUtilisateur }) {
  const map = useMap();

  if (!positionUtilisateur) {
    return null;
  }

  return (
    <button
      type="button"
      className="bouton-centrer-position"
      onClick={() => map.setView(positionUtilisateur, 15)}
    >
      Centrer sur ma position
    </button>
  );
}

function Carte() {
  const [arrets, setArrets] = useState([]);
  const [positionUtilisateur, setPositionUtilisateur] = useState(null);
  const [arretProche, setArretProche] = useState(null);
  const [arretsProches, setArretsProches] = useState([]);

  const DAKAR = [14.6928, -17.4467];

  // Charger les arrets depuis Flask
  useEffect(() => {
    fetch("http://localhost:5000/arrets")
      .then((r) => r.json())
      .then((data) => setArrets(data))
      .catch((err) => console.error("Erreur arrets :", err));
  }, []);

  // Geolocalisation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPositionUtilisateur([
            pos.coords.latitude,
            pos.coords.longitude,
          ]);
        },
        () => console.log("Geolocalisation refusee")
      );
    }
  }, []);

  // Trouver les 3 arrets les plus proches
  useEffect(() => {
    if (positionUtilisateur && arrets.length > 0) {
      const proches = arrets
        .map((a) => ({
          ...a,
          distance: calculerDistance(
            positionUtilisateur[0],
            positionUtilisateur[1],
            a.lat,
            a.lon
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      setArretsProches(proches);
      setArretProche(proches[0]);
    }
  }, [positionUtilisateur, arrets]);

  return (
    <div className="carte-container">
      <h2 className="carte-titre">Carte des arrets</h2>

      {arretProche && (
        <p className="arret-proche">
          Arret le plus proche : <strong>{arretProche.nom}</strong>{" "}
          ({arretProche.distance.toFixed(1)} km)
        </p>
      )}

      {arretsProches.length > 0 && (
        <div className="arrets-proches">
          <h3>Les 3 arrets les plus proches</h3>
          <ol>
            {arretsProches.map((arret) => (
              <li key={arret.id}>
                <strong>{arret.nom}</strong> - {arret.distance.toFixed(1)} km
              </li>
            ))}
          </ol>
        </div>
      )}

      <MapContainer center={DAKAR} zoom={13} className="carte">
        <BoutonCentrerPosition positionUtilisateur={positionUtilisateur} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />

        {arrets.map((a) => (
          <Marker
            key={a.id}
            position={[a.lat, a.lon]}
            icon={arretProche && arretProche.id === a.id ? iconeArretProche : iconeArret}
          >
            <Popup>
              <strong>{a.nom}</strong>
              <br />
              Lignes : {a.lignes.join(", ")}
            </Popup>
          </Marker>
        ))}

        {positionUtilisateur && (
          <Marker position={positionUtilisateur}>
            <Popup>Vous etes ici</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default Carte;
