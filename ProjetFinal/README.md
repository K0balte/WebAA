# Projet JavaFX - Application d'accueil

Ce projet JavaFX est une application graphique simple qui affiche un message de bienvenue à l'utilisateur.

## Description
Ce projet a été conçu pour illustrer l'utilisation de JavaFX avec Maven. L'application charge une interface via FXML et utilise un contrôleur pour gérer les interactions.

### Fonctionnalités :
- Interface graphique avec JavaFX
- Chargement via fichier FXML
- Texte d'accueil personnalisé : **"Bienvenue dans l'application JavaFX!"**
- Architecture propre : séparations du contrôleur, de la vue et de la logique

## Structure
```
├── src/
│   └── main/
│       └── java/com/example/p6webarchi/
│           ├── WelcomeApplication.java
│           └── WelcomeController.java
│   └── resources/
│       └── welcome-view.fxml
├── pom.xml
```

## Exécution
Pour lancer l'application :
```bash
mvn clean javafx:run
```

## Auteur
Projet adapté et personnalisé pour un usage pédagogique.
