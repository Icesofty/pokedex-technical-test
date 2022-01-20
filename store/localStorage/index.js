export const state = () => ({
    pokemons: []
})

export const mutations = {
    updateList(state, list) {
        state.pokemons = [...state.pokemons, ...list]
    }
}