<template>
    <!-- Basic house component that will be rendered every time you want to see
    the details of one of the houses the application gets from the api call -->
    <div>
        <h1>house details</h1>
        <div v-if="house && house.length > 0" class="created-house">
            <BackToOverview></BackToOverview>
            <img :src="house[0].image" class="created-house-img">

            <div class="created-house-info">
                <div class="created-house-address">
                    <h1 v-if="house[0].location">{{ house[0].location.street }}</h1>
                    <h1 v-if="house[0].location">{{ house[0].location.houseNumber }}</h1>
                </div>
                <div class="created-house-city">
                    <img :src="location" class="icon">
                    <p>{{ house[0].location.zip }}</p>
                    <p v-if="house[0].location">{{ house[0].location.city }}</p>
                </div>
                <div class="created-house-price">
                    <img :src="price" class="icon">
                    <p>{{ house[0].price }}</p>
                    <img :src="size" class="icon">
                    <p>{{ house[0].size }} m2</p>
                    <img :src="construction" class="icon">
                    <p>Built in {{ house[0].constructionYear }}</p>
                </div>

                <div class="created-house-rooms">
                    <img :src="bed" class="icon">
                    <p>{{ house[0].rooms.bedrooms }}</p>
                    <img :src="bath" class="icon">
                    <p>{{ house[0].rooms.bathrooms }}</p>
                    <img :src="garage" class="icon">
                    <p v-if="house[0].hasGarage">Yes</p>
                    <p v-else>No</p>
                </div>
            </div>
            

        </div>
        <div v-else>
            <h1>Loading...</h1>
        </div>
    </div>
</template>

<script>

import House from './House.vue';
import BackToOverview from "@/components/BackToOverview.vue";

import Bath from "@/assets/ic_bath@3x.png"
import Bed from "@/assets/ic_bed@3x.png"
import Size from "@/assets/ic_size@3x.png"
import Price from "@/assets/ic_price@3x.png"
import Location from "@/assets/ic_location@3x.png"
import Construction from "@/assets/ic_construction_date@3x.png"
import Garage from "@/assets/ic_garage@3x.png"
import Back from "@/assets/ic_back_grey@3x.png"

export default {
    data() {
        return {
            house: [],
            bath: Bath,
            bed: Bed,
            size: Size,
            price: Price,
            location: Location,
            construction: Construction,
            garage: Garage,
            back: Back
        }
    },
    //as soon as the component is created i make an api call with the house's id as parameter

    async created() {
        const houseId = this.$route.params.id;

        const ApiKey = "_0KfzMBqomADtsj7brkVaX1iwRhLgIQN";

        /*calling the api with the id of the house as a parameter allows me to get 
        its specific infos and then render them */


        const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, {
            method: "GET",
            headers: {
                "X-Api-Key": ApiKey,
            }
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.house = data;
            });



    },

    

    components: { House, BackToOverview }
}
</script>

<style scoped>

.created-house-info {
    padding-left:20px;
}
.created-house-info p {
    font-family: "Open sans";
    font-weight: 600;
    font-size: var(--font-size-listing-information-desktop);
    color: var(--text-secondary-color)!important;
    word-wrap: break-word;
    white-space: pre-wrap;
    text-align: justify;
}
</style>