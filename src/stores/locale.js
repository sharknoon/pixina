import { defineStore } from 'pinia'

export const useStore = defineStore('locale', {
    state: () => {
        return {
            locale: ""
        }
    },
    actions: {
        changeLocale(locale) {
            this.locale = locale
        }
    },
    persist: {
        // Keep backward compatability
        beforeRestore: () => {
            const locale = localStorage.getItem('locale')
            const vuex = localStorage.getItem('vuex')
            if (!locale && vuex) {
                try {
                    const newLocale = JSON.parse(vuex).locale
                    localStorage.setItem('locale', JSON.stringify({ locale: newLocale }))
                } catch (e) {
                    console.error(e)
                }
            }
        }
    }
})