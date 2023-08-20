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
const about = ref({
    spanish:{
        html:'<p> Mi pasión por el desarrollo web nació en el año 2019, cuando aprendí a crear páginas web con HTML y PHP. Desde entonces, no he parado de aprender y mejorar mis habilidades, usando herramientas como Laravel, Vue y Node.js, entre otras.</p></p><p>Si quieres saber más sobre mi trabajo o contactar conmigo, no dudes en visitar mi <a href=“1”>portfolio</a> o enviarme un <a href=“#contact”>mensaje</a>. Estaré encantado de atenderte 😊</p>',
        showing: false,
    },
    catalan:{
        html:'<p>Benvingut/da al meu lloc web, on pots conèixer més sobre mi i el meu treball com a <strong>desenvolupador web</strong>. La meva passió pel desenvolupament web va néixer l’any 2019, quan vaig aprendre a crear pàgines web amb HTML i PHP. Des de llavors, no he parat d’aprendre i millorar les meves habilitats, usant eines com Laravel, Vue i Node.js, entre d’altres.</p><p>Laravel és un framework que m’ajuda a crear aplicacions web de forma ràpida i eficaç, seguint l’arquitectura MVC. MVC és una forma d’organitzar el codi en tres parts: model (que gestiona les dades), vista (que mostra les dades a l’usuari) i controlador (que comunica el model i la vista).</p><p>Vue és un framework que em permet crear interfícies d’usuari dinàmiques i reactives, usant components reutilitzables i fàcils de mantenir. Node.js és un entorn que em permet crear aplicacions web escalables i eficients, usant JavaScript al costat del servidor.</p><p>També tinc experiència en crear APIs amb Node.js, que són interfícies que permeten la comunicació entre diferents sistemes o aplicacions. Així puc distribuir les dades als clients d’una forma segura i eficient.</p><p>Actualment tinc 3 anys d’experiència desenvolupant amb Laravel, actualment amb la versió 10, i Vue, havent jugat amb React, QwikJS, Svelte i algun que altre framework basat en JavaScript. Em considero un professional en continu desenvolupament, que gaudeix del que ja sap i del que segueix aprenent dia a dia. M’encanta enfrontar-me a nous reptes i projectes que em permetin créixer com a desenvolupador web.</p><p>Si vols saber més sobre el meu treball o contactar amb mi, no dubtis a visitar el meu <a href=“1”>portfolio</a> o enviar-me un <a href=“#contact”>missatge</a>. Estaré encantat d’atendre’t 😊</p>',
        showing: false,
    },
    galician:{
        html: '<p>Benvido/a ao meu sitio web, onde podes coñecer máis sobre min e o meu traballo como <strong>desenvolvedor web</strong>. A miña paixón polo desenvolvemento web naceu no ano 2019, cando aprendín a crear páxinas web con HTML e PHP. Dende entón, non parei de aprender e mellorar as miñas habilidades, usando ferramentas como Laravel, Vue e Node.js, entre outras.</p<p>Laravel é un framework que me axuda a crear aplicacións web de forma rápida e eficaz, seguindo a arquitectura MVC. MVC é unha forma de organizar o código en tres partes: modelo (que xestiona os datos), vista (que mostra os datos ao usuario) e controlador (que comunica o modelo e a vista).</p><p>Vue é un framework que me permite crear interfaces de usuario dinámicas e reactivas, usando compoñentes reutilizables e fáciles de manter. Node.js é un entorno que me permite crear aplicacións web escalables e eficientes, usando JavaScript no lado do servidor.</p><p>Tamén teño experiencia en crear APIs con Node.js, que son interfaces que permiten a comunicación entre diferentes sistemas ou aplicacións. Así podo distribuír os datos aos clientes dunha forma segura e eficiente.</p><p>Actualmente teño 3 anos de experiencia desenvolvendo con Laravel, actualmente coa versión 10, e Vue, tendo xogado con React, QwikJS, Svelte e algún que outro framework baseado en JavaScript. Considérome un profesional en continuo desenvolvemento, que goza do que xa sabe e do que segue aprendendo día a día. Encántanme os novos retos e proxectos que me permiten crecer como desenvolvedor web.</p><p>Se queres saber máis sobre o meu traballo ou contactar comigo, non dubides en visitar o meu <a href=“1”>portfolio</a> ou enviarme unha <a href=“#contact”>mensaxe</a>. Estarei encantado de atenderte 😊</p>',
        showing: false,
    },
    english:{
        html: '<p>Welcome to my website, where you can learn more about me and my work as a <strong>web developer</strong>. My passion for web development was born in 2019, when I learned to create web pages with HTML and PHP. Since then, I have not stopped learning and improving my skills, using tools such as Laravel, Vue and Node.js, among others.</p><p>Laravel is a framework that helps me create web applications quickly and effectively, following the MVC architecture. MVC is a way of organizing the code into three parts: model (which manages the data), view (which shows the data to the user) and controller (which communicates the model and the view).</p><p>Vue is a framework that allows me to create dynamic and reactive user interfaces, using reusable and easy-to-maintain components. Node.js is an environment that allows me to create scalable and efficient web applications, using JavaScript on the server side.</p><p>I also have experience in creating APIs with Node.js, which are interfaces that allow communication between different systems or applications. This way I can distribute the data to the clients in a secure and efficient way.</p><p>I currently have 3 years of experience developing with Laravel, currently with version 10, and Vue, having played with React, QwikJS, Svelte and some other framework based on JavaScript. I consider myself a professional in continuous development, who enjoys what he already knows and what he continues to learn every day. I love facing new challenges and projects that allow me to grow as a web developer.</p><p>If you want to know more about my work or contact me, do not hesitate to visit my <a href=“1”>portfolio</a> or send me a <a href=“#contact”>message</a>. I will be happy to assist you 😊</p>',
        showing: false,
    },
})

const langs = ref({
    spanish:{
        name: 'Español',
        //svg flag
        flag: '',
        showing: true,
    },
    catalan:{
        name: 'Català',
        //svg flag
        flag: '',
        showing: false,
    },
    galician:{
        name: 'Galego',
        //svg flag
        flag: '',
        showing: false,
    },
    english:{
        name: 'English',
        //svg flag
        flag: '',
        showing: false,
    },
})

const showingWelcomeLanguage = computed(() => {
    return Object.keys(welcome.value).map(lang => {
        return welcome.value[lang];
    }).filter(lang => lang.showing);
});

const showingAboutLanguage = computed(() => {
    //check lang in langs with showing true and return the same language in about
    return Object.keys(langs.value).filter(lang => {
        return langs.value[lang].showing;
    }).map(lang => {
        return about.value[lang];
    });
});
const changeLang = (langName) => {
    Object.keys(langs.value).forEach(lang =>{
        return langs.value[lang].name === langName ? langs.value[lang].showing = true : langs.value[lang].showing = false;
    });
}
const windowHeigh = computed(() => {
    //return the height of the screen
    return document.documentElement.clientHeight;
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
        about.value.spanish.showing = true;
    } else if (lang.includes('ca')) {
        welcome.value.catalan.showing = true;
        about.value.catalan.showing = true;
    } else if (lang.includes('gl')) {
        welcome.value.galician.showing = true;
        about.value.galician.showing = true;
    } else {
        welcome.value.english.showing = true;
        about.value.english.showing = true;
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
        <section id="about"
            class="w-8/12 flex flex-col justify-center text-center items-center content-center mx-auto relative z-[1000]"
            :style="{
                height: windowHeigh + 'px'
            }"
        >
            <div class="flex flex-row flex-wrap gap-4 mb-4">
                <button
                    :class="{
                        'bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900': lang.showing,
                        'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100': !lang.showing
                    }"
                    class="border rounded-md p-2"
                    @click.prevent="changeLang(lang.name)"
                    v-for="lang in langs"
                    :key="lang.name">
                    {{ lang.name }}
                </button>
            </div>
            <div class="text-center about-me-text"
                v-for="text in showingAboutLanguage"
                :key="text.html">
                <div v-html="text.html"
                    class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 about-text"
                ></div>
            </div>
        </section>
        <section id="skills"
            class="w-full flex flex-col justify-center"
            :style="{
                height: windowHeigh + 'px'
            }"
        >
            <div class="max-w-7xl mx-auto p-6 lg:p-8 relative flex gap-4">

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
        <section id="footer"
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

    .about-me-text{
        animation: fade-in 2s ease-in-out;
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

    @keyframes fade-in {
        0% {
            opacity: 0
        }
        100% {
            opacity: 1
        }
    }

    @keyframes fade-out {
        0% {
            opacity: 1
        }
        100% {
            opacity: 0
        }
    }
</style>

