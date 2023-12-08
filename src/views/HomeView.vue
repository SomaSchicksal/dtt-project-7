<template>
  <!-- This component renders the homepage, as soon as it's loaded a list of houses will
  gotten from the api will be rendered. The user can filter them by price or size, or look
for a specific house by typing in the searchbar. Here the user can even create a house-->
  <div class="home">
    <div class="first-block">
      <h1>Houses</h1>
      <router-link to="/houseForm"><button class="button">+ CREATE NEW</button></router-link>
    </div>

    <div class="second-block">
      <!-- typing in the searchbar will fire the function that handle the filtering of the houses -->
      <input v-model="search" placeholder="Search for a house" @input="filterHouses" class="searchbar" />
      <span v-if="search !== ''" @click="clearSearchInput" class="clear-button">&#10006;</span>
      <div>
        <!-- These buttons fire the function that handle the filtering by price and size -->
        <button @click="sortByPrice" class="button button1">Price</button>
        <button @click="sortBySize" class="button button2">Size</button>
      </div>
    </div>
    <!-- a div will indicate the results of the search if the user uses the searchbar -->
    <div class="result-indication" v-if="filteringOccurred">
      <p v-if="filteredHouses.length > 0">
        {{ filteredHouses.length }} result{{ filteredHouses.length !== 1 ? 's' : '' }} found.
      </p>
      <div style="display:flex; flex-direction: column; align-items: center; padding: 50px;" v-else>
        <img :src="empty" style="width:300px;">
        <div style="font-family: 'Montserrat';">
          <p>No results found.</p>
          <p>Please try another keyword.</p>
        </div>
      </div>
    </div>

    <!-- simple for loop to render all houses i get from the api call, for each house i get 
  i render a house component that will render its details -->
    <div class="third-block" v-for="house in houses" :key="house.id">

      <House :house="house"></House>



    </div>
  </div>
</template>

<script>


import House from '@/components/House.vue';
import Empty from "../assets/img_empty_houses@3x.png"


export default {
  data() {
    return {
      houses: [],
      search: "",
      filteredHouses: [],
      filteringOccurred: false,
      empty: Empty


    }
  },
  name: 'HomeView',
  components: {

  },
  methods: {
    //function that makes the api call
    getHouses() {
      this.houses = [];
      this.$store.dispatch("fetchApiData").then(() => {
        this.houses = this.$store.state.apiData;


      })
    },



    //filtering functions

    sortByPrice() {
      this.houses.sort((a, b) => a.price - b.price);

    },

    sortBySize() {
      this.houses.sort((a, b) => a.size - b.size);

    },

    //logic that handles the filtering of the search bar



    filterHouses() {

      const searchTerm = this.search.toLowerCase();
      this.houses = this.$store.state.apiData.filter((house) => {
        return house.location.city.toLowerCase().includes(searchTerm)
          || house.location.zip.toLowerCase().includes(searchTerm)
          || house.size.toString().includes(searchTerm)
          || house.price.toString().includes(searchTerm);
      });
      this.filteredHouses = this.houses;
      this.filteringOccurred = true;


    },

    clearSearchInput() {
      this.search = '';
      this.getHouses()

    }
  },

  computed: {

    //function that handles the filtering of the searchbar
    filteredHouses() {
      const searchTerm = this.search.toLowerCase();
      return this.houses.filter((house) => {
        const cityMatch = house.location.city.toLowerCase().includes(searchTerm);
        const zipMatch = house.location.zip.toLowerCase().includes(searchTerm);


        const sizeMatch = house.size.toString().includes(searchTerm);
        const priceMatch = house.price.toString().includes(searchTerm);

        return cityMatch || zipMatch || sizeMatch || priceMatch;
      })
    }
  },



  mounted() {

    // i make the api call as soon as the component is mounted with this function
    this.getHouses();
    console.log(this.houses);


  },

  components: { House }

}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  background-color: var(--element-background-color1);
  padding-left: 200px;
  padding-right: 200px;
  gap: 20px;
}

.first-block {
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.first-block button {
  padding: 0.5em 1em 0.5em 1em !important;

}

.second-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.second-block .searchbar {
  padding: 1em 12em 1em 0;
  background-color: var(--element-tertiary-color1);
  border-radius: 0.5em;
  border: none;

}

.second-block .searchbar::placeholder {
  font-family: var(--font-open-sans-regular);
  color: var(--element-tertiary-color2);
  font-size: var(--font-size-input-field-desktop);

}

.second-block .button1 {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.second-block .button2 {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  background-color: var(--element-tertiary-color2) !important;
}

.button {
  display: inline-block;
}

.active-button {
  background-color: var(--element-tertiary-color2);
  color: white;
}

.active-button2 {
  background-color: var(--element-background-color1);
  color: white;
}

.clear-button {
  cursor: pointer;
  color: #999;

  margin-left: 5px;

}
</style>