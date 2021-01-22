# impactometre-back
Backend du projet `impactometre.fr`, comparateur d'impact environnemental des réunions.

**Application** : https://impactometre.fr

_This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version._

_This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details._

## Description
_This node.js API returns the environmental impact corresponding to different meeting scenarios, according to different spheres of damage: impact on human health, on the quality of ecosystems, on climate change and finally on resources._

Cette API basée sur `node.js` renvoie l'impact environnemental correspondant à différents scénarios de réunions, en fonction de différentes sphères de dommage : impact sur la santé humaine, sur la qualité des écosystèmes, sur le changement climatique et sur les ressources.

## Pour développer

### Installer Node.js et npm
Avec Linux :
```bash
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```
Avec Windows : [télécharger le .msi](https://nodejs.org/dist/v12.14.0/node-v12.14.0-x86.msi)

### Installer Vue CLI
```bash
npm install -g @vue/cli
```
### Pour lancer le projet
```bash
# Installer les dépendances
$ npm install
# Lancer le projet
$ npm run start
```

## Communication entre le front-end et le back-end

Le client effectue une requête POST sur la route `api/meeting` avec les différents paramètres pour chacun des scénarios afin d'obtenir les impacts comparatifs et les équivalents d'impacts en retour.

### Exemple de payload JSON pour la requête POST

Pour deux scénarios.

```json
[
   {
      "meetingDuration":60,
      "numberOfParticipants":9,
      "hardware":[
         {
            "name":"LAPTOP",
            "french":"Ordinateurs portables",
            "qty":4
         },
         {
            "name":"DESKTOP",
            "french":"Ordinateurs fixes",
            "qty":3
         },
         {
            "name":"LOGITECH_KIT",
            "french":"Kits de vidéo-conférence",
            "qty":0
         },
         {
            "name":"COMPUTER_SCREEN_LCD",
            "french":"Ecrans supplémentaires",
            "qty":1
         },
         {
            "name":"PROJECTOR",
            "french":"Vidéo-projecteurs",
            "qty":0
         }
      ],
      "software":{
         "name":"HANGOUTS"
      },
      "journey":[
         {
            "distance":14,
            "mean":"PLANE_INTERCONTINENTAL_ONE_PERSON_KM"
         }
      ],
      "meetingScenario":"Scenario A"
   },
   {
      "meetingDuration":60,
      "numberOfParticipants":11,
      "hardware":[
         {
            "name":"LAPTOP",
            "french":"Ordinateurs portables",
            "qty":4
         },
         {
            "name":"DESKTOP",
            "french":"Ordinateurs fixes",
            "qty":7
         },
         {
            "name":"LOGITECH_KIT",
            "french":"Kits de vidéo-conférence",
            "qty":0
         },
         {
            "name":"COMPUTER_SCREEN_LCD",
            "french":"Ecrans supplémentaires",
            "qty":0
         },
         {
            "name":"PROJECTOR",
            "french":"Vidéo-projecteurs",
            "qty":0
         }
      ],
      "software":{
         "name":"JITSI"
      },
      "journey":[
         {
            "distance":8,
            "mean":"TRAIN_REGIONAL_ONE_PERSON_KM"
         },
         {
            "distance":5,
            "mean":"TRAMWAY_ONE_PERSON_KM"
         }
      ],
      "meetingScenario":"Scenario B"
   }
]
```
### Exemple de retour JSON pour la requête POST

```json
{
   "comparison":{
      "HUMAN_HEALTH":{
         "Scenario A":{
            "damageEndpoint":"HUMAN_HEALTH",
            "meetingScenario":"Scenario A",
            "value":85.04,
            "hardware":34.05,
            "software":0,
            "journey":50.98
         },
         "Scenario B":{
            "damageEndpoint":"HUMAN_HEALTH",
            "meetingScenario":"Scenario B",
            "value":78.55,
            "hardware":58.54,
            "software":0.31,
            "journey":19.7
         }
      },
      "ECOSYSTEM_QUALITY":{
         "Scenario B":{
            "damageEndpoint":"ECOSYSTEM_QUALITY",
            "meetingScenario":"Scenario B",
            "value":79.11,
            "hardware":59.17,
            "software":0.44,
            "journey":19.51
         },
         "Scenario A":{
            "damageEndpoint":"ECOSYSTEM_QUALITY",
            "meetingScenario":"Scenario A",
            "value":62.25,
            "hardware":33.68,
            "software":0,
            "journey":28.57
         }
      },
      "CLIMATE_CHANGE":{
         "Scenario A":{
            "damageEndpoint":"CLIMATE_CHANGE",
            "meetingScenario":"Scenario A",
            "value":100,
            "hardware":19.84,
            "software":0,
            "journey":80.16
         },
         "Scenario B":{
            "damageEndpoint":"CLIMATE_CHANGE",
            "meetingScenario":"Scenario B",
            "value":47.97,
            "hardware":34.35,
            "software":0.21,
            "journey":13.41
         }
      },
      "RESOURCES":{
         "Scenario A":{
            "damageEndpoint":"RESOURCES",
            "meetingScenario":"Scenario A",
            "value":73.52,
            "hardware":19.78,
            "software":0,
            "journey":53.73
         },
         "Scenario B":{
            "damageEndpoint":"RESOURCES",
            "meetingScenario":"Scenario B",
            "value":60.16,
            "hardware":32.81,
            "software":2.35,
            "journey":24.99
         }
      }
   },
   "equivalents":{
      "HUMAN_HEALTH":{
         "ONE_KM_CAR":{
            "Scenario A":0.2,
            "Scenario B":0.2,
         }
      },
      "ECOSYSTEM_QUALITY":{
         "ONE_KM_CAR":{
            "Scenario A":0.3,
            "Scenario B":0.2,
         }
      },
      "CLIMATE_CHANGE":{
         "ONE_KM_CAR":{
            "Scenario A":0.2,
            "Scenario B":0.4,
         }
      },
      "RESOURCES":{
         "ONE_KM_CAR":{
            "Scenario A":0.2,
            "Scenario B":0.2,
         }
      }
   }
}
```
