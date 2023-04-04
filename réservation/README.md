SERVEUR WEBSOCKET AVEC SOCKET.IO

Pour lancer le serveur :
- Etape 1 : cloner le repository
- Etape 2 : Installer les packages requis avec la commande "npm install"
- Etape 3 : créer la base de données MySQL à partir du script reservation.sql. Pour information la table place est complétée automatiquement grâce à un trigger après une insertion dans la table salle.
- Etape 4 : Lancer le serveur avec la commande "node server.js"

Le serveur utilise les packages suivants :
- mysql
- express
- socket.io

Détails techniques :
- Pour simplifier nous sommes partis du principe que les salles de cinéma ont toutes des rangées qui comportent le même nombre de sièges.
- La communication via les WebSockets avec le client se déroule selon les étapes suivantes:
  - Etape 1 : Le serveur envoit au client la liste des cinémas
  - Etape 2 : client envoit au serveur l'id du cinema qu'il a choisi
  - Etape 3 : le serveur envoit au client la liste des salles du cinéma (cela servira a faire le lien avec la BDD seances pour obtenir les films disponibles dans le cinéma)
  - Etape 4 : Le client envoit au serveur l'id de la salle dans laquelle se déroule la séance qu'il a choisi  
  - Etape 5 : Le serveur envoit au client le nombre de rangees de sieges et le nombre de sieges par rangées dans la salle pour l'affichage
  - Etape 6 : Le serveur envoit au client le places déja reservées
  - Etape 7 : Lorsqu'une place est reservée par un client, le serveur envoit la place reservée à TOUS LES CLIENTS.


