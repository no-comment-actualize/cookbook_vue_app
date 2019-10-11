<template>
  <div class="recipes-index">

    <div id="fh5co-work-section">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 text-center fh5co-heading">
            <h2>All Recipes</h2>
            <p>This is cheddar's cookbook</p>
          </div>
        </div>
        <div class="row">
          <div v-for="recipe in recipes" class="col-md-4">
            <router-link v-bind:to="`/recipes/${recipe.id}`" class="item-grid text-center">
              <div class="image" v-bind:style="`background-image: url(${recipe.image_url})`"></div>
              <div class="v-align">
                <div class="v-align-middle">
                  <h3 class="title">{{ recipe.title }}</h3>
                  <h5 class="category"><button class="btn btn-primary">More Info</button></h5>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

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