<script>
import io from 'socket.io-client';

const socket = io('http://localhost:3000');
export default {
  name: "Salle",
  data() {
    return {
      nbRangees: 0,
      nbColonnes: 0,
      selectedRangee:0,
      selectedCol:0,
    }
  },
  mounted() {
    //--------------------------------WEBSOCKET---------------------------

    //ecoute le serveur
    socket.on('nbrang', (msg) => {
      console.log("nb de rangees = "+msg)
      this.nbRangees = parseInt(msg);
      console.log("nb de rangees = "+this.nbRangees);
    });

    socket.on('nbcol', (msg) => {
      console.log("nb de colonnes = "+msg);
      this.nbColonnes = parseInt(msg);
      console.log("nb de colonnes = "+this.nbColonnes);
      this.afficheSieges();
      this.addEventImages();
    });

    socket.on('reservations', (msg) => {
      console.log("places deja reservees : "+msg);
      var strPlacesSplit = msg.split(';');
      for(let i=0;i<strPlacesSplit.length-1;i++){
        document.getElementById("siege-"+strPlacesSplit[i]).src="/src/assets/images/siege_reserve.png";
      }
    });

    socket.on('reponse', (rep) => {
      console.log("un client a reservé la place : "+rep);
      document.getElementById("siege-"+rep).src="/src/assets/images/siege_reserve.png";
    });

    //demande les data sur la salle au serveur
    socket.emit('nbrang');
    socket.emit('nbcol');
    socket.emit('reservations');


  },
  methods: {
    afficheSieges(){//affiche les sieges de la salle
      console.log("affichage des sieges");
      let divSieges = document.getElementById("sieges");
      for(var l=this.nbRangees-1;l>=0;l--){//affiche tous les sieges
        let num= document.createElement('num');
        num.textContent=l +" | ";
        num.id="label-"+l;
        divSieges.appendChild(num);
        for(var c=0;c<this.nbColonnes;c++){
          let img = document.createElement('img');
          img.id="siege-"+l+"-"+c;
          img.src="/src/assets/images/siege_libre.png";
          img.style.width="50px";
          divSieges.appendChild(img);
        }
        divSieges.innerHTML+="<br>";
      }
    },
    addEventImages(){//ajoute un event aux images de sieges
      console.log("ajout d'envent aux sieges");
      var allimages = document.querySelectorAll('img');//selectionne toutes les images

      allimages.forEach(function(img,index){//ajoute un event onclick a chaque image
        img.addEventListener('click',function (e){
          console.log('clicked');
          let lbl = document.getElementById("lblconf");
          let srctarget = e.target.getAttribute('src');
          if(srctarget.split('/')[srctarget.split('/').length-1]=="siege_libre.png"){
            let l = e.target.id.split('-')[1];
            let c = e.target.id.split('-')[2];
            document.getElementById("conformation").style.visibility="visible";
            let lbltxt = lbl.textContent.split(':')[0];
            lbl.textContent=lbltxt+" : "+l+"-"+c;
          }else{
            lbl.textContent="";
          }

        });
      });
    },
    onClickConfirmation(){

      let txt = document.getElementById("lblconf").textContent;
      if(txt!=""){
        let siegeid = txt.split(':')[1].substring(1);
        var siege = document.getElementById("siege-"+siegeid);
        siege.src="/src/assets/images/siege_reserve.png";
        siege.addEventListener('click',function (e){
          console.log('déjà reservé');
        });
        socket.emit('siege',(siegeid.split('-')[0]+"-"+siegeid.split('-')[1]));
      }
    }
  }
}
</script>

<template>
  <div class="container" id="roads">
    <div class="row">
      <div class="col" id="sieges">

      </div>
    </div>
    <div class="row border-dark">
      <h1>ECRAN ICI</h1>
    </div>
    <div class="row">
      <div class="col" id="conformation" style="visibility: hidden;">
        <label id="lblconf" for="conformation">Etes vous sure de réserver la place :</label><button @click="onClickConfirmation" id="confirmer">Confirmer</button>
      </div>
    </div>

  </div>
</template>

<style>
num{
  color: black;
  text-align: center;
  font-size: 50px;
  position: relative;
  top: 10px;
}

</style>
