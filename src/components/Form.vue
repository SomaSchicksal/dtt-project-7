<template>
    <!-- Basic form component that will be rendered every time you see 
    a form in the application -->
    <div v-if="house">
        <form @submit.prevent="submitForm" novalidate class="form">
            <!-- each field is binded to a property of the house object
            , when i type on the field the property is updated and 
            a function is fired that checks for validation errors. 
            If a validation error is present a error message will be conditionally rendered
         -->
            <label for="streetName">Street name*</label>
            <input v-model="house.street" type="text" id="streetName" required
                @input="validateTextField('street', house.street)" placeholder="Enter the street name">
            <p v-if="msg['street']" class="error-message">Error: {{ msg['street'] }}</p>

            <div style="display:flex; gap:10px">
                <div style="display:flex; flex-direction:column">
                    <label for="houseNumber">House number*</label>
                    <input v-model="house.number" type="text" id="houseNumber" required
                        @input="validateNumberField('number', house.number)" placeholder="Enter house number">
                    <p v-if="msg['number']" class="error-message">Error: {{ msg['number'] }}</p>
                </div>


                <div style="display:flex; flex-direction:column">
                    <label for="houseAddition">Addition (optional)</label>
                    <input v-model="house.addition" type="text" id="houseAddition"
                        @input="validateTextField('addition', house.addition)" placeholder="e.g.A">
                    <p v-if="msg['addition']" class="error-message">Error: {{ msg['addition'] }}</p>
                </div>
            </div>

            <label for="housePostalCode">Postal code*</label>
            <input v-model="house.postalCode" type="text" id="housePostalCode" required placeholder="e.g. 1000 AA">
            <p v-if="msg['postalCode']" class="error-message">Error: {{ msg['postalCode'] }}</p>

            <label for="houseCity">City*</label>
            <input v-model="house.city" type="text" id="houseCity" required @input="validateTextField('city', house.city)"
                placeholder="e.g. Utrecht">
            <p v-if="msg['city']" class="error-message">Error: {{ msg['city'] }}</p>

            <label for="houseImage" style="display:flex; flex-direction: column;">
                Upload Image*
                <div style="display:flex;flex-direction: column; position:relative">
                    <img v-if="houseImage" :src="houseImage" alt="Image" class="uploaded-image">
                    <img v-else-if="imageUrl" :src="imageUrl" alt="Image" class="uploaded-image">
                    <img v-else :src="upload" class="uploaded-image">
                    <img v-if="houseImage || imageUrl" :src="clear" class="clear-icon" @click="deleteUploadedImage">
                </div>

            </label>
            <input type="file" id="houseImage" @change="handleImageUpload" required style="display:none">



            <label for="housePrice">Price*</label>
            <input v-model="house.price" type="text" id="housePrice" required
                @input="validateNumberField('price', house.price)" placeholder="e.g. $150.000">
            <p v-if="msg['price']" class="error-message">Error: {{ msg['price'] }}</p>

            <div style="display:flex; gap:10px">
                <div style="display:flex; flex-direction:column">
                    <label for="houseSize">Size*</label>
                    <input v-model="house.size" type="text" id="houseSize" required
                        @input="validateNumberField('size', house.size)" placeholder="e.g 60m2">
                    <p v-if="msg['size']" class="error-message">Error: {{ msg['size'] }}</p>
                </div>

                <div style="display:flex; flex-direction:column; margin-left:auto">
                    <label for="houseGarage">Garage*</label>
                    <select v-model="house.garage" id="houseGarage" required>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </div>

            <div style="display:flex; gap:10px">
                <div style="display:flex; flex-direction:column">
                    <label for="houseBedrooms">Bedrooms*</label>
                    <input v-model="house.bedrooms" type="text" id="houseBedrooms" required
                        @input="validateNumberField('bedrooms', house.bedrooms)" placeholder="Enter amount">
                    <p v-if="msg['bedrooms']" class="error-message">Error: {{ msg['bedrooms'] }}</p>
                </div>

                <div style="display:flex; flex-direction:column">
                    <label for="houseBathrooms">Bathrooms*</label>
                    <input v-model="house.bathrooms" type="text" id="houseBathrooms" required
                        @input="validateNumberField('bathrooms', house.bathrooms)" placeholder="Enter amount">
                    <p v-if="msg['bathrooms']" class="error-message">Error: {{ msg['bathrooms'] }}</p>
                </div>
            </div>

            <label for="houseConstructionDate">Construction date*</label>
            <input v-model="house.constructionDate" type="text" id="houseConstructionDate" required
                placeholder="e.g. 01/03/1990" @input="validateNumberField('date', house.constructionDate)">
            <p v-if="msg['date']" class="error-message">Error: {{ msg['date'] }}</p>

            <label for="houseDetails">Description*</label>
            <textarea v-model="house.details" type="text" id="houseDetails" required rows="8" cols="50"
                placeholder="Enter description"></textarea>
            <p v-if="msg['details']" class="error-message">Error: {{ msg['details'] }}</p>

            <!-- if all the required fields arent completed an error message
            will be conditionally rendered -->


            <div v-if="!isFormValid" class="error-message">
                <p>{{ isEditMode ? "" : "Please complete all required fields. " }}</p>
            </div>

            <!-- a function will be fired if u press the post button that 
            creates a new house -->

            <button v-if="isEditMode" type="submit" style="margin-left:auto" class="button">Save</button>
            <button v-else :disabled="!isFormValid" type="submit"
                :class="{ 'valid-form': isFormValid, 'invalid-form': !isFormValid }">Post</button>
        </form>
    </div>
    <div v-else>
        <h1>Loading...</h1>
    </div>
</template>

<script>

import Upload from "../assets/ic_upload@3x.png"
import ClearWhite from "../assets/ic_clear_white@3x.png"


export default {

    data() {
        return {
            hello: "",
            upload: Upload,
            clear: ClearWhite


        }
    },

    props: {
        house: {
            type: Object,
            required: true
        },

        imageUrl: {
            type: String
        },

        houseImage: {
            type: String
        },

        isEditMode: {
            type: Boolean,
            default: false,
        },

        handleImageUpload: {

        },

        msg: {
            type: Array
        },

        isFormValid: {
            type: Boolean,
            default: false,

        },

        validateNumberField: {

        },

        validateTextField: {

        },

        submitForm: {

        }
    },

    created() {
        console.log('Received props in House component:', this.house);
        console.log("received image", this.imageUrl)
    },

    methods: {
        deleteUploadedImage(event) {
            if (event.target.classList.contains('clear-icon')) {
                // Emit the clear-image event
                this.$emit('deleteUploadedImage');
            }
            
            

        }
    }




}
</script>

<style>
.form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.form label {
    font-family: "Montserrat";
    font-weight: 600;
}

.form input {
    padding: 20px;
    border: none;
    border-radius: 5px;
    font-family: "Open Sans";
    font-weight: 400;
    font-size: var(--font-size-input-field-desktop);
}

.form select {
    padding: 10px;
}

.error-message {
    font-family: "Montserrat";
    font-weight: 500;
    font-size: 14px;
    color: red;
}

.valid-form {
    border-radius: 5px;
    background-color: var(--element-primary-color);
    font-family: var(--font-montserrat-bold);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-buttons-and-tabs-desktop);
    color: white;
    padding: 0.5em 3em 0.5em 3em;
    border: none;
    margin-left: auto;
}

.invalid-form {
    border-radius: 5px;
    background-color: rgba(235, 84, 64, 0.7);
    font-family: var(--font-montserrat-bold);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-buttons-and-tabs-desktop);
    color: white;
    padding: 0.5em 3em 0.5em 3em;
    border: none;
    margin-left: auto;
}

.uploaded-image {
    width: 100px;
}

.clear-icon {
    width: 30px;
    position: absolute;
    left:80px;
    top:0px;
}
</style>