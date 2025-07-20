# 🎉 JavaFX Welcome App

Une application JavaFX simple qui affiche un message de bienvenue via une interface FXML.

---

## Objectif

Ce projet est une démonstration d’une **architecture JavaFX propre** avec :
- une **vue FXML**
- un **contrôleur séparé**
- une structure prête pour Maven

---

##  Aperçu

> Un bouton dans l'interface déclenche l'affichage du message :
> **"Bienvenue dans l'application JavaFX!"**

---

## Structure du projet

```
P6JavaFXApp/
├── pom.xml
├── README.md
└── src/
    └── main/
        ├── java/
        │   └── com/example/p6webarchi/
        │       ├── WelcomeApplication.java
        │       └── WelcomeController.java
        └── resources/
            └── welcome-view.fxml
```

---

## Lancer l'application

### Prérequis
- Java 17+
- Maven

### Commande

```bash
mvn clean javafx:run
```

---

## Fonctionnalités

- Application JavaFX légère et réactive
- Séparation modèle / vue / contrôleur
- Facilement extensible

---

## Technologies utilisées

- Java 17
- JavaFX 17
- Maven
- FXML

---

## Auteur

> Ce projet a été adapté et personnalisé à des fins pédagogiques.

---

## Licence

Ce projet est distribué sans garantie et à but éducatif.
