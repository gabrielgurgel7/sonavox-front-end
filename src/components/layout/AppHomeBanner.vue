<template>
  <section class="relative w-full h-screen overflow-hidden">
    <!-- Imagem de fundo -->
    <img
      class="absolute inset-0 w-full h-full object-cover"
      src="@/assets/imgs/banner_hero_musi_commerce.webp"
      alt="Banner Sonavox"
    />

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/50 dark:bg-black/70" />

    <!-- Conteúdo -->
    <div
      class="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 gap-4"
    >
      <h1 class="text-neutral-50 text-3xl sm:text-4xl md:text-5xl font-bold max-w-2xl">
        Seu som. Sua identidade.
      </h1>
      <p class="text-neutral-200 text-sm sm:text-base max-w-md sm:max-w-lg md:max-w-xl">
        Explore nossa coleção de instrumentos, acessórios e equipamentos de áudio selecionados para
        todos os níveis. Do primeiro acorde ao palco profissional.
      </p>
      <PrimeButton
        unstyled
        class="bg-transparent text-neutral-50 border border-neutral-50 px-8 py-3 rounded-2xl font-semibold hover:bg-white/10 transition-colors"
      >
        Explorar catálogo
      </PrimeButton>
    </div>
  </section>
</template>
