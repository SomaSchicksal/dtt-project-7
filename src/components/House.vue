<template>
    <!-- Basic house component that will be rendered every time you see 
        an house listing in the application -->
    <div v-if="house" class="houses">
        <!-- If the madeByMe property is true im gonna rendere the data of the houses im 
            creating, otherwise ill just render the data of the houses from the api-->

        <div v-if="house && house.madeByMe" class="created-house">
            <BackToOverview></BackToOverview>
            <img :src="imageUrl ? imageUrl : (house.image ? house.image : 'default-image-url')" alt="House Image"
                class="created-house-img">
            <div class="created-house-info">
                <div class="created-house-address">

                    <div style="display:flex; gap:10px;">
                        <h1>{{ house.street }}</h1>
                        <h1>{{ house.number }}</h1>
                        <h1>{{ house.addition }}</h1>
                    </div>
                    <div style="display:flex; gap:20px;">
                        <img :src="edit" @click="goToEditPage" class="edit-img">
                        <img :src="delete" @click="showDeletionConfirm" class="delete-img">
                    </div>

                </div>
                <div class="created-house-city">
                    <img :src="location" class="icon">
                    <p>{{ house.postalCode }}</p>
                    <p>{{ house.city }}</p>
                </div>
                <div class="created-house-price">
                    <img :src="price" class="icon">
                    <p>{{ house.price }}</p>
                    <img :src="size" class="icon">
                    <p>{{ house.size }} m2</p>
                    <img :src="construction" class="icon">
                    <p>{{ house.constructionDate }}</p>
                </div>
                <div class="created-house-rooms">
                    <img :src="bed" class="icon">
                    <p>{{ house.bedrooms }}</p>
                    <img :src="bath" class="icon">
                    <p>{{ house.bathrooms }}</p>
                    <img :src="garage" class="icon">
                    <p>{{ house.garage }}</p>
                </div>
                <p>{{ house.details }}</p>
            </div>

        </div>

        <div v-else class="api-houses">
            <div v-if="house" class="api-house">



                <img :src="house.image" class="house-image" @click="navigateToDetails">




                <!-- this button fires the toggle like function that handles the functionality
            to store the liked houses and render them in the favorites section -->

                <div class="api-house-info">

                    <div class="house-address">
                        <h1>{{ house.location ? house.location.street : '' }}</h1>
                        <h1>{{ house.location ? house.location.houseNumber : '' }}</h1>
                    </div>
                    <div class="price">
                        <img :src="price" class="icon">
                        <p>{{ house.price }}</p>
                    </div>
                    <div class="zip-city">
                        <p>{{ house.location ? house.location.zip : '' }}</p>
                        <p>{{ house.location ? house.location.city : '' }}</p>
                    </div>
                    <div class="rooms">

                        <div class="bed">
                            <img :src="bed" class="icon">
                            <p>{{ house.rooms ? house.rooms.bedrooms : '' }}</p>
                        </div>
                        <div class="bath">
                            <img :src="bath" class="icon">
                            <p>{{ house.rooms ? house.rooms.bathrooms : '' }}</p>
                        </div>
                        <div class="size">
                            <img :src="size" class="icon">
                            <p>{{ house.size }} m2</p>
                        </div>

                    </div>
                </div>

                <div style="margin-left:auto; display:flex; flex-direction:column;">
                    <img :src="like" @click="toggleLike" style="margin-left:auto" class="like-img">
                    <div v-if="showNotification" class="notification">
                        You've liked the house!
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import FavoritesList from '@/views/FavoritesList.vue';
import BackToOverview from "@/components/BackToOverview.vue";
import Bath from "@/assets/ic_bath@3x.png"
import Bed from "@/assets/ic_bed@3x.png"
import Size from "@/assets/ic_size@3x.png"
import Price from "@/assets/ic_price@3x.png"
import Location from "@/assets/ic_location@3x.png"
import Construction from "@/assets/ic_construction_date@3x.png"
import Garage from "@/assets/ic_garage@3x.png"
import Back from "@/assets/ic_back_grey@3x.png"
import Like from "@/assets/like.jpg"
import Edit from "../assets/ic_edit@3x.png"
import Delete from "../assets/ic_delete@3x.png"

export default {
    data() {
        return {

            bath: Bath,
            bed: Bed,
            size: Size,
            price: Price,
            location: Location,
            construction: Construction,
            garage: Garage,
            back: Back,
            like: Like,
            delete: Delete,
            edit: Edit,
            showNotification: false,

        }
    },
    // these are the props that im going to get from the parent components, 
    //i just need an house object and a url for the image
    props: {
        house: {
            type: Object,
            required: true,
        },

        imageUrl: {
            type: String,
            default: "", // Set a default value or leave it as an empty string
        },

        isDetailsView: {
            type: Boolean,
            default: false,
        },

        showDeletionConfirm: {

        },

        goToEditPage: {}

    },

    computed: {
        liked() {
            return this.$store.state.myFavoriteHouses.includes(this.house.id);
        },
    },

    methods: {
        toggleLike() {
            this.$store.dispatch('toggleLike', this.house.id);
            this.showNotification = true;

            // Automatically hide the notification after 3 seconds
            setTimeout(() => {
                this.showNotification = false;
            }, 3000);
            console.log("clicked")
        },

        navigateToHome() {
            this.$router.push({ name: 'home' });
        },

        navigateToDetails() {
            this.$router.push({ name: 'house-details', params: { id: this.house.id } });
        },


    },

    mounted() {
        // Logs the received props to the console
        console.log('Received props in House component:', this.house);
    },

    components: { FavoritesList, BackToOverview }




}

</script>

<style>
.created-house {
    display: flex;
    flex-direction: column;
    background-color: var(--element-background-color1);
    padding-left: 250px;
    padding-right: 250px;
}

.back {
    display: flex;
    align-items: center;
    gap: 15px;
}

.back img {

    width: 25px;
    height: 25px;
    cursor: pointer;
}

.created-house-image {
    max-width: 100%;

}

.created-house-info {
    background-color: var(--element-background-color2);
    padding: 20px 20px 20px 20px;
}

.created-house-info p {
    font-family: "Open Sans";
    font-weight: 600;
    font-size: var(--font-size-listing-information-desktop);
    color: var(--text-secondary-color);
    word-wrap: break-word;
    white-space: pre-wrap;
    text-align: justify;
}

.created-house-address {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
}

.delete-img,
.edit-img {
    width: 20px;

}

.created-house-city {
    display: flex;
    gap: 10px;
    align-items: center;
}

.created-house-price {
    display: flex;
    gap: 10px;
    align-items: center;
}

.created-house-rooms {
    display: flex;
    gap: 10px;
    align-items: center;
}


.api-houses {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    gap: 20px;






}


.house-image {
    width: 250px;
    border-radius: 0.5em;
    cursor: pointer
}

.api-house {
    display: flex;
    align-items: center;
    padding: 1em 0 1em 1em;
    border-radius: 0.5em;
    gap: 20px;
    background-color: white;
    width: 100%;
}





.api-house-info {
    display: flex;
    flex-direction: column;

    gap: 0.5px;
}

.api-house-info p {
    font-family: var(--font-open-sans-semibold);
    font-size: var(--font-size-listing-information-desktop)
}

.house-address {
    display: flex;
}

.house-address h1 {
    margin: 0;

}

.zip-city {
    display: flex;
    gap: 6px;

}

.zip-city p {
    color: var(--element-tertiary-color2) !important;

}

.rooms {
    display: flex;
    gap: 15px;

}

.price,
.bed,
.size,
.bath {
    display: flex;

    align-items: center;
    gap: 10px;

}





.icon {
    width: 20px;
    height: 20px;
}





.price p {
    color: var(--text-secondary-color) !important;





}

.like-img {
    width: 100px;
}

.notification {
    font-family: "Open Sans";

}
</style>