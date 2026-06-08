<template>
  <div class="relative flex items-center justify-center w-full overflow-hidden h-200">
    <figure class="absolute inset-y-0 inset-x-12 top-4 m-0 rounded-3xl overflow-hidden">
      <div class="absolute inset-0 bg-black/50 z-10"></div>
      <img
        class="w-full h-full object-cover"
        src="../assets/imgs/banner_hero_musi_commerce.webp"
        alt="Banner MusiCommerce"
      />
      <header
        class="absolute flex flex-col gap-4 text-center inset-0 z-20 flex items-center justify-center"
      >
        <h1 class="text-text-neutral-50 text-5xl font-bold">Seu som. Sua identidade.</h1>
        <p class="w-150">
          Explore nossa coleção de instrumentos, acessórios e equipamentos de áudio selecionados
          para todos os níveis. Do primeiro acorde ao palco profissional.
        </p>
        <PrimeButton
          unstyled
          class="bg-transparent text-neutral-50 border-1 border-neutral-50 px-8 py-3 rounded-2xl font-semibold hover:bg-white/10 transition-colors"
          >Explorar catálogo</PrimeButton
        >
      </header>
    </figure>
  </div>
</template>
