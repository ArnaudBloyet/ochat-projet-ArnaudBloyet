# O'Chat

O'Chat est une application de chat intégrant une intelligence artificielle. Elle permet de créer et gérer plusieurs conversations, d'échanger avec une IA et de conserver l'historique des messages.

## Fonctionnalités

* Création et gestion de plusieurs conversations
* Envoi de messages à une intelligence artificielle
* Génération de réponses via l'API Mistral
* Sauvegarde des conversations et des messages avec PocketBase
* Affichage de l'historique des conversations
* Horodatage des messages
* Interface responsive adaptée aux différents écrans
* Organisation de l'interface en composants Svelte

## Technologies utilisées

* **Svelte** — création de l'interface utilisateur et des composants
* **JavaScript** — logique de l'application
* **PocketBase** — stockage des conversations et des messages
* **Mistral AI API** — génération des réponses de l'intelligence artificielle
* **HTML5 / CSS3** — structure et mise en forme
* **Vite** — environnement de développement et de build

## Architecture

Le projet est organisé autour de plusieurs composants et services :

```text
src/
├── components/
│   ├── ChatForm.svelte
│   ├── Header.svelte
│   ├── Message.svelte
│   └── Sidebar.svelte
├── services/
│   ├── mistral.js
│   └── pocketbase.js
├── utils/
│   └── formatDate.js
├── App.svelte
└── main.js
```

Cette organisation permet de séparer l'interface, les services externes et les fonctions utilitaires.

## Installation

Cloner le dépôt puis installer les dépendances :

```bash
git clone git@github.com:ArnaudBloyet/SA07-ochat-projet-ArnaudBloyet.git
cd SA07-ochat-projet-ArnaudBloyet
npm install
```

Lancer ensuite le serveur de développement :

```bash
npm run dev
```

## Configuration

L'application utilise :

* une instance PocketBase pour la persistance des données ;
* l'API Mistral pour les échanges avec l'intelligence artificielle.

Les informations sensibles, notamment les clés d'API, ne doivent pas être enregistrées directement dans le dépôt Git.

## Objectifs techniques

Ce projet met en pratique plusieurs concepts du développement web moderne :

* développement d'une interface avec Svelte ;
* création de composants réutilisables ;
* gestion de l'état de l'application ;
* communication avec des APIs externes ;
* persistance de données ;
* gestion de plusieurs conversations ;
* organisation d'un projet frontend ;
* conception d'une interface responsive.

## Aperçu

O'Chat propose une interface de discussion permettant de centraliser plusieurs conversations avec une intelligence artificielle tout en conservant leur historique.

## Auteur

**Arnaud Bloyet**

Projet réalisé dans le cadre de mon parcours de développement web.
