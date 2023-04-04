<script>
import io from 'socket.io-client';

const socket = io('http://localhost:3000');
export default {
  name: "Cinemas",
  data() {
    return {
      cinemas: [],
    }
  },
  mounted() {
    socket.on('cinemas', (msg) => {
      console.log("cinemas : "+msg);
      this.cinemas=msg
      this.displayCinema();
    });
    socket.emit('cinemas');
  },
  methods:{
    displayCinema(){
      let cinemaDiv = document.getElementById("cinemas");
      this.cinemas.forEach((cine) =>{
        let newRow = document.createElement('div');
        newRow.classList.add('row','align-item-center','my-3');
        let infos = document.createElement('p');
        infos.textContent = cine.name+" à "+cine.city;
        let button = document.createElement('button');
        button.textContent="Consulter";
        button.addEventListener('click',(e) => {
          localStorage.setItem('idCinema',cine.id);
          location.assign('/cinema/'+cine.id);
        })
        newRow.appendChild(infos);
        newRow.appendChild(button);
        cinemaDiv.appendChild(newRow);
      })
    },

  }
}
</script>

<template>
  <div class="container" id="cinemas">

  </div>
</template>

<style scoped>

</style>