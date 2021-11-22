///////////////////////////////////////////
//                Vuex                   //
///////////////////////////////////////////

import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
    plugins: [createPersistedState()],
    state: {
        favoriteTiles: [],
        locale: ""
    },
    mutations: {
        toggleFavoriteTile(state, favoriteTile) {
            let index = state.favoriteTiles.indexOf(favoriteTile)
            if (index >= 0) {
                state.favoriteTiles.splice(index, 1)
            } else {
                state.favoriteTiles.push(favoriteTile)
            }
        },
        changeLocale(state, locale) {
            state.locale = locale;
        }
    },
    getters: {
        isFavorite: (state) => (tile) => {
            return state.favoriteTiles.includes(tile)
        },
    },
})