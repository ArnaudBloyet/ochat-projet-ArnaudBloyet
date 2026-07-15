# Carnet de bord - Jour 1

## Ce que j'ai réalisé

- Lecture du cahier des charges.
- Réalisation d'un wireframe desktop et mobile.
- Initialisation du projet Svelte.
- Création de la structure HTML de l'application.
- Début de l'intégration CSS de la zone de chat.
- Mise en place du responsive avec un header spécifique pour la version mobile.

## Difficultés rencontrées

- J'ai eu un problème avec VirtualBox qui empêchait le copier-coller et le glisser-déposer des images.
- J'ai également dû revoir la structure HTML pour utiliser des balises plus sémantiques et préparer le projet pour Svelte.

## Ce que je referais différemment

- Je réfléchirais encore davantage à l'architecture avant de commencer le CSS afin d'anticiper les composants Svelte.

## Prochaines étapes

- Finaliser le responsive.
- Intégrer la barre des conversations.
- Commencer la logique JavaScript et les composants.


# Carnet de bord - Jour 2

## Ce que j'ai réalisé

- J'ai relié mon application à l'API Mistral.
- J'ai mis en place l'envoi des messages et l'affichage des réponses de l'IA.
- J'ai différencié les messages de l'utilisateur et ceux de l'assistant.
- J'ai créé un système de saisie et de sauvegarde du token Mistral avec le LocalStorage.
- J'ai intégré svelte-exmarkdown afin d'afficher correctement les réponses en Markdown.

## Difficultés rencontrées

- J'ai utilisé l'ia pour m'expliquer comment récupérer le token et l'enregistrer.
- J'ai d'abord rencontré une erreur "Unauthorized" car mon token n'était pas enregistré dans le LocalStorage.
- J'ai dû prendre le temps de comprendre la structure des données renvoyées par l'API Mistral.

## Ce que je referais différemment

- Je préparerais davantage la structure des fonctions avant de commencer la communication avec l'API.
- Je consulterais plus rapidement la documentation des bibliothèques lorsque je rencontre un problème.

## Prochaines étapes

- Ajouter la gestion des conversations.
- Continuer à améliorer le responsive.
- Ajouter les fonctionnalités demandées pour la journée 3.