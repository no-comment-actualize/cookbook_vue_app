<template>
  <div class="recipes-index">

    <h1>All Recipes</h1>


    <div class="card-columns">
      <div class="card" v-for="recipe in recipes">
        <router-link v-bind:to="`/recipes/${recipe.id}`">
          <img v-bind:src="recipe.image_url" class="card-img-top" v-bind:alt="recipe.title">
        </router-link>
        <div class="card-body">
          <h5 class="card-title">{{ recipe.title }}</h5>
          <p class="card-text">
            <router-link v-bind:to="`/recipes/${recipe.id}`">
              <button class="btn btn-primary">More Info</button>
            </router-link>
          </p>
        </div>
      </div>
    </div>


  </div>
</template>

<style>
  img {
    width: 250px;
  };
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      recipes: []
    };
  },
  created: function() {
    axios.get("/api/recipes").then(response => {
      this.recipes = response.data;
      console.log(this.recipes);
    });
  },
  methods: {
  }
};
</script>