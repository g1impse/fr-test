export const state = () => ({
    breadcrumbs: [],
});

export const actions = {
    // async nuxtServerInit({ commit, dispatch }) {
    //     console.log('nuxtServerInit');
    // }
};

export const mutations = {
    setBreadcrumbs(state, payload) {
        console.log('set');
        state.breadcrumbs = payload;
    },
};
