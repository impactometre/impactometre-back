# impactometre
## Pour développer
### Installer Node.js et npm
Avec Linux :
```bash
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```
Avec Windows : [télécharger le .msi](https://nodejs.org/dist/v12.14.0/node-v12.14.0-x86.msi)

### Vérifier la syntaxe
Ce projet respecte les [règles syntaxiques standard](https://standardjs.com/rules.html) de Javascript. Pour vérifier le code :
```bash
$ npx eslint .
```

### IDE
VS Code fonctionne bien pour des projets Javascript, en intégrant notamment un plugin pour `eslint`. Pour installer l'IDE avec Linux :
```bash
$ snap install code --classic
$ code
```
Avec Windows : [voir la page dédiée](https://code.visualstudio.com/download).





