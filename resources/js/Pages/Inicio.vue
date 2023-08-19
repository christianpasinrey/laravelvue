<script setup>
import { Head, Link } from '@inertiajs/vue3';
import {ref,onBeforeMount, computed, onMounted} from 'vue';
import { AnimatedCharacter } from '@/canvas';

const welcome = ref({
    spanish: {
        title: 'Bienvenido',
        text: 'Soy <strong>Christian Pasín Rey</strong>, desarrollador web full-stack.<br> Bienvenido a mi web personal.',
        button: 'Saber más',
        showing: false,
    },
    catalan: {
        title: 'Benvingut',
        text: 'Sóc <strong>Christian Pasín Rey</strong>, desenvolupador web full-stack.<br> Benvingut a la meva web personal.',
        button: 'Saber més',
        showing: false,
    },
    galician: {
        title: 'Benvido',
        text: 'Son <strong>Christian Pasín Rey</strong>, desenvolvedor web full-stack.<br> Benvido á miña web persoal.',
        button: 'Saber máis',
        showing: false,
    },
    english: {
        title: 'Welcome',
        text: 'I am <strong>Christian Pasín Rey</strong>, full-stack web developer.<br> Welcome to my personal website.',
        button: 'Learn more',
        showing: false,
    },
});

const showingWelcomeLanguage = computed(() => {
    return Object.keys(welcome.value).map(lang => {
        return welcome.value[lang];
    }).filter(lang => lang.showing);
});
const windowHeigh = computed(() => {
    return window.innerHeight;
});

const changeWelcomeLanguage = () => {
    setInterval(() => {
        switch(true) {
            case welcome.value.spanish.showing:
                welcome.value.spanish.showing = false;
                welcome.value.catalan.showing = true;
                break;
            case welcome.value.catalan.showing:
                welcome.value.catalan.showing = false;
                welcome.value.galician.showing = true;
                break;
            case welcome.value.galician.showing:
                welcome.value.galician.showing = false;
                welcome.value.english.showing = true;
                break;
            case welcome.value.english.showing:
                welcome.value.english.showing = false;
                welcome.value.spanish.showing = true;
                break;
        }
    }, 5000);
};

onBeforeMount(() => {
    const lang = navigator.language || navigator.userLanguage;
    if (lang.includes('es')) {
        welcome.value.spanish.showing = true;
    } else if (lang.includes('ca')) {
        welcome.value.catalan.showing = true;
    } else if (lang.includes('gl')) {
        welcome.value.galician.showing = true;
    } else {
        welcome.value.english.showing = true;
    }

    changeWelcomeLanguage();
});



</script>
<template>
    <div class="flex flex-col w-full text-center zoom-from-zero"
        id="welcome-container">
        <section class="w-full flex flex-col justify-center"
            :style="{
                height: windowHeigh + 'px'
            }"
        >
            <div class="text-center" v-for="message in showingWelcomeLanguage" :key="message.text">
                <h1 class="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4 carrousel-text">
                    {{message.title}}
                </h1>
                <p class="carrousel-message text-xl" v-html="message.text"></p>
            </div>
        </section>
        <section id="contact"
            class="w-full flex flex-col justify-center"
            :style="{
                height: windowHeigh + 'px'
            }"
        >
            <div class="max-w-7xl mx-auto p-6 lg:p-8 relative flex gap-4">

            </div>
        </section>
    </div>
</template>
<style scoped>
    .carrousel-text{
        animation: fade 3s ease-in-out;
        -webkit-text-stroke: 1px white; /* Ancho del borde y color en navegadores WebKit (Chrome, Safari) */
    }
    .carrousel-message{
        animation: fade 3s ease-in-out;
    }
    .zoom-from-zero{
        animation: zoom 1s ease-in-out;
    }

    @keyframes zoom {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes fade {
        0% {
            opacity: 0
        }
        25% {
            opacity: 0.5
        }
        50% {
            opacity: 1
        }
        75% {
            opacity: 0.5
        }
        100% {
            opacity: 0
        }
    }

    @keyframes rotate {
        0% {
            transform: rotateY(0deg);
        }
        100% {
            transform: rotateY(360deg);
        }
    }
</style>

