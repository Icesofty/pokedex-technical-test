<template>
  <div
    class="
      sm:h-20
      mb-6
      flex flex-col
      sm:flex-row
      items-center
      sm:px-6
      rounded-lg
      justify-between
      relative
      w-full
    "
  >
    <NuxtLink
      to="/"
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