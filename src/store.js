import   Vue                from "vue";
import   Vuex               from 'vuex';

Vue.use(Vuex);



export const store = new Vuex.Store(
    {
        state: {
            flavor: '',
            mode:   "home"
        }
        ,
        mutations: {
            change(state, flavor) {
                state.flavor = flavor
            }
            ,
            setMode(state, newMode) {
                state.mode = newMode
            }
        },
        getters: {
            flavor: state => state.flavor,
            mode: state => state.mode
        }
    }
)
