import json
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open("lignes_ddd.json", "r") as f:
    lignes = json.load(f)

with open("arrets.json", "r") as f:
    arrets = json.load(f)


@app.route("/")
def accueil():
    return jsonify({
        "message": "Bienvenue sur l'API SenTransport !",
        "endpoints": [
            "/lignes",
            "/lignes/<id>"
        ]
    })


@app.route("/lignes")
def get_lignes():
    return jsonify(lignes)


@app.route("/lignes/<int:ligne_id>")
def get_ligne(ligne_id):
    ligne = next(
        (l for l in lignes if l["id"] == ligne_id),
        None
    )

    if ligne is None:
        return jsonify({
            "erreur": "Ligne non trouvee"
        }), 404

    return jsonify(ligne)


@app.route("/arrets")
def get_arrets():
    return jsonify(arrets)


@app.route("/stats")
def get_stats():
    ligne_max_arrets = max(lignes, key=lambda ligne: ligne["arrets"])

    return jsonify({
        "nombreLignes": len(lignes),
        "nombreTotalArrets": sum(ligne["arrets"] for ligne in lignes),
        "lignePlusArrets": ligne_max_arrets["numero"]
    })


@app.route("/lignes/recherche")
def rechercher_lignes():
    q = request.args.get("q", "").lower()

    resultats = [
        ligne for ligne in lignes
        if q in ligne["depart"].lower() or q in ligne["arrivee"].lower()
    ]

    return jsonify(resultats)


incidents = []


@app.route("/incidents", methods=["GET"])
def get_incidents():
    return jsonify(incidents)


@app.route("/incidents", methods=["POST"])
def post_incident():
    data = request.get_json()

    if (
        not data
        or "ligne" not in data
        or "description" not in data
    ):
        return jsonify({
            "erreur": "Champs requis manquants"
        }), 400

    incident = {
        "id": len(incidents) + 1,
        "ligne": data["ligne"],
        "description": data["description"],
        "lieu": data.get("lieu", "Non precisé"),
    }

    incidents.append(incident)

    return jsonify(incident), 201


if __name__ == "__main__":
    app.run(debug=True, port=5000)
