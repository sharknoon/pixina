import { defineStore } from 'pinia'

export const useStore = defineStore('favorite-tiles', {
    state: () => {
        return {
            favoriteTiles: []
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
    },
    persist: {
        // Keep backward compatability
        beforeRestore: () => {
            const favoriteTiles = localStorage.getItem('favorite-tiles')
            const vuex = localStorage.getItem('vuex')
            if (!favoriteTiles && vuex) {
                try {
                    const newFavoriteTiles = { favoriteTiles: JSON.parse(vuex).favoriteTiles }
                    localStorage.setItem('favorite-tiles', JSON.stringify(newFavoriteTiles))
                } catch (e) {
                    console.error(e)
                }
            }
        }
    }
})