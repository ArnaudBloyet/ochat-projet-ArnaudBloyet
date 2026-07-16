# Carnet de bord - Jour 4

## Ce que j'ai réalisé

- Mise en place d'une collection `conversations` dans PocketBase.
- Ajout d'une relation entre les messages et les conversations.
- Création d'une sidebar pour afficher les conversations.
- Possibilité de créer une nouvelle conversation.
- Affichage des messages selon la conversation sélectionnée.
- Enregistrement automatique des messages dans la bonne conversation.
- Ajout de la suppression d'une conversation.
- Ajout d'un bouton permettant d'afficher ou masquer la sidebar.
- Amélioration de l'interface utilisateur pour se rapprocher du wireframe.

## Difficultés rencontrées

- J'ai rencontré plusieurs problèmes lors de la mise en place des relations entre les conversations et les messages dans PocketBase.
- J'ai dû corriger plusieurs erreurs liées aux identifiants de conversation et aux filtres des requêtes.
- Le CSS de la sidebar a nécessité plusieurs ajustements afin d'obtenir une interface propre et fonctionnelle.

## Ce que je referais différemment

- Je découperais l'application en composants Svelte plus tôt afin d'éviter d'avoir un fichier `App.svelte` très volumineux.
- Je préparerais davantage la structure des données avant de commencer les développements.

## Prochaines étapes

- Découper l'application en plusieurs composants Svelte.
- Séparer les appels API dans des fichiers dédiés.
- Continuer à améliorer le design et l'expérience utilisateur.