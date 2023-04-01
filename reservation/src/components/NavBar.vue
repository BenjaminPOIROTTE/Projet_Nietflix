<script>
export default {
  name: "NavBar",
}
</script>
<template>
  <div>
    <ul>
      <li><a class="active" href="">Accueil</a></li>
      <li><a href="">Tous les films</a></li>
    </ul>
  </div>
</template>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
  color: white;
}

.active {
  background-color: #04AA6D;
  color: white;
}
</style>