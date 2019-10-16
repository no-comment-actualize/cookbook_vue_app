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
          <div class="col-md-6">
            <input type="text" placeholder="Search by title" class="form-control" v-model="titleFilter" list="titles">
          </div>
          <div class="col-md-6">
            <button v-on:click="setSortAttribute('title')" class="btn btn-primary">Sort by Title 
              <!-- <span v-if="sortAttribute === 'title' && sortAscending === 1">^</span> -->
              <i v-if="sortAttribute === 'title' && sortAscending === 1" class="icon-arrow-up"></i>
              <i v-if="sortAttribute === 'title' && sortAscending === -1" class="icon-arrow-down"></i>
            </button>
            <button v-on:click="setSortAttribute('prep_time')" class="btn btn-primary">Sort by Prep Time
              <i v-if="sortAttribute === 'prep_time' && sortAscending === 1" class="icon-arrow-up"></i>
              <i v-if="sortAttribute === 'prep_time' && sortAscending === -1" class="icon-arrow-down"></i>
            </button>
          </div>
        </div>

        <datalist id="titles">
          <option v-for="recipe in recipes">{{ recipe.title }}</option>
        </datalist>

        <transition-group class="row" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">


          <div v-for="recipe in orderBy(filterBy(recipes, titleFilter, 'title'), sortAttribute, sortAscending)" class="col-md-4" v-on:click="currentRecipe = recipe" v-bind:class="{ selected: recipe === currentRecipe}" v-bind:key="recipe.id">
            <a class="item-grid text-center">
              <div class="image" v-bind:style="`background-image: url(${recipe.image_url})`"></div>
              <div class="v-align">
                <div class="v-align-middle">
                  <h3 class="title">{{ recipe.title }}</h3>
                  <h5 class="category">Prep time: {{ recipe.prep_time }}</h5>
                  <h5 class="category">Last updated {{ relativeDate(recipe.updated_at) }}</h5>
                  <h5 class="category">
                    <router-link v-bind:to="`/recipes/${recipe.id}`">
                      <button class="btn btn-primary">More Info</button>
                    </router-link></h5>
                </div>
              </div>
            </a>
          </div>


        </transition-group>
      </div>
    </div>


  </div>
</template>

<style>
  .selected {
    background-color: grey;
    transition: background-color 1s ease;
  }
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import moment from "moment";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      recipes: [],
      titleFilter: "",
      sortAttribute: "title",
      sortAscending: 1,
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
    setSortAttribute: function(attribute) {
      // if im clicking on a button a second time
      if (this.sortAttribute === attribute) {
        // reverse the sort ascending
        this.sortAscending = this.sortAscending * -1;
      } else {
        this.sortAscending = 1;
        this.sortAttribute = attribute;
      }
    },
    relativeDate: function(date) {
      return moment(date).fromNow();
    }
  }
};
</script>