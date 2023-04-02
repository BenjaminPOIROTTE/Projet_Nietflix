<script>

export default {
  name: "Films",
  data() {
    return {
      films:null,
    }
  },
  mounted() {
      this.recupListeFilm();
  },
  methods:{
    recupListeFilm(){
      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
        query {
            movies {
                id_movie
                id_real
                id_genre1
                id_genre2
                duree
                titre
                image
              genre1 {
                id_genre
                nom_genre
              }
              genre2 {
                id_genre
                nom_genre
              }
              realisateur {
                id_realisateur
                nom_realisateur
              }
              }
        }
        `
        })
      }).then(response => response.json())
          .then(data => this.displayFilms(data.data.movies))
          .catch(error => console.error(error));
    },
    displayFilms(films){
      console.log(films);
      let nbfilms=0
      let nocol=1;
      let nolig=1
      let filmsdiv = document.getElementById("films");
      let currentLigne = document.createElement("div");
      currentLigne.classList.add("row","align-item-center");
      currentLigne.id="ligne"+nolig;
      films.forEach( (film) => {
        if(nbfilms!=films.length){//si c'est pas le dernier film de la liste
          //creation d'une div colonne representant un film
          let newCol = document.createElement("div");
          newCol.classList.add("col-4");
          let imgfilm = document.createElement("img");
          imgfilm.src=film.image;
          imgfilm.style.width="100%";
          imgfilm.style.height="300px";
          let titre = document.createElement("h3");
          titre.textContent=film.titre;
          let real = document.createElement("p");
          real.textContent = "par : "+film.realisateur.nom_realisateur;
          let button = document.createElement("button");
          button.textContent="Voir séances";
          button.addEventListener('click', (e) => {//ajoute un event onClick au boutton
            console.log("voir seances");
            location.assign("/film/"+film.id_movie);
          });
          //ajout du film dans la ligne
          newCol.appendChild(imgfilm);
          newCol.appendChild(titre);
          newCol.appendChild(real);
          newCol.appendChild(button);
          currentLigne.appendChild(newCol);
          nocol++;
          if(nocol>3){//on met 3 films par ligne
            filmsdiv.appendChild(currentLigne);
            nolig++;
            let newLigne = document.createElement("div");
            newLigne.classList.add("row","align-item-center");
            newLigne.id="ligne"+nolig;
            currentLigne = newLigne;
            nocol=1;
          }
        }else{//si c'est le dernier film on insere la ligne
          filmsdiv.appendChild(currentLigne);
        }
        nbfilms++;

      })
    },

  }
}
</script>

<template>

  <div class="container" id="films">
    <div class="row align-items-center">
      <h1>Les films du moment</h1></div>
  </div>
</template>

<style scoped>

</style>