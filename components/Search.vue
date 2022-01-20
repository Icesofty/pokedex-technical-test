<template>
  <div
    class="inset-0 h-screen w-full bg-gray-900 fixed"
    v-if="mask"
    @click="close()"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      mask: false,
    }
  },
  created() {
    this.$nuxt.$on('search', (isSarching) => {
      isSarching ? (this.mask = true) : (this.mask = false)
    })
  },
  methods: {
    close() {
      this.$nuxt.$emit('close')
    },
  },
}
</script>