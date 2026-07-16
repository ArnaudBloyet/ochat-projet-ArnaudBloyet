# Carnet de bord - Jour 3

## Ce que j'ai réalisé

- Mise en place de PocketBase pour stocker les messages.
- Création de la collection `messages`.
- Enregistrement des messages de l'utilisateur dans la base de données.
- Enregistrement des réponses de l'IA dans PocketBase.
- Récupération de l'historique des conversations au démarrage de l'application.
- Affichage des messages dans l'ordre chronologique.
- Ajout de l'heure sous chaque message grâce à la date de création fournie par PocketBase.

## Difficultés rencontrées

- J'ai demandé à l'ia de m'expliquer comment rajouter heures et dates à mes messages
- J'ai rencontré un problème avec les dates (`Invalid Date`) car les nouveaux messages n'avaient pas encore de date avant leur enregistrement.
- J'ai également eu un problème avec l'API Mistral qui demandait que le dernier message soit celui de l'utilisateur. J'ai corrigé l'ordre des appels entre PocketBase et Mistral.

## Ce que je referais différemment

- Je réfléchirais davantage à la synchronisation entre l'affichage des messages et les données enregistrées dans PocketBase avant de commencer le développement.

## Prochaines étapes

- Ajouter la gestion des conversations.
- Développer la barre latérale (aside).
- Améliorer encore l'interface utilisateur et l'expérience de navigation.