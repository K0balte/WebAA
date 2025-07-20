# 🧠 Puissance 6 – API REST (NestJS)

Une API backend construite avec **NestJS** pour gérer le jeu **Puissance 6** (variante du célèbre Puissance 4).  
Deux joueurs s'affrontent en plaçant **3 pions par tour**, et le premier à aligner **6 pions** remporte la partie.

---

## 🎮 Règles du jeu

- Plateau carré (10x10 par défaut)
- Deux joueurs : `X` et `O`
- Chaque joueur joue **3 coups par tour**
- Le premier joueur à aligner **6 pions** horizontalement, verticalement ou en diagonale gagne

---

## 🧱 Structure technique

- **Framework :** [NestJS](https://nestjs.com/)
- **Langage :** TypeScript
- **Stockage :** en mémoire (`Map<string, Game>`)
- **Type d'API :** RESTful

---

## 🚀 Endpoints API

| Méthode | Endpoint             | Description                            |
|--------:|----------------------|----------------------------------------|
| `POST`  | `/games`             | Crée une nouvelle partie               |
| `GET`   | `/games/:id`         | Récupère l'état d'une partie           |
| `POST`  | `/games/:id/play`    | Envoie un tour de 3 coups              |

### Exemple de `POST /games/:id/play`

```json
{
  "player": "X",
  "positions": [
    { "row": 2, "col": 3 },
    { "row": 2, "col": 4 },
    { "row": 2, "col": 5 }
  ]
}
```

---

## 📂 Arborescence

```
src/
├── app.module.ts
└── game/
    ├── controllers/
    │   └── game.controller.ts
    ├── services/
    │   └── game.service.ts
    ├── dto/
    │   └── play-move.dto.ts
    ├── entities/
    │   └── game.entity.ts
    └── game.module.ts
```

---

## 🛠️ Installation & exécution

### Prérequis

- Node.js >= 18
- npm ou yarn

### Étapes

```bash
# Installation des dépendances
npm install

# Lancer le serveur
npm run start
```

Par défaut, le serveur écoute sur `http://localhost:3000`.

---

## 🧪 Test rapide avec curl

```bash
# Créer une partie
curl -X POST http://localhost:3000/games

# Jouer un tour
curl -X POST http://localhost:3000/games/<id>/play \
  -H "Content-Type: application/json" \
  -d '{"player":"X","positions":[{"row":0,"col":0},{"row":0,"col":1},{"row":0,"col":2}]}'
```

---

## 🧠 Fonctionnalités à venir

- Ajout d’une IA (joueur bot)
- Support WebSocket temps réel
- Interface graphique (Angular/React)
- Historique des coups

---

## 📘 Licence

Projet éducatif. Utilisation libre avec attribution.
