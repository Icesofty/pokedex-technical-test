<template>
  <div class="flex space-x-2 items-center rounded-lg p-4">
    <div
      v-for="(item, index) in team"
      :key="index"
      class="flex items-center space-x-2 py-2"
    >
      <div class="rounded-full flex items-center justify-center">
        <img
          v-if="!item"
          src="https://img.icons8.com/fluency-systems-regular/48/000000/pokeball.png"
          alt="Empty Pokeball"
          class="w-10 h-10"
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
          <img :src="item.sprite" alt="" class="w-10 h-10 z-10" />
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
</template>

<script>
export default {
  data() {
    return {
      team: null,
    }
  },
  methods: {
    removeTeam(index) {
      this.$store.commit('localStorage/removePokemonTeam', index)
    },
  },
  async created() {
    this.team = await this.$store.state.localStorage.team
  },
}
</script>