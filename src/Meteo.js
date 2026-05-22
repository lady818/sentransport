import { useState, useEffect } from "react";
import "./Meteo.css";

function extrairePrevisions(liste) {
  const parJour = {};

  liste.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];

    if (!parJour[date]) {
      parJour[date] = {
        temperatures: [],
        description: item.weather[0].description,
        icone: item.weather[0].icon,
      };
    }

    parJour[date].temperatures.push(item.main.temp);

    const heure = parseInt(item.dt_txt.split(" ")[1].slice(0, 2), 10);
    if (heure === 12) {
      parJour[date].description = item.weather[0].description;
      parJour[date].icone = item.weather[0].icon;
    }
  });

  const aujourdhui = new Date().toISOString().slice(0, 10);
  const dates = Object.keys(parJour).sort();
  const datesFutures = dates.filter((d) => d > aujourdhui);
  const datesAffichees = (
    datesFutures.length >= 3 ? datesFutures : dates
  ).slice(0, 3);

  return datesAffichees.map((date) => {
    const jour = parJour[date];
    const label = new Date(date + "T12:00:00").toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

    return {
      date,
      label,
      tempMin: Math.round(Math.min(...jour.temperatures)),
      tempMax: Math.round(Math.max(...jour.temperatures)),
      description: jour.description,
      icone: jour.icone,
    };
  });
}

function Meteo() {
  const [meteo, setMeteo] = useState(null);
  const [previsions, setPrevisions] = useState([]);
  const [erreur, setErreur] = useState(null);
  const [erreurPrevisions, setErreurPrevisions] = useState(null);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_OWM_KEY;

    if (!API_KEY) {
      setErreur("Clé API manquante (.env)");
      return;
    }

    const urlActuelle =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=Dakar&appid=${API_KEY}` +
      `&units=metric&lang=fr`;

    const urlForecast =
      `https://api.openweathermap.org/data/2.5/forecast` +
      `?q=Dakar&appid=${API_KEY}` +
      `&units=metric&lang=fr`;

    fetch(urlActuelle)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Erreur : " + r.status);
        }

        return r.json();
      })
      .then((data) => {
        setMeteo({
          temperature: Math.round(data.main.temp),
          description: data.weather[0].description,
          condition: data.weather[0].main,
          humidite: data.main.humidity,
          icone: data.weather[0].icon,
        });
      })
      .catch((err) => setErreur(err.message));

    fetch(urlForecast)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Erreur previsions : " + r.status);
        }

        return r.json();
      })
      .then((data) => {
        setPrevisions(extrairePrevisions(data.list));
        setErreurPrevisions(null);
      })
      .catch((err) => setErreurPrevisions(err.message));
  }, []);

  function getAlerte(condition) {
    if (condition === "Rain" || condition === "Drizzle") {
      return {
        message: "Pluie détectée - risque de retards",
        classe: "alerte-pluie",
      };
    }

    if (condition === "Thunderstorm") {
      return {
        message: "Orage en cours - soyez prudents",
        classe: "alerte-orage",
      };
    }

    return null;
  }

  if (erreur) {
    return (
      <div className="meteo meteo-erreur">
        <p>Météo indisponible</p>
        <p className="meteo-detail">{erreur}</p>
      </div>
    );
  }

  if (!meteo) {
    return <div className="meteo">Chargement météo...</div>;
  }

  const alerte = getAlerte(meteo.condition);

  return (
    <div className="meteo">
      <div className="meteo-info">
        <img
          src={`https://openweathermap.org/img/wn/${meteo.icone}@2x.png`}
          alt={meteo.description}
          className="meteo-icone"
        />

        <div>
          <span className="meteo-temp">{meteo.temperature}&deg;C</span>
          <span className="meteo-desc">{meteo.description}</span>
        </div>

        <span className="meteo-humidite">Humidité : {meteo.humidite}%</span>
      </div>

      {alerte && (
        <div className={`meteo-alerte ${alerte.classe}`}>{alerte.message}</div>
      )}

      <div className="meteo-previsions">
        <h3 className="meteo-previsions-titre">Prévisions (3 prochains jours)</h3>

        {erreurPrevisions && (
          <p className="meteo-previsions-erreur">{erreurPrevisions}</p>
        )}

        {!erreurPrevisions && previsions.length === 0 && (
          <p className="meteo-previsions-chargement">Chargement des prévisions...</p>
        )}

        {!erreurPrevisions && previsions.length > 0 && (
          <div className="meteo-previsions-grille">
            {previsions.map((jour) => (
              <div key={jour.date} className="prevision-jour">
                <span className="prevision-label">{jour.label}</span>
                <img
                  src={`https://openweathermap.org/img/wn/${jour.icone}.png`}
                  alt={jour.description}
                  className="prevision-icone"
                />
                <span className="prevision-temps">
                  {jour.tempMin}&deg; / {jour.tempMax}&deg;
                </span>
                <span className="prevision-desc">{jour.description}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Meteo;
