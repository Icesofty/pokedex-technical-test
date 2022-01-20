<template>
  <section class="min-h-screen py-8">
    <div
      class="
        text-gray-800
        my-24
        font-bold
        leading-none
        md:text-center
        font-inter
      "
    >
      <h1 class="text-3xl xl:text-6xl">
        Discover the new
        <span class="gradient-h1">Pokedex.</span>
      </h1>
      <br />
      <h2 class="text-lg xl:text-2xl font-light">
        Explore, build your team, enjoy.
        <br />
      </h2>
      <div
        class="bg-gray-900 opacity-60 z-40 inset-0 fixed"
        @click="name = null"
        v-if="name"
      ></div>
      <div class="relative z-50">
        <input
          type="text"
          placeholder="Search..."
          class="rounded-lg px-6 py-4 border text-xl mt-6 shadow-inner"
          v-model="name"
        />
        <div
          v-if="name"
          class="
            absolute
            top-20
            right-0
            w-full
            bg-white
            p-6
            rounded-lg
            mb-8
            z-50
          "
        >
          <NuxtLink
            :to="`/pokemon/${pokemon.name}`"
            v-for="(pokemon, index) in searchPokemon"
            :key="pokemon.id + index"
            class="items-center flex space-x-2"
          >
            <NuxtImg :src="pokemon.sprite" :alt="pokemon.name" />
            <p>{{ pokemon.name }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="mx-auto grid grid-cols-4">
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
          rounded-lg
          hover:-translate-y-1 hover:shadow-lg hover:bg-white
        "
      >
        <NuxtImg :src="pokemon.sprite" :alt="pokemon.name" class="w-20 h-20" />
        <p class="text-center text-xs">{{ pokemon.name }}</p>
      </NuxtLink>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: null,
    }
  },
  async asyncData({ $axios }) {
    const pokemons = []
    const pokemonsList = await $axios.$get(
      'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
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
  computed: {
    searchPokemon() {
      if (this.name) {
        const pokemons = this.pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(this.name.toLowerCase())
        )
        return pokemons
      } else {
        return false
      }
    },
  },
  async created() {
    this.$store.commit('localStorage/updateList', this.pokemons)
  },
}
</script>
