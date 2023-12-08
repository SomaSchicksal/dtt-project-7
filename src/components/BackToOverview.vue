<template>
    <!-- Basic form component that will be rendered every time you see 
    the back to overview element, it basically redirect the user to the homepage if it clicks it -->
    <div>
        <div class="back">
            <img :src="back" @click="navigateToHome">
            <h2>Back to overview</h2>
        </div>
    </div>
</template>

<script>
import Back from "@/assets/ic_back_grey@3x.png"

export default {
    data() {
        return {
            back: Back,
        }
    },

    methods: {
        navigateToHome() {
            this.$router.push({ name: 'home' });
        },
    }
}
</script>

<style>
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
</style>