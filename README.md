# Biiled 
![ScreenShot_20231022161713](https://github.com/laminemessaci/Lamine_MESSACI_P9_15082022/assets/60298344/2784c655-eb28-46c2-a822-1d3e1a895166)
![ScreenShot_20231022161804](https://github.com/laminemessaci/Lamine_MESSACI_P9_15082022/assets/60298344/2aed267d-6996-4cc6-b547-5902ee375c6f)
![ScreenShot_20231022161828](https://github.com/laminemessaci/Lamine_MESSACI_P9_15082022/assets/60298344/c5f10f05-133d-4720-a2dd-69ecdd85b6dd)
![ScreenShot_20231022161936](https://github.com/laminemessaci/Lamine_MESSACI_P9_15082022/assets/60298344/437699e8-c453-4d7c-a37d-0198abadbdc2)
![ScreenShot_20231022161954](https://github.com/laminemessaci/Lamine_MESSACI_P9_15082022/assets/60298344/fd8c649f-f169-4541-a66b-fb9d8cdb464c)
![Messaci_Lamine_2_rapport_test_Jest_05082022](https://github.com/laminemessaci/Lamine_MESSACI_P9_15082022/assets/60298344/453b6639-e3a5-4a92-821b-a67de20b452e)
![Messaci_Lamine_3_rapport_couverture_05082022](https://github.com/laminemessaci/Lamine_MESSACI_P9_15082022/assets/60298344/3520dab3-733f-4914-b987-54949375ad29)
[Messaci_Lamine_4_plan_test_05082022.pdf](https://github.com/laminemessaci/Lamine_MESSACI_P9_15082022/files/13063449/Messaci_Lamine_4_plan_test_05082022.pdf)
# Frontend :



## L'architecture du projet :
Ce projet, dit frontend, est connecté à un service API backend que vous devez aussi lancer en local.

Le projet backend se trouve ici: https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-back

## Organiser son espace de travail :
Pour une bonne organization, vous pouvez créer un dossier bill-app dans lequel vous allez cloner le projet backend et par la suite, le projet frontend:

Clonez le projet backend dans le dossier bill-app :
```
$ git clone https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-Back.git
```

```
bill-app/
   - Billed-app-FR-Back
```

Clonez le projet frontend dans le dossier bill-app :
```
$ git clone https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-Front.git
```

```
bill-app/
   - Billed-app-FR-Back
   - Billed-app-FR-Front
```

## Comment lancer l'application en local ?

### étape 1 - Lancer le backend :

Suivez les indications dans le README du projet backend.

### étape 2 - Lancer le frontend :

Allez au repo cloné :
```
$ cd Billed-app-FR-Front
```

Installez les packages npm (décrits dans `package.json`) :
```
$ npm install
```

Installez live-server pour lancer un serveur local :
```
$ npm install -g live-server
```

Lancez l'application :
```
$ live-server
```

Puis allez à l'adresse : `http://127.0.0.1:8080/`


## Comment lancer tous les tests en local avec Jest ?

```
$ npm run test
```

## Comment lancer un seul test ?

Installez jest-cli :

```
$npm i -g jest-cli
$jest src/__tests__/your_test_file.js
```

## Comment voir la couverture de test ?

`http://127.0.0.1:8080/coverage/lcov-report/`

## Comptes et utilisateurs :

Vous pouvez vous connecter en utilisant les comptes:

### administrateur : 
```
utilisateur : admin@test.tld 
mot de passe : admin
```
### employé :
```
utilisateur : employee@test.tld
mot de passe : employee
```

# Backend:
# Billapp backend

================ FR ====================

## Comment lancer l'API en local:

### Cloner le projet:
```
git clone https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-Back.git
```

### Acceder au repertoire du projet :
```
cd Billed-app-FR-Back
```

### Installer les dépendances du projet :

```
npm install
```

### Lancer l'API :

```
npm run run:dev
```

### Accéder à l'API :

L'api est accessible sur le port `5678` en local, c'est à dire `http://localhost:5678`

## Utilisateurs par défaut:

### administrateur : 
```
utilisateur : admin@test.tld 
mot de passe : admin
```
### employé :
```
utilisateur : employee@test.tld
mot de passe : employee
```


================ EN ====================


## How to run the API locally :


### Clone the projet:
```
git clone https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-Back.git
```

### Go to the project directory :
```
cd Billed-app-FR-Back
```

### Install project dependancies :

```
npm install
```

### Run the API :

```
npm run:dev
```

### Access to the PAI :

The API is locally available on port `5678`, go to `http://localhost:5678`

### administrateur : 
```
utilisateur : admin@company.tld 
mot de passe : admin
```
### employé :
```
utilisateur : employee@company.tld
mot de passe : employee
```


