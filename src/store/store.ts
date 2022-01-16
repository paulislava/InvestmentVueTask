import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state: {
        windows: [],
    },
    mutations: {
        updateWindows(state, value) {
            state.windows = value
        }
    },
    plugins: [createPersistedState()],
})