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
      this.nbRangees = parseInt(msg);
      console.log("nb de rangees = "+this.nbRangees);
    });

    socket.on('nbcol', (msg) => {
      this.nbColonnes = parseInt(msg);
      this.afficheSieges();
      this.addEventImages();
    });

    socket.on('reservations', (msg) => {
      var strPlacesSplit = msg.split(';');
      for(let i=0;i<strPlacesSplit.length-1;i++){
        document.getElementById("siege-"+strPlacesSplit[i]).src="/src/assets/images/siege_reserve.png";
      }
    });

    socket.on('reponse', (rep) => {
      document.getElementById("siege-"+rep).src="/src/assets/images/siege_reserve.png";
    });

    //demande les data sur la salle au serveur
    socket.emit('idsalle',localStorage.getItem('idsalle'));
    socket.emit('nbrang');
    socket.emit('nbcol');
    socket.emit('reservations');


  },
  methods: {
    //affiche les sieges de la salle
    afficheSieges(){
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

    //ajoute un event click au images de siege
    addEventImages(){//
      var allimages = document.querySelectorAll('img');//selectionne toutes les images
      allimages.forEach(function(img,index){//ajoute un event onclick a chaque image
        img.addEventListener('click',function (e){
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
        let txtcarte = document.getElementById('nocarte');
        let txt_nocarte = txtcarte.value;
        if(this.checkNoCarteOk(txt_nocarte)){//verifie si le numéro de carte est valide
          txtcarte.style.borderColor="";
          let siegeid = txt.split(':')[1].substring(1);
          var siege = document.getElementById("siege-"+siegeid);
          siege.src="/src/assets/images/siege_reserve.png";
          siege.addEventListener('click',function (e){
            console.log('déjà reservé');
          });
          document.getElementById("conformation").style.visibility="hidden";
          socket.emit('siege',(siegeid.split('-')[0]+"-"+siegeid.split('-')[1]));
        }else{
          txtcarte.style.borderColor="red";
        }
      }
    },

    //retourne une liste de numéros de carte
    fakeAPIBancaire(){
      const comptes=[{no_carte:'4444 4444 4444 4444'},{no_carte: '7777 7777 7777 7777'},{no_carte: '1111 2222 3333 4444'}];
      return comptes;
    },

    //verifie si le numero de carte saisi par l'utilisateur est valide
    checkNoCarteOk(no_carte){
      let comptes = this.fakeAPIBancaire();
      for(let i=0;i<comptes.length;i++){
        if(comptes[i].no_carte==no_carte)
          return true;
      }
      return false;
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
        <p id="lblconf">Réservation de la place :</p>
        <label for="nocarte">Votre numéro de carte :</label> <input type="text" id="nocarte" />
        <button @click="onClickConfirmation" id="confirmer">Confirmer</button>
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
  top: -12px;
}

</style>