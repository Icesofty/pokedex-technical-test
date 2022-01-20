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
    <div class="flex -space-x-2 items-center">
      <div v-for="(item, index) in team" :key="index">
        <div class="rounded-full flex items-center justify-center bg-white">
          <img
            v-if="!item"
            src="https://img.icons8.com/color/48/000000/open-pokeball--v2.png"
            alt="Empty Pokeball"
            class="w-12 h-12"
          />
          <div
            v-else
            @click="removeTeam(index)"
            class="
              flex
              items-center
              justify-center
              relative
              overflow-hidden
              rounded-full
              group
              cursor-pointer
            "
          >
            <img :src="item.sprite" alt="" class="w-12 h-12 z-10" />
            <div
              class="
                absolute
                inset-0
                bg-red-500
                opacity-0
                z-20
                group-hover:opacity-100
                flex
                justify-center
                items-center
                text-white
                rounded-full
                border-2 border-white
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      team: null,
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
    removeTeam(index) {
      this.$store.commit('localStorage/removePokemonTeam', index)
    },
  },
  async created() {
    const team = await this.$store.state.localStorage.team
    this.team = team
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