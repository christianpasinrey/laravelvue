<script setup>
import { Head, Link } from '@inertiajs/vue3';
import {ref,onBeforeMount, computed} from 'vue';
import Modal from '@/Components/Modal.vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import VueLogo from '@/Components/VueLogo.vue';
import MySqlLogo from '@/Components/MySqlLogo.vue';

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

const welcome = ref({
    spanish: false,
    catalan: false,
    galician: false,
    english: false,
});

const isRotating = ref(false);
const options = ref([
    {
        name: 'HTML',
        label: 'HTML',
        value: 1,
        classes: {
            'rotate' : isRotating.value,
            'bg-red-500 welcome-card-option' : true,
        },
    },
    {
        name: 'CSS',
        label: 'CSS',
        value: 2,
        classes: {
            'rotate' : isRotating.value,
            'bg-blue-500 welcome-card-option' : true,
        }
    },
    {
        name: 'JavaScript',
        label: 'JavaScript',
        value: 3,
        classes: {
            'rotate' : isRotating.value,
            'bg-yellow-500 welcome-card-option' : true,
        }
    },
    {
        name: 'PHP',
        label: 'PHP',
        value: 4,
        classes: {
            'rotate' : isRotating.value,
            'bg-purple-500 welcome-card-option' : true,
        }
    },
])

const showTechnologies = ref(false);

const selectedOption = ref(null);

const selectOption = (option) => {
    if(!option === null){
        isRotating.value = true;
    }
    setTimeout(() => {
        selectedOption.value = option;
        isRotating.value = false;
    }, 1000);
}

onBeforeMount(() => {
    const lang = navigator.language || navigator.userLanguage;
    if (lang.includes('es')) {
        welcome.value.spanish = true;
    } else if (lang.includes('ca')) {
        welcome.value.catalan = true;
    } else if (lang.includes('gl')) {
        welcome.value.galician = true;
    } else {
        welcome.value.english = true;
    }

    //change text every 2 seconds to simulate a carousel with all languages
    setInterval(() => {
        if (welcome.value.spanish) {
            welcome.value.spanish = false;
            welcome.value.catalan = true;
        } else if (welcome.value.catalan) {
            welcome.value.catalan = false;
            welcome.value.galician = true;
        } else if (welcome.value.galician) {
            welcome.value.galician = false;
            welcome.value.english = true;
        } else {
            welcome.value.english = false;
            welcome.value.spanish = true;
        }
    }, 3000);
    document.addEventListener('click', (event)=>{
        console.log(event);
        if(showTechnologies.value){
            let element = document.getElementById('welcome-container');
            console.log(element);
        }
    });
});
const showTechnologiesText = () => {
    showTechnologies.value = true;
    setTimeout(() => {
        document.addEventListener('click', (event)=>{
            event.target === document.getElementById('myVideo') ? showTechnologies.value = false : showTechnologies.value = true;
        });
    }, 1500);
}



</script>

<template>
    <Head title="Christian Pasín Rey" />
    <div
        class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white"
    >
        <video autoplay loop id="myVideo">
            <source src="storage/bg-video.webm" type="video/mp4">
        </video>
        <div v-if="canLogin" class="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
            <Link
                v-if="$page.props.auth.user"
                :href="route('dashboard')"
                class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >Dashboard</Link
            >

            <template v-else>
                <Link
                    :href="route('login')"
                    class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >Acceder</Link
                >

                <Link
                    v-if="canRegister"
                    :href="route('register')"
                    class="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >Registro</Link
                >
            </template>
        </div>
        <div class="flex flex-col w-full text-center"
            id="welcome-container"
            v-if="!showTechnologies">
            <div class="max-w-7xl mx-auto p-6 lg:p-8 relative flex gap-4">
                <div class="text-center">
                    <h1 class="carrousel-text" v-if="welcome.spanish">Bienvenido</h1>
                    <h1 class="carrousel-text" v-else-if="welcome.catalan">Benvigut</h1>
                    <h1 class="carrousel-text" v-else-if="welcome.galician">Benvido</h1>
                    <h1 class="carrousel-text" v-else-if="welcome.english">Welcome</h1>
                </div>
            </div>
            <div class="max-w-7xl mx-auto p-6 lg:p-8 relative flex gap-4">
                <div
                    :id="`option-${option.value}`"
                    :class="option.classes"
                    v-for="option in options"
                    :key="option.label"
                    @click.prevent="selectOption(option)"
                    >
                    <span class="welcome-card-option-text">{{option.label}}</span>
                </div>
            </div>
            <h2 class="text-white font-medium text-xl mb-3">TECNOLOGÍAS Y METODOLOGÍA</h2>
            <div
                @click.prevent="showTechnologiesText"
                class="max-w-7xl mx-auto py-2 lg:py-2 pl-2 pr-3 relative flex gap-4 w-fit bg-slate-200 rounded-md hover:scale-110 transition duration-700 cursor-pointer">
                <ApplicationLogo class="h-16 w-auto sm:h-[60px]" />
                <MySqlLogo class="h-10 w-auto sm:h-[50px] mt-1.5"/>
                <VueLogo class="h-10 w-auto sm:h-[50px] mt-1.5 -ml-3"/>
            </div>
        </div>
        <div
            class="flex flex-col text-center px-6 py-3 w-fit bg-slate-500 opacity-70 zoom-from-zero rounded-md ring-1 ring-slate-300 border-white"
            v-else>
            <h3 class="text-black font-bold text-3xl opacity-100 mb-6">TECNOLOGÍAS Y METODOLOGÍA</h3>
            <p class="font-medium text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl<br>
                aliquam nunc, vitae ultricies nisl nunc sit amet nunc. Nulla facilisi. Sed euismod, nisl eget ultricies ultrices,<br>
                nunc nisl aliquam nunc, vitae ultricies nisl nunc sit amet nunc. Nulla facilisi. Sed euismod, nisl eget ultricies<br>
                ultrices, nunc nisl aliquam nunc, vitae ultricies nisl nunc sit amet nunc. Nulla facilisi. Sed euismod, nisl eget<br>
            </p>
        </div>
    </div>

    <Modal @close="selectOption(null)" :show="selectedOption !== null">
        <div class="flex flex-row w-fit px-6 py-4">
            <span class="text-2xl font-semibold w-fit">{{selectedOption?.label}}</span>
        </div>
    </Modal>

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

    .carrousel-text{
        animation: fade 3s ease-in-out;
        -webkit-text-stroke: 1px white; /* Ancho del borde y color en navegadores WebKit (Chrome, Safari) */
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
        50% {
            opacity: 1
        }
        100% {
            opacity: 0
        }
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
