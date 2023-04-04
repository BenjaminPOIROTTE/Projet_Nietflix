<script>
export default {
  name: "Seances",
  data() {
    return {
      seancesValue: [],
      filmValue: {},
      realNom:null,
    }
  },
  computed:{
    seances:{
      get(){
        return this.seancesValue;
      },
      set(value){
        this.seancesValue=value;
      }
    },
    film:{
      get(){
        return this.filmValue;
      },
      set(value){
        this.filmValue=value;
      }
    },

  },
  mounted() {
    this.seancesValue=JSON.parse(localStorage.getItem('seances'));
    this.filmValue=JSON.parse(localStorage.getItem('filmdata'));
    document.getElementById('imgfilm').src=this.filmValue.image;
    document.getElementById('imgfilm').style.width="100%";
    this.displaySeances();
  },
  methods:{
    displaySeances(){
      let infosDiv = document.getElementById('infos');
      this.seances.forEach((seance) => {
        let newRow = document.createElement('div');
        newRow.classList.add('row','align-item-center','my-4');
        let dataSeance = document.createElement('a');
        dataSeance.textContent="le "+seance.date+" à "+seance.start_time;
        let btn = document.createElement('button');
        btn.textContent = "Je réserve";
        btn.addEventListener('click',(e) => {
          localStorage.setItem('idsalle',seance.theater_id);
          location.assign('/salle/'+seance.theater_id);
        })
        newRow.appendChild(dataSeance);
        newRow.appendChild(btn);
        infosDiv.appendChild(newRow);
      })
    }
  }
}
</script>

<template>
<div class="container" id="infos">
  <div class="row">
    <div class="col-4">
      <img src="" style="height: 200px" id="imgfilm"/>
    </div>
    <div class="col">
      <h2>{{ filmValue.titre }}</h2>
      <p>Durée : {{filmValue.duree}} minutes</p>
    </div>
  </div>
</div>

</template>


<style scoped>

</style>