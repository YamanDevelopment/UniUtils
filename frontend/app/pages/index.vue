<template>
    <div class="w-screen h-[90vh] flex flex-col gap-5 justify-center items-center">
        <Orb class="absolute opacity-20" />
        <img src="/uniutils.svg" alt="" class="absolute w-[30vw] opacity-60 z-40">
        <h1 class="text-8xl text-title z-50">UniUtils</h1>
        <p class="text-3xl text-subheading z-50">Some helpful uni tools</p>
        <div class="flex gap-3 z-50">
            <NuxtLink to="/AuthPage" class="px-4 py-2 rounded-xl text-text text-center text-xl font-bold bg-gradient-to-br from-primary to-accent">Get Started</NuxtLink>
            <NuxtLink to="/about" class="px-4 py-2 rounded-xl text-text text-center text-xl font-bold bg-transparent border-2 border-transparent bg-clip-border" style="border-image: linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to)) 1;">Learn More</NuxtLink>
        </div>
    </div>
</template>