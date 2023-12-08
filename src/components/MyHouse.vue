<template> 
<!-- This component renders the info regarding the user's create house. Here the user
can then choose to either delete or edit his/her house -->
  <div>
    
    <DeletionConfirmPopup v-if="showPopup" @confirmed="deleteHouse" @canceled="cancelDeletion"></DeletionConfirmPopup>
    
    <House :house="house" :imageUrl="imageUrl" :goToEditPage="goToEditPage" :showDeletionConfirm="showDeletionConfirm"></House>
    
  </div>
</template>

<script>
import DeletionConfirmPopup from './DeletionConfirmPopup.vue';
import House from './House.vue';
import Edit from "../assets/ic_edit@3x.png"
import Delete from "../assets/ic_delete@3x.png"

export default {
  data() {
    return {
      house: {},
      imageUrl: null,
      showPopup: false,
      edit:Edit,
      delete:Delete,
    };
  },
  mounted() {
    /* as soon as the components is mounted im getting the house's infos in order to render them*/
    const houseIndex = this.$route.params.index;
    console.log('House index:', houseIndex);
    const selectedHouse = this.$store.state.myListings[houseIndex];
    if (selectedHouse) {
      this.house = selectedHouse;
      this.loadImage();
    }
    else {
      // Handle the case where the house is not found, e.g., redirect to an error page
      console.error(`House at index ${houseIndex} not found.`);
    }
  },
  methods: {
    //this function handles the reading of the house's picture
    loadImage() {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      
      reader.readAsDataURL(this.house.image);
    },

    //these functions handle the editing and deletion functionalities, respectively
    goToEditPage() {
      const index = this.$store.state.myListings.length - 1;
      // Redirect to the details page with the index as a parameter
      this.$router.push({ name: "edit-house", params: { index } });
    },
    deleteHouse() {
      const index = this.$store.state.myListings.length - 1;
      this.$store.dispatch("deleteHouse", index);
      this.showPopup = false;
      this.$router.push({ name: "home"});
    },
    showDeletionConfirm() {
      // Set showPopup to true to display the popup
      this.showPopup = true;
    },
    cancelDeletion() {
      this.showPopup=false;
    }
  },
  components: { DeletionConfirmPopup, House }
}

</script>