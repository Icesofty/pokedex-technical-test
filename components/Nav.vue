<template>
  <div
    class="
      h-20
      mb-6
      flex
      items-center
      px-6
      rounded-lg
      justify-between
      relative
      w-full
    "
  >
    <NuxtLink
      to="/"
      @click.native="close()"
      class="
        w-12
        gradient
        rounded-lg
        flex
        justify-center
        items-center
        text-3xl text-white
        h-12
        font-bold font-inter
      "
    >
      <NuxtImg
        src="https://img.icons8.com/windows/32/ffffff/pokedex.png"
        alt="Logo"
      />
    </NuxtLink>
    <Team />
  </div>
</template>

<script>
export default {
  data() {
    return {
      team: null,
      pokemonlist: null,
    }
  },

  methods: {
    close() {
      this.name = null
      this.$nuxt.$emit('search', false)
    },
  },
  async created() {
    this.pokemonlist = await this.$store.state.localStorage.pokemons
    this.$nuxt.$on('close', () => {
      this.name = null
      this.$nuxt.$emit('search', false)
    })
  },
  watch: {
    name(newValue) {
      if (newValue) {
        this.$nuxt.$emit('search', true)
      }
    },
  },
}
</script>