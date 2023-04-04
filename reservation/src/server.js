const app = require('express')();
var mysql = require('mysql');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:3000']
    }
});

var nbPlaces = 0;//nombre de places dans la salle
var nbRangees = 0;//nombre de rangees de sieges dans la salle
var nbColonnes = 0;//nombre de colonnes par rangees
var sieges;//tableau 2D sieges[noRangee][noColonne] = true si reservé false si libre;
var idSalle;

//----------------------------------- REQUETES SQL---------------------------------------

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "projet_nietflix"
});

con.connect(function(err) {
    if (err) throw err;
});

//----------------------------------------------- WEBSOCKET -----------------------------------------

io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');
    socket.on('disconnect', () => {
        console.log('Un utilisateur est déconnecté');
    });

    socket.on('cinemas', () => {//tous les cinemas de la db
        let cinemas = [];
        con.query("SELECT * FROM cinema", function (err, result, fields) {
            if (err) throw err;
            for(let i=0;i<result.length;i++){
                const cine={};
                cine['id']=result[i].id_cinema;
                cine['name']=result[i].name_cinema;
                cine['city']=result[i].city_cinema;
                cinemas.push(cine);
            }
            console.log(cinemas);
            socket.emit('cinemas',cinemas);
        });
    });

    socket.on('sallecine',(cine) => {//les salles du cinema
        let sallesDuCine = [];
        con.query("SELECT * FROM salle WHERE id_cinema="+cine, function (err, result, fields) {
            if (err) throw err;
            for(let i=0;i<result.length;i++){
                sallesDuCine.push(result[i].id_salle);
            }
            socket.emit('sallecine',sallesDuCine);
        });

    });

    socket.on('idsalle',(id) => {//les salles du cinema
        console.log('id de la salle : '+id);
        idSalle=id;
        con.query("SELECT * FROM salle WHERE id_salle="+idSalle, function (err, result, fields) {
            if (err) throw err;
            nbPlaces = result[0].nb_places;
            nbRangees = result[0].nb_rangees
            nbColonnes = nbPlaces/nbRangees;
            //initialisation du tableau sieges
            console.log(result);
        });

    })

    //envoit le nombre de rangees au client
    socket.on('nbrang', () => {
        socket.emit('nbrang', nbRangees);
    });

    //envoit le nombre de colonnes au client
    socket.on('nbcol', () => {
        socket.emit('nbcol', nbColonnes);
    });

    //envoit toutes les places reservées au client qui vient de se connecter
    socket.on('reservations', () => {
        sieges = new Array(nbRangees);
        for(let i=0;i<nbRangees;i++){
            sieges[i] = new Array(nbColonnes);
        }
            //recupère toutes les places de la salle
            con.query("SELECT * FROM place WHERE id_salle="+idSalle+" ORDER BY no_rangee, no_col", function (err, result, fields) {
                if (err) throw err;
                let r=0;
                let c=0;
                for(let i=0;i<result.length;i++){
                    r = result[i].no_rangee;
                    c = result[i].no_col;
                    sieges[r][c] = result[i].est_reservee;
                }
                console.log(sieges[0][1]);
                var strPlaces = "";//contient toutes les places deja reservées avec separateur = ';' ex : 0-1;1-5;3-7;
                for(let i=0;i<sieges.length;i++){
                    for(let y=0;y<nbColonnes;y++){
                        if(sieges[i][y]==1){
                            strPlaces+=(i+"-"+y+";");
                        }
                    }
                }
                socket.emit('reservations',strPlaces);//envoi au client qui vient de se co uniquement
            });
    });

    socket.on('siege', (msg) => {
        console.log('socket: reservation siege ' + msg);
        let rangee = msg.split('-')[0];
        let col = msg.split('-')[1];
        con.query("UPDATE place SET est_reservee=1 WHERE id_salle="+idSalle+" AND no_rangee="+rangee+" AND no_col="+col, function (err, result, fields) {//reserve la place en BDD
            if (err) throw err;
            console.log("place "+rangee+"-"+col+" updated");
        });
        io.emit('reponse',msg);//envoit la place reservée à tous les clients pour voir la reservation en temps réel
    });

});

http.listen(3000, () => {
    console.log('Serveur en écoute sur le port 3000');

});