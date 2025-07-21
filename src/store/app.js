import { defineStore } from 'pinia'

export const useAppSotre = defineStore('app',{
    state: ()=> ({
        client: null,
        commandsActionMap: null,
    }),
    getters: {},
    actions: {},
})