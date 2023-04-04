# CLIENT Vue.js 
# reservation
## Comment lancer le client :
- Etape 1 : cloner le repository 
- Etape 2 : Installer les packages requis avec la commande "npm install"
- Etape 3 : lancer les serveurs film, reservation et seance (commande "node nom_server.js")
- Etape 4 : run le client avec la commande : "npm run dev"

## Le client utilise les packages suivants :
- socket.io-client
- vue-router
- bootstrap-vue/dist/bootstrap-vue.css
- bootstrap/dist/css/bootstrap.css

## Détails techniques :
- La page d'accueil affiche la liste des cinémas enregistrés dans la BDD cette liste est envoyé par le serveur via WebSocket
- Une fois que le client a choisi un cinéma il est redirigé sur la page qui affiche les films diffusés dans le cinéma. Cette liste est obtenue en faisant un lien de la BDD reservation à la BDD seance avec l'id_salle et ensuite un lien entre la BDD seance et la BDD film avec l'id_movie
- La BDD seance n'ayant pas pu être synchronisée avec les autres (les données des id de film et de salle ne sont pas identiques), un appel a été simulé pour envoyer une réponse avec des données correctes : getfakeSeances(){
      const fake = [{"_id":"640600d92932bebe81b57401","movie_id":1,"theater_id":5,"date":"2023-01-25T00:00:00.000Z","start_time":"20:00"},{"_id":"640604d4369105e099381364","movie_id":2,"theater_id":6,"date":"2023-01-25T00:00:00.000Z","start_time":"20:00"},{"_id":"640604d8369105e099381365","movie_id":3,"theater_id":7,"date":"2023-01-25T00:00:00.000Z","start_time":"20:00"},{"_id":"642b125e996be353bc069b6c","movie_id":7,"theater_id":5,"date":"1970-01-01T00:00:00.000Z","start_time":"21:00"}];
      return fake;
    }
- Une fois son film et sa séance choisie l'utilisateur est sur la page lui permettant de reserver une place, il a juste à cliquer sur un siege, un petit formulaire apparaît en bas de la page oui il doit saisir un numéro de carte bancaire, si le numéro est valide la place est reservée, ce qui est représenté avec un croix rouge, la mise à jour est en temps réél grâce aux websockets.
- l'API bancaire est également simulée, le numéro de carte saisi doit être un de ces trois là : fakeAPIBancaire(){
      const comptes=[{no_carte:'4444 4444 4444 4444'},{no_carte: '7777 7777 7777 7777'},{no_carte: '1111 2222 3333 4444'}];
      return comptes;
    },
