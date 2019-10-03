<template>
  <div class="home">

    <h1>New Recipe</h1>
    <div>
      Title: <input type="text" v-model="newRecipeTitle"><br>
      Ingredients: <input type="text" v-model="newRecipeIngredients"><br>
      Directions: <input type="text" v-model="newRecipeDirections"><br>
      Imag Url: <input type="text" v-model="newRecipeImageUrl"><br>
      Prep Time: <input type="number" v-model="newRecipePrepTime">
    </div>
    <button v-on:click="createRecipe()">Create</button>

    <h1>All Recipes</h1>

    <div v-for="recipe in recipes">

      <h2>Title: {{ recipe.title }}</h2>
      <img v-bind:src="recipe.image_url" v-bind:alt="recipe.title">
      <div>
        <button v-on:click="showRecipe(recipe)">More Info</button>
      </div>
      <div v-if="recipe === currentRecipe">
        <p>Ingredients: {{ recipe.ingredients }}</p>
        <p>Directions: {{ recipe.directions }}</p>
        <p>Prep Time: {{ recipe.prep_time }}</p>
        <h4>Edit Recipe</h4>
        <div>
          Title: <input type="text" v-model="recipe.title"><br>
          Ingredients: <input type="text" v-model="recipe.ingredients"><br>
          Directions: <input type="text" v-model="recipe.directions"><br>
          Imag Url: <input type="text" v-model="recipe.image_url"><br>
          Prep Time: <input type="number" v-model="recipe.prep_time"><br>
          <button v-on:click="updateRecipe(recipe)">Update</button><br>
          {{recipe}}
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
      newRecipeTitle: "",
      newRecipeIngredients: "",
      newRecipeDirections: "",
      newRecipeImageUrl: "",
      newRecipePrepTime: "",
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
    createRecipe: function() {
      var params = {
        title: this.newRecipeTitle,
        directions: this.newRecipeDirections,
        prep_time: this.newRecipePrepTime, 
        ingredients: this.newRecipeIngredients,
        image_url: this.newRecipeImageUrl
      };

      axios.post("/api/recipes", params)
      .then(response => {
        console.log("Success", response.data);
        this.recipes.push(response.data);
        this.newRecipeTitle = "";
        this.newRecipeIngredients = "";
        this.newRecipeDirections = "";
        this.newRecipeImageUrl = "";
        this.newRecipePrepTime = "";
      })
      .catch(error => {
        console.log(error.response.data.errors);
      });
    },
    showRecipe: function(recipe) {
      if (this.currentRecipe === recipe) {
        this.currentRecipe = {};
      } else {
        this.currentRecipe = recipe;
      }
    },
    updateRecipe: function(recipe) {
      var params = {
        title: recipe.title,
        directions: recipe.directions,
        prep_time: recipe.prep_time, 
        ingredients: recipe.ingredients,
        image_url: recipe.image_url
      };
      axios.patch("/api/recipes/" + recipe.id, params)
        .then(response => {
          console.log("Success", response.data);
        })
        .catch(error => {
          console.log(error.response.data.errors);
        })
    }
  }
};
</script>