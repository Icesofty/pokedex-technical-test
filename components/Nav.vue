<template>
  <div
    class="
      bg-red-400
      border-b-red-700 border-b-4
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
    <NuxtLink to="/" @click.native="close()">
      <NuxtImg
        src="https://img.icons8.com/ios-filled/50/ffffff/blueteam.png"
        alt="Pokedex Logo"
        class="w-[50px] h-[50px]"
    /></NuxtLink>
    <div
      v-if="name"
      class="absolute top-20 right-0 w-full bg-white p-6 rounded-b-lg mb-8"
    >
      <NuxtLink
        :to="`/pokemon/${pokemon.name}`"
        @click.native="close()"
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        class="items-center flex space-x-2"
      >
        <NuxtImg :src="pokemon.sprite" :alt="pokemon.name" />
        <p>{{ pokemon.name }}</p>
      </NuxtLink>
    </div>
    <input
      type="text"
      placeholder="Search..."
      class="text-xs rounded-lg px-4 py-2"
      v-model="name"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
    }
  },
  computed: {
    pokemons() {
      if (this.name) {
        const test = this.$store.state.localStorage.pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(this.name.toLowerCase())
        )
        return test
      } else {
        return false
      }
    },
  },
  methods: {
    close() {
      this.name = null
      this.$nuxt.$emit('search', false)
    },
  },
  created() {
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