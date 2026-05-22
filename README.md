# SenTransport

Application React + API Flask pour le transport en commun à Dakar.

## Installation

```bash
npm install
```

Créer un fichier `.env` à la racine de ce dossier :

```
REACT_APP_OWM_KEY=votre_cle_openweathermap
```

## Lancer l'application

Terminal 1 — API :

```bash
cd api
pip install flask flask-cors
python app.py
```

Terminal 2 — React :

```bash
npm start
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm start` — mode développement
- `npm run build` — build production
- `npm test` — tests
