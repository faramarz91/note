import {defineStore} from "pinia";
import User from "@js/axios/User.js";
import {useRouter} from "vue-router";


export const useAuthStore = defineStore('auth', {
    state: () => ({
        userInfo: {},
        isAuthenticated: false
    }),

    actions: {
        reset: () => {
            this.isAuthenticated = false;
            this.userInfo = {};
        },

        async getUser() {
            try {
                let response = await User.userInfo();
                this.isAuthenticated = true;
                this.userInfo = response.data;
                return response;

            } catch (err){
                console.log('AuthStore.getUser() error', err)

            }

        },

        async logoutUser(){
            try {
                let response = await User.logout();
                this.userInfo = null;
                this.isAuthenticated = false;
                return response;
            } catch (err) {
                console.log('AuthStore.logoutUser() error', err)
            }
        },

        async loginUser(login){
            try {
                let response = await User.login(login);
                let user = await this.getUser();
                return response
            } catch (err) {
                console.log('AuthStore.loginUser() error', err)
            }
        }
    }
})
