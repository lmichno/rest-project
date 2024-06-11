// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    token: null,
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
  },
})
