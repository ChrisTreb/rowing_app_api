# 🚀 API Rowing Tracker

Base URL :

```
http://localhost:3000
```

---

# 📦 1. Users

## 🔹 GET /users

Récupère tous les utilisateurs

### Réponse

```json
[
  {
    "usr_id": "1",
    "apikey": "AZER123",
    "usr_name": "John Doe",
    "rc_id": "4"
  }
]
```

---

## 🔹 GET /users/:id

Récupère un utilisateur par ID

---

## 🔹 POST /users

Créer un utilisateur

### Body

```json
{
  "name": "John Doe",
  "apikey": "secret",
  "rc_id": 1
}
```

---

# 🚣 2. Rowing Clubs

## 🔹 GET /clubs

Liste tous les clubs

---

## 🔹 GET /clubs/:id

Détail d’un club

---

## 🔹 POST /clubs

Créer un club

### Body

```json
{
  "name": "Aviron Club",
  "nickname": "AC"
}
```

---

# 🏁 3. Events

## 🔹 GET /events

Liste des événements

---

## 🔹 POST /events

Créer un événement

### Body

```json
{
  "user_id": "1",
  "name": "Course Brest",
  "visibility": 1,
  "start_at": "2026-04-07T10:00:00Z",
  "end_at": "2026-04-07T12:00:00Z",
  "latitude": 48.39,
  "longitude": -4.48,
  "zoom": 12,
  "map_layer": "osm"
}
```

---

## 🔥 GET /events/:id/full

Récupère un événement complet avec :

* races
* participants
* dernière position GPS

---

# 🛤️ 4. Tracks

## 🔹 GET /tracks/event/:eventId

Liste des parcours d’un événement

---

## 🔹 POST /tracks

### Body

```json
{
  "event_id": "1",
  "name": "Parcours 1",
  "gpx": "<xml>",
  "color": "#FF0000",
  "enabled": true
}
```

---

# 🏎️ 5. Races

## 🔹 GET /races/event/:eventId

Liste des courses d’un événement

---

## 🔹 POST /races

### Body

```json
{
  "event_id": "1",
  "type": "final",
  "name": "Finale A"
}
```

---

# 🚣‍♂️ 6. Participants

## 🔹 GET /participants/race/:raceId

Liste des participants d’une course

---

## 🔹 POST /participants

### Body

```json
{
  "race_id": "1",
  "bib": "12",
  "name": "Boat 1",
  "color": "#00FF00",
  "key": "tracker_key"
}
```

---

# 📍 7. Positions (GPS)

## 🔹 GET /positions/participant/:participantId

Historique des positions

---

## 🔹 POST /positions

Ajoute une position GPS (tracking temps réel)

### Body

```json
{
  "participant_id": "1",
  "latitude": 48.39,
  "longitude": -4.48,
  "timestamp": "2026-04-07T10:00:00Z"
}
```

---

# ⚠️ Codes d’erreur

| Code | Signification    |
| ---- | ---------------- |
| 200  | OK               |
| 201  | Créé             |
| 400  | Mauvaise requête |
| 404  | Non trouvé       |
| 500  | Erreur serveur   |

---

# 🔐 Notes

* Certains champs sont **uniques** (apikey)
* Les IDs sont en **SERIAL**
* Les relations sont en cascade (delete)
