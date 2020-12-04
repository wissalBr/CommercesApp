# ismin-2020-project

# Binome : BRAHMI Wissal + HAMMAMI EYA


📝 Commerces de Paris 
# database URL: "https://opendata.paris.fr/explore/dataset/commerces-semaest/table/?rows=311" 
 
        
# Part 1 : Web Development API
## 🚀 Getting Started

npm install
npm run start:dev
    " Nest application successfully started "
Sur postman : http://localhost:3000/commerces (si vous garder 3000 comme port de l'appli)


# Bonus 
Avant de commencer la vérification des URLs sur postman merci de faire une premiere requete de téléchargement des données :
                             avec un GET : http://localhost:3000/commerces/data
                             Vous aurez ce message (si tout va bien) :  `Données récupérées avec succes !` 

PS: notre classe de base est `Commerce` avec laquelle on a créé notre CommerceDocument! 


Les URLs pour faire des requetes permettant de :
1. Récupérer un résumé de toutes les données (seulement les infos les plus importantes pour l’affichage dans une liste + favori ou non) :
            GET http://localhost:3000/commerces

            Exemple de donnée avec les infos les plus importantes :
        
            {
                 "_id": "5fc7fa446890064bdc05b1cb",
                "id_Carto": "C271",
                 "Adresse": "37 Rue Bisson",
                 "CP": 75020,
                 "categorie_activite": "METIERS D'ART",
                 "Favori": false,
                 "__v": 0
            } 

2. Récupérer le détail d’une donnée :
            GET http://localhost:3000/commerces/C128
            
            {
                 "id_Carto": "C128",
                 "Operation": "DLH",
                 "activite_precise_du_locataire": "Théâtre",
                 "enseigne": "THÉATRE EXPRESS"
            }

3. Mettre une donnée en favori ou non :
            PUT http://localhost:3000/commerces/C285    avec dans body : {
                                                                            "Favori":true
                                                                        }

# déploiement sur CleverCloud : 
    c'est fait c'est l'application : Commerces-App-WBI 
   Pour un GET résumé des données :  "http://app-2630a0f5-d37a-4727-8585-61f052030ab9.cleverapps.io/commerces"
                            exemple : http://app-2630a0f5-d37a-4727-8585-61f052030ab9.cleverapps.io/commerces/C305

# Part 2 : Android App

On a fait une appli qui recupere  la base de donnees :  "https://opendata.paris.fr/api/records/1.0/search/?dataset=commerces-semaest&rows=0&facet=categorie_activite"
On choisit une categorie et l'appli nous affiche les items correspondant  cette catgorie .

L'application contient deux entites (categorie - item)

Deux activites une MainActivity qui contient nos donnes et une contenant les details de chaque item

Deux fragments : le 1er du descriptif de leapplication et le 2eme contenant la liste des items dans une categorie choisie.

Malheureusement on n'a pas pu connecter notre App à l'API deja deployee sur CleverCloud, donc les donnees affichees sont directement extrait du lien opendata.
