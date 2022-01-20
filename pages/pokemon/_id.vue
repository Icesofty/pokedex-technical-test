<template>
  <div class="flex items-center space-x-4">
    <img :src="sprite" :alt="name" class="w-36 h-36" />
    <div>
      <p class="text-2xl">{{ name }}</p>
      <div v-for="item in stats" :key="item.stat.name">
        <p class="text-gray-700">{{ item.stat.name }} : {{ item.base_stat }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      sprite: null,
      stats: null,
    }
  },
  async created() {
    const pokemon = await this.$store.state.localStorage.pokemons.filter(
      (pokemon) => pokemon.name === this.$route.params.id
    )[0]
    if (pokemon) {
      this.name = pokemon.name
      this.sprite = pokemon.sprite
      this.abilities = pokemon.abilities
      this.stats = pokemon.stats
    } else {
      const pokemon = await this.$axios.$get(
        `https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`
      )
      this.name = pokemon.name
      this.sprite = pokemon.sprites.front_default
      this.abilities = pokemon.abilities
      this.stats = pokemon.stats
    }
  },
}
</script>