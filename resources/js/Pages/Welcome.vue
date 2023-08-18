<script setup>
import { ref,onMounted } from 'vue';
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

onMounted(() => {
    router.push('/welcome');
    character.value = new AnimatedCharacter(100,0,100,50,'run','000');
    character.value.draw();
    character.value.update();
})
</script>

<template>
    <Head title="Christian Pasín Rey" />
    <div
        class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white"
    >
        <video autoplay loop id="myVideo">
            <source src="storage/video/bg-video.webm" type="video/mp4">
        </video>
        <div class="flex flex-row absolute top-0 left-0 w-full justify-between sm:px-2 md:px-6 py-6 z-90">
            <div class="bg-slate-100 dark:bg-slate-500 rounded-md px-2">
                <router-link
                    to="/welcome"
                    class="font-semibold  rounded-md text-gray-900 hover:text-gray-900 dark:text-gray-900 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >Inicio
                </router-link>
                <router-link
                    to="/about"
                    class="ml-4 font-semibold text-gray-900 hover:text-gray-900 dark:text-gray-900 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >Sobre mí
                </router-link>
            </div>
            <div class="flex flex-row bg-slate-100 dark:bg-slate-500 rounded-md px-2">
                <Link
                    :href="route('login')"
                    class="font-semibold text-gray-900 hover:text-gray-900 dark:text-gray-900 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >Acceder</Link
                >

                <Link
                    v-if="canRegister"
                    :href="route('register')"
                    class="ml-4 font-semibold text-gray-900 hover:text-gray-900 dark:text-gray-900 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >Registro</Link
                >
            </div>
        </div>
        <canvas id="canvas"></canvas>
        <router-view></router-view>

    </div>
</template>

<style scoped>
    #myVideo{
        position: fixed;
        height:100%;
        width:100%;
        left: 0;
        top: 0;
        object-fit: cover;
        opacity: 0.3;
    }
</style>
