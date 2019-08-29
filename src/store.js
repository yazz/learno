import   Vue                from "vue";
import   Vuex               from 'vuex';

Vue.use(Vuex);



export const store = new Vuex.Store(
    {
        state: {
            mode:   "home"
        }
        ,





        mutations: {
            setMode(state, newMode) {
                state.mode = newMode
            }
        }
        ,





        getters: {
            mode: state => state.mode
        }
    }
)
