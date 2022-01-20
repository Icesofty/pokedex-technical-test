<template>
  <section class="min-h-screen py-8">
    <div class="mx-auto shadow border grid grid-cols-4 divide-x divide-y">
      <NuxtLink
        :to="`/pokemon/${pokemon.name}`"
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        class="
          xl:col-span-1
          md:col-span-2
          col-span-4
          p-4
          flex
          items-center
          space-x-2
          transform
          duration-150
          ease-in-out
          hover:-translate-y-1 hover:shadow-lg
          bg-white
        "
      >
        <NuxtImg :src="pokemon.sprite" :alt="pokemon.name" class="w-20 h-20" />
        <p class="text-center text-xs">{{ pokemon.name }}</p>
      </NuxtLink>
      <div v-if="loading">Loading...</div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      offset: 0,
      loading: false,
    }
  },
  async asyncData({ $axios }) {
    const pokemons = []
    const pokemonsList = await $axios.$get(
      'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'
    )
    const next = pokemonsList.next

    async function fetchPokemons() {
      for (const pokemon of pokemonsList.results) {
        const { name, sprites, abilities, stats, id } = await $axios.$get(
          pokemon.url
        )
        pokemons.push({
          name,
          sprite: sprites.front_default,
          abilities,
          stats,
          id,
        })
      }
    }
    await fetchPokemons()

    return {
      pokemons,
      next,
    }
  },
  created() {
    if (this.$store.state.localStorage.pokemons.length === 0) {
      this.$store.commit('localStorage/updateList', this.pokemons)
    }
  },
  mounted() {
    this.getNextPokemons()
  },
  methods: {
    async fetchPokemons(pokemonsList) {
      this.loading = true
      const newPokemons = []
      for (const pokemon of pokemonsList.results) {
        const { name, sprites, abilities, stats, id } = await this.$axios.$get(
          pokemon.url
        )
        newPokemons.push({
          name,
          sprite: sprites.front_default,
          abilities,
          stats,
          id,
        })
      }
      this.pokemons = [...this.pokemons, ...newPokemons]
      this.$store.commit('localStorage/updateList', newPokemons)
      this.loading = false
    },
    getNextPokemons() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight
        if (bottomOfWindow && this.next && !this.loading) {
          this.$axios.$get(this.next).then((response) => {
            this.next = response.next || false
            this.fetchPokemons(response)
          })
        }
      }
    },
  },
}
</script>