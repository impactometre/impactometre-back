# impactometre

Visit https://impactometre.herokuapp.com

## Pour développer
### Installer Node.js et npm
Avec Linux :
```bash
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```
Avec Windows : [télécharger le .msi](https://nodejs.org/dist/v12.14.0/node-v12.14.0-x86.msi)

### Pour lancer le projet
```bash
# Installer les dépendances
$ npm install
# Lancer le projet
$ npm run devstart
```

### Vérifier la syntaxe
Ce projet respecte les [règles syntaxiques standard](https://standardjs.com/rules.html) de Javascript. Pour vérifier le code :
```bash
$ npm run lint
```

### Lancer les tests unitaires
```bash
$ npm test
```

## Wiki
Voir le [wiki](https://gitlab.utc.fr/tx-techno-num/impactometre/wikis/Accueil) pour détails sur certains aspects du projet, notamment des définitions sur les données manipulées, et des guides sur les technos utilisées.
