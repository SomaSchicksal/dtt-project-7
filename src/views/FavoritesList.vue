<template>
    <!-- This component renders the list of houses liked by the user-->
    <div class="favorite-container">
        <BackToOverview></BackToOverview>
        <h1>Your favorite houses:</h1>
        <div class="api-houses">
            <div v-if="$store.state.myFavoriteHouses && $store.state.myFavoriteHouses.length > 0"
            v-for="houseId in $store.state.myFavoriteHouses" :key="houseId" class="api-house">
            <router-link :to='{ name: "house-details", params: { id: houseId } }'>
                <img :src="getHouseById(houseId).image" alt="House Image" class="house-image">
            </router-link>

            <div class="api-house-info">
                <div class="house-address">
                    <h1>{{ getHouseById(houseId).location ? getHouseById(houseId).location.street : '' }}</h1>
                    <h1>{{ getHouseById(houseId).location ? getHouseById(houseId).location.houseNumber : '' }}</h1>
                </div>
                <div class="price">
                    <img :src="price" class="icon">
                    <p>{{ getHouseById(houseId).price }}</p>
                </div>
                <div class="zip-city">
                    <p>{{ getHouseById(houseId).location ? getHouseById(houseId).location.city : '' }}</p>
                    <p>{{ getHouseById(houseId).location ? getHouseById(houseId).location.zip : '' }}</p>
                </div>

                <div class="rooms">
                    <div class="bed">
                        <img :src="bed" class="icon">
                        <p>{{ getHouseById(houseId).rooms ? getHouseById(houseId).rooms.bedrooms : '' }}</p>
                    </div>
                    <div class="bath">
                        <img :src="bath" class="icon">
                        <p>{{ getHouseById(houseId).rooms ? getHouseById(houseId).rooms.bathrooms : '' }}</p>

                    </div>
                    <div class="size">
                        <img :src="size" class="icon">
                        <p>{{ getHouseById(houseId).size }} m2</p>
                    </div>
                </div>






            </div>
            <img :src="like" @click="toggleLike(houseId)" class="like-img">
        </div>
        <div v-else style="justify-content:center">
            <h1>There are no liked houses yet</h1>
        </div>
        </div>
    </div>
</template>

<script>
import House from "../components/House.vue"
import BackToOverview from "@/components/BackToOverview.vue";
import Bath from "@/assets/ic_bath@3x.png"
import Bed from "@/assets/ic_bed@3x.png"
import Size from "@/assets/ic_size@3x.png"
import Price from "@/assets/ic_price@3x.png"
import Like from "@/assets/like.jpg"

export default {
    data() {
        return {
            bath: Bath,
            bed: Bed,
            size: Size,
            price: Price,
            like: Like,
        }
    },

    methods: {
        toggleLike(houseId) {
            // Logic to remove a house if the user presses the like button again
            this.$store.dispatch('toggleLike', houseId);
            console.log('Toggling like for houseId:', houseId);
        },
        //logic that gets a specific house from the api based on its id
        getHouseById(id) {
            return this.$store.state.apiData.find(house => house.id === id);
        },
    },
    components: { House, BackToOverview }
}
</script>

<style scoped>
.favorite-container {
    display: flex;
    flex-direction: column;
    background-color: var(--element-background-color1);
    padding-left: 250px;
    padding-right: 250px;
    
}
.api-houses {
  margin-bottom: 300px; /* or adjust as needed */
}
.api-house {
  margin-bottom: 200px; /* or adjust as needed */
}

.api-house-info p {
    font-family: var(--font-open-sans-semibold);
    font-size: var(--font-size-listing-information-desktop)
}
</style>