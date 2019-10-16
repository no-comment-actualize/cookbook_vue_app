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

        Search by title: <input type="text" v-model="titleFilter" list="titles">

        <datalist id="titles">
          <option v-for="recipe in recipes">{{ recipe.title }}</option>
        </datalist>
        

        <div class="row">


          <div v-for="recipe in filterBy(recipes, titleFilter, 'title', 'ingredients')" class="col-md-4">
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
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      recipes: [],
      titleFilter: ""
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