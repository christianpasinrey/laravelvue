<script setup>
import { ref,computed,onMounted } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import { useRouter, useRoute } from 'vue-router';
import { AnimatedCharacter } from '@/canvas';


const router = useRouter();
const r = useRoute();
const character = ref(null);

defineProps({
    canLogin: {
        type: Boolean,
    },
    canRegister: {
        type: Boolean,
    },
    laravelVersion: {
        type: String,
        required: true,
    },
    phpVersion: {
        type: String,
        required: true,
    },
});

const scrollToSection = (section) => {
    const contactSection = document.getElementById(section);
    window.scrollTo({
        top: contactSection.offsetTop,
        behavior: 'smooth'
    });
}
const windowHeigh = computed(() => {
    //return the height of the screen
    return document.documentElement.clientHeight;
});
const windowWidth = computed(() => {
    //return the width of the screen
    return document.documentElement.clientWidth;
});
onMounted(() => {
    router.push('/welcome');
    character.value = new AnimatedCharacter('run','000');
    character.value.draw();
    character.value.update();
})
</script>

<template>
    <Head title="Christian Pasín Rey" />
    <div
        class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center dark:bg-dots-lighter bg-slate-200 dark:bg-gray-900 selection:bg-red-500 selection:text-white"
    >
        <div class="flex flex-row fixed top-0 left-0 w-full justify-between px-4 md:px-6 py-6 z-[1000]"
        :class="{
            'bg-slate-600' : windowWidth <= 400,
        }"
        >
            <div class="bg-slate-100 dark:bg-slate-500 rounded-md px-2">
                <router-link
                    to="/welcome"
                    class="font-semibold  rounded-md text-gray-900 hover:text-gray-900 dark:text-gray-900 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >Inicio
                </router-link>
                <span
                    @click.prevent="scrollToSection('contact-section')"
                    id="scroll-to-contact-section"
                    class="ml-4 font-semibold text-gray-900 hover:text-gray-900 dark:text-gray-900 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 cursor-pointer"
                    >Contacto
                </span>
            </div>
            <div class="flex flex-row bg-slate-100 dark:bg-slate-500 rounded-md px-2">
                <Link
                    :href="route('login')"
                    class="font-semibold text-gray-900 hover:text-gray-900 dark:text-gray-900 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >Acceder
                </Link>
            </div>
        </div>
        <router-view></router-view>
        <canvas id="canvas" class="hidden lg:block"></canvas>
    </div>
</template>

<style scoped>

</style>
