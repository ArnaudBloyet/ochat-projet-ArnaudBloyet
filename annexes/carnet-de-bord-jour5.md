# Carnet de bord - Jour 5

## Ce que j'ai réalisé

- Découpage de l'application en plusieurs composants Svelte (`Header`, `Sidebar`, `Message` et `ChatForm`).
- Création d'un service `mistral.js` pour centraliser les appels à l'API Mistral.
- Création d'un service `pocketbase.js` pour regrouper toutes les requêtes vers PocketBase.
- Création d'un utilitaire `formatDate.js` afin de séparer la logique de formatage des dates.
- Nettoyage du fichier `App.svelte`, qui ne contient plus que la gestion des états et l'orchestration de l'application.
- Optimisation des requêtes envoyées à Mistral en limitant l'historique aux 20 derniers messages.

## Difficultés rencontrées

- J'ai rencontré plusieurs erreurs lors du déplacement des fonctions vers les fichiers de services, notamment à cause de variables qui appartenaient à `App.svelte`.
- J'ai dû adapter les fonctions pour qu'elles retournent des données au lieu de modifier directement les états de l'application.
- J'ai également rencontré une limitation de la taille du champ `content` dans PocketBase, qui a nécessité une augmentation de la limite autorisée + un `.slice(-20)` dans la fonction mistral pour également chargé que les 20 derniers message en historique.

## Ce que j'ai appris

- Organiser une application Svelte en composants.
- Séparer la logique métier de l'interface grâce aux services.
- Créer des fonctions utilitaires réutilisables.
- Mieux comprendre la circulation des données entre les composants, les services et l'application principale.

## Bilan

Cette dernière étape m'a permis de rendre le projet plus propre, plus lisible et plus facile à maintenir. L'application est maintenant organisée selon une architecture plus professionnelle, avec une séparation claire entre l'interface, les services et les utilitaires.