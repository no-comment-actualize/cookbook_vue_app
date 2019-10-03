<template>
  <div class="home">

    <h1>New Recipe</h1>
    <button v-on:click="createRecipe()">Create</button>

    <h1>All Recipes</h1>

    <div v-for="recipe in recipes">
      <h2>Title: {{ recipe.title }}</h2>
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Directions: {{ recipe.directions }}</p>
      <img v-bind:src="recipe.image_url" v-bind:alt="recipe.title">
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
    createRecipe: function() {
      var params = {
        title: "Example Title",
        directions: "Example Directions",
        prep_time: "Example Prep Time", 
        ingredients: "Example Ingredients",
        image_url: "Example Image Url"
      };

      axios.post("/api/recipes", params)
      .then(response => {
        console.log("Success", response.data);
        this.recipes.push(response.data);
      })
      .catch(error => {
        console.log(error.response.data.errors);
      });
    }
  }
};
</script>