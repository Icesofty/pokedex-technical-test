export const state = () => ({
    pokemons: [],
    team: [false, false, false, false, false, false]
})

export const mutations = {
    updateList(state, list) {
        state.pokemons = [...state.pokemons, ...list]
    },
    addPokemonTeam(state, pokemon) {
        state.team.pop()
        state.team.unshift(pokemon)
    },
    removePokemonTeam(state, index) {
        state.team.splice(index, 1)
        state.team.push(false)
    },
}