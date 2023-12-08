<template>
    <!-- this component will be rendered if the user presses the deleted button,
    to confirm the deletion of the house or not. It's basically two buttons 
   with functions attached to them that will either delete the house or hide the component -->
    <div class="confirm-delete-popup">
        <div class="popup-content">
            <h1>Do u really want to delete the house?</h1>
            <button @click="confirmDeletion">Yes</button>
            <button @click="cancelDeletion">No</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            house: [],
        }
    },

    methods: {
        confirmDeletion() {
            // Emit an event or call a function to confirm the deletion
            this.$emit('confirmed');
        },
        cancelDeletion() {
            // Emit an event or call a function to cancel the deletion
            this.$emit('canceled');
        },
    },
}
</script>

<style scoped>
.confirm-delete-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Semi-transparent overlay */
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    text-align: center;
}
</style>