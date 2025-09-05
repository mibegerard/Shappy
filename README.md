
# Shappy

![GitHub repo](https://img.shields.io/github/repo-size/mibegerard/shappy_api)
![GitHub last commit](https://img.shields.io/github/last-commit/mibegerard/shappy_api)
![GitHub issues](https://img.shields.io/github/issues/mibegerard/shappy_api)


## 🚀 Présentation

Shappy est une application web moderne développée avec React et Vite. Elle vise à connecter des producteurs locaux, restaurateurs et consommateurs autour d’un marché digital collaboratif.

### Fonctionnalités principales

- **Inscription et gestion de compte** : chaque utilisateur peut créer un compte, personnaliser son profil, ajouter une photo et une description.
- **Marketplace** : les producteurs publient leurs offres, les restaurateurs et particuliers peuvent consulter, filtrer et commander des produits locaux.
- **Gestion des commandes** : suivi des commandes, historique, notifications.
- **Paiement sécurisé** : intégration Stripe pour les transactions.
- **Tableau de bord** : statistiques, gestion des produits, visualisation des ventes et achats.
- **Interface responsive** : adaptée à tous les écrans, expérience fluide sur mobile et desktop.

### Comment ça fonctionne ?

1. **Installation** : clone le repo, installe les dépendances, lance le serveur local.
2. **Authentification** : chaque utilisateur s’inscrit et se connecte pour accéder à ses fonctionnalités.
3. **Navigation** : l’interface propose des menus pour accéder au marché, à son profil, à la gestion des produits et commandes.
4. **Ajout et gestion de produits** : les producteurs peuvent ajouter, modifier ou supprimer leurs offres.
5. **Commande et paiement** : les restaurateurs/particuliers passent commande et paient en ligne.
6. **Suivi** : chaque utilisateur peut suivre ses commandes, ses ventes ou ses achats.

L’application est conçue pour être extensible, sécurisée et facile à prendre en main.

---

## 📦 Structure du projet

```
shappy/
├── public/           # Fichiers statiques (favicon, manifest, index.html...)
├── src/              # Code source principal (composants, hooks, context, store...)
├── build/            # Fichiers générés lors du build
├── dist/             # Dossier de distribution Vite
├── node_modules/     # Dépendances
├── package.json      # Dépendances et scripts
├── vite.config.mjs   # Configuration Vite
├── jsconfig.json     # Configuration JS
├── README.md         # Ce fichier
└── ...
```

## 🛠️ Installation

```bash
git clone https://github.com/mibegerard/shappy_api.git
cd shappy
npm install # ou yarn install
```

## 🏃‍♂️ Démarrer le projet

```bash
npm start # ou yarn start
```

Accédez à [https://localhost:3000](https://localhost:3000) pour voir l'application.

## ⚙️ Scripts utiles

- `npm start` : Lancer le serveur de développement
- `npm run build` : Générer la version production
- `npm test` : Lancer les tests

## 🧩 Principales dépendances

- React, Vite, Redux Toolkit, MUI, Emotion, Framer Motion, Stripe, Axios, Formik, React Router, Toastify...


## 🔒 HTTPS local

Le projet utilise des certificats locaux (`localhost-key.pem`, `localhost.pem`) pour le développement sécurisé.

## 📁 Organisation du code

- **src/** :
	- `api/` : Requêtes API
	- `assets/` : Images, polices, SCSS
	- `context/` : Context React
	- `hooks/` : Hooks personnalisés
	- `layout/` : Layouts principaux
	- `routes/` : Définition des routes
	- `store/` : Redux slices et actions
	- `themes/` : Thèmes et styles
	- `ui-component/` : Composants UI réutilisables
	- `utils/` : Fonctions utilitaires
	- `views/` : Pages principales
	- `yup/` : Schémas de validation

## 📝 Contribuer

Les contributions sont les bienvenues !

```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
git commit -m "Ajout de ma fonctionnalité"
git push origin feature/ma-nouvelle-fonctionnalite
```

Ouvre une Pull Request sur GitHub.



> Pour toute question ou suggestion, ouvre une issue sur GitHub.
