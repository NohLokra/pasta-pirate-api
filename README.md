# Pasta Pirate Api

Une API REST générée par [generator-rest](https://github.com/diegohaz/generator-rest) pour Pasta-pirate.

## Lancement du projet

### Docker et machine Linux

Avant de démarrer, assurez-vous que votre port 27017 soit disponible. C'est le port utilisé par défaut sur lequel va se binder notre container.

```shell
sudo ./setup.sh
./script/create-users.sh
npm run dev
```

Votre API est maintenant lancée sur localhost:9000/

### Machine Windows sans Docker

Utilisez mongorestore depuis dataset pour que le dump de la base pasta-pirate soit restauré dans votre base de données locale.

Pour créer l'utilisateur de test, lancer la ligne suivante:
```shell
curl -X POST http://0.0.0.0:9000/api/users -i -d "email=admin@pirate.com&password=password&access_token=masterkey&role=admin"
```

## Utilisation de l'API

### Utilisateur de test
Les identifiants pour l'utilisateur de test sont:
  - email: admin@pirate.com
  - mot-de-passe: password

### Vérifier le fonctionnement
Le plus simple pour vérifier que l'API fonctionne corretement est de visiter l'url http://localhost:9000/api/aliments directement depuis le navigateur. Si tout est ok une liste des aliments devrait apparaitre.


## Structure du projet

### Résumé

Les dossiers contenus dans src/api représentent les différents endpoint de notre API.
Les fichiers qu'ils contiennent ont été générés par Yo puis modifiées pour les adapter au besoin de notre projet (notamment la possibilité de rechercher des enregistrements dans la base de données).

```
src/
├─ api/
│  ├─ endpoint-name/
│  │  ├─ controller.js
│  │  ├─ index.js
│  │  ├─ index.test.js
│  │  ├─ model.js
│  │  └─ model.test.js
|  |
│  └─ index.js
├─ services/
│  ├─ express/
│  ├─ facebook/
│  ├─ mongoose/
│  ├─ passport/
│  ├─ sendgrid/
│  └─ your-service/
├─ app.js
├─ config.js
└─ index.js
```

### src/api/

Les endpoints de l'API. Chaque endpoint a son propre dossier

#### src/api/some-endpoint/model.js

Les schémas Mongoose et le modèle pour l'endpoint concerné. Si le modèle subit des changements il faudra les appliquer ici.

#### src/api/some-endpoint/controller.js

Dans le controller on défini tous les middlewares que l'on utilisera plus tard dans index.js.

#### src/api/some-endpoint/index.js

Le point d'entrée de l'API. On y définit les routes à utiliser et les middlewares pour chacune d'entre elles (Por vérifier un token, un formulaire...).

### services/

Dans ce projet, nous n'avons pas créé de service personnalisé mais c'est dans ce dossier qu'il aurait fallu les placer.
