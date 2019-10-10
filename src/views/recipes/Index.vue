<template>
  <div class="recipes-index">

    <h1>All Recipes</h1>

    <div v-for="recipe in recipes">

      <h2>Title: {{ recipe.title }}</h2>

      <router-link v-bind:to="`/recipes/${recipe.id}`">
        <img v-bind:src="recipe.image_url" v-bind:alt="recipe.title">
      </router-link>

      <div>
        <button v-on:click="showRecipe(recipe)">More Info</button>
      </div>
      <div v-if="recipe === currentRecipe">
        <p>Ingredients: {{ recipe.ingredients }}</p>
        <p>Directions: {{ recipe.directions }}</p>
        <p>Prep Time: {{ recipe.prep_time }}</p>
        <div>

          <button v-on:click="destroyRecipe(recipe)">Destroy</button>
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
      recipes: [],
      currentRecipe: {}
    };
  },
  created: function() {
    axios.get("/api/recipes").then(response => {
      this.recipes = response.data;
      console.log(this.recipes);
    });
  },
  methods: {
    showRecipe: function(recipe) {
      if (this.currentRecipe === recipe) {
        this.currentRecipe = {};
      } else {
        this.currentRecipe = recipe;
      }
    }
  }
};
</script>