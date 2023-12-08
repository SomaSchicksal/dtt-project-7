import { createStore } from 'vuex'

export default createStore({

    /* as date i have one array for the data i get from the api call 
    and one to store the created houses */
    state: {

        apiData: [],
        myListings: [],
        myFavoriteHouses: []
    },
    mutations: {
        //store the data i get from the api into the apiData array

        setApiData(state, data) {
            state.apiData = data;
        },

        //handles the logic to create a new house

        ADD_NEW_HOUSE(state, { newHouse, image }) {

            const houseWithImage = { ...newHouse, image };
            state.myListings.push(houseWithImage);
            console.log(state.myListings)


        },

        //handles the logic to modify a house's infos

        SAVE_HOUSE_CHANGES(state, { index, updatedHouse }) {
            // Update the existing house with the changes
            state.myListings[index] = { ...updatedHouse };


        },

        //handle the logic to change a house's image

        SAVE_HOUSE_IMAGE_CHANGES(state, { index, newImage }) {
            state.myListings[index].image = newImage;
        },

        //handles the logic to elimate a house

        REMOVE_HOUSE(state, index) {
            state.myListings.splice(index, 1);
        },

        //handles the logic for adding a house to an array of favorites houses

        TOGGLE_LIKE(state, houseId) {
            //first we check the id of the house inside the myFavorites house array
            const index = state.myFavoriteHouses.indexOf(houseId);
            //if the index is not -1 we push the id of that house in the favorirest array
            if (index === -1) {
                state.myFavoriteHouses.push(houseId);
                console.log(state.myFavoriteHouses)
            } else {
                state.myFavoriteHouses.splice(index, 1);
            } //otherwise we will remove it from the array
        },

        


    },
    actions: {

        //api call to get the data from the api

        async fetchApiData({ commit }) {


            const ApiKey = "_0KfzMBqomADtsj7brkVaX1iwRhLgIQN";
            const ApiUrl = "https://api.intern.d-tt.nl/api/houses";

            await fetch(ApiUrl, {
                method: "GET",
                headers: {
                    "X-Api-Key": ApiKey,
                }
            }).then((res) => res.json()).then(data => {
                console.log(data);
                commit("setApiData", data);
                console.log("fetching data...")
            });


        },

        addNewHouse({ commit }, { newHouse, image }) {
            commit("ADD_NEW_HOUSE", { newHouse, image })
        },

        saveHouseChanges({ commit }, { index, house, newImage }) {

            commit('SAVE_HOUSE_CHANGES', { index, updatedHouse: house });
            if (newImage) {
                commit('SAVE_HOUSE_IMAGE_CHANGES', { index, newImage });
            }
        },

        deleteHouse({ commit }, index) {
            commit('REMOVE_HOUSE', index);
        },

        //handles the like functionalitu

        toggleLike({ commit }, houseId) {
            
            commit('TOGGLE_LIKE', houseId);
        },

        
    },
    getters: {

        getApiData: (state) => state.apiData,
    },
})