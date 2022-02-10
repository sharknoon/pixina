///////////////////////////////////////////
//                Pinia                  //
///////////////////////////////////////////

import { defineStore, createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const useStore = defineStore('vuex', {
    state: () => {
        return {
            favoriteTiles: [],
            locale: ""
        }
    },
    getters: {
        isFavorite: (state) => (tile) => {
            return state.favoriteTiles.includes(tile)
        },
    },
    actions: {
        toggleFavoriteTile(favoriteTile) {
            const index = this.favoriteTiles.indexOf(favoriteTile)
            if (index >= 0) {
                this.favoriteTiles.splice(index, 1)
            } else {
                this.favoriteTiles.push(favoriteTile)
            }
        },
        changeLocale(locale) {
            this.locale = locale
        }
    },
    persist: true
})

export default createPinia().use(piniaPluginPersistedstate)