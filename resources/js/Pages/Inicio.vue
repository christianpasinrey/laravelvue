<script setup>
import { Head, Link } from '@inertiajs/vue3';
import {ref,onBeforeMount, computed, onMounted} from 'vue';
import ContactForm from '@/Components/ContactForm.vue';

const welcome = ref({
    spanish: {
        title: 'Bienvenido',
        text: 'Soy <strong>Christian Pasín Rey</strong>,<br> desarrollador web full-stack.',
        button: 'Saber más',
        showing: false,
    },
    catalan: {
        title: 'Benvingut',
        text: 'Sóc <strong>Christian Pasín Rey</strong>,<br> desenvolupador web full-stack..',
        button: 'Saber més',
        showing: false,
    },
    galician: {
        title: 'Benvido',
        text: 'Son <strong>Christian Pasín Rey</strong>,<br> desenvolvedor web full-stack.',
        button: 'Saber máis',
        showing: false,
    },
    english: {
        title: 'Welcome',
        text: 'I am <strong>Christian Pasín Rey</strong>,<br> full-stack web developer.',
        button: 'Learn more',
        showing: false,
    },
});
const about = ref({
    spanish:{
        html:'<p> Mi pasión por el desarrollo web nació en el año 2019, cuando aprendí a crear páginas web con HTML y PHP. Desde entonces, no he parado de aprender y mejorar mis habilidades, usando herramientas como Laravel, Vue y Node.js, entre otras.</p><p>Si quieres saber más sobre mi trabajo o contactar conmigo, no dudes en enviarme un <a href=“#contact”>mensaje</a>. Estaré encantado de atenderte 😊</p>',
        showing: false,
    },
    catalan:{
        html:'<p>La meva passió pel desenvolupament web va néixer l’any 2019, quan vaig aprendre a crear pàgines web amb HTML i PHP. Des de llavors, no he parat d’aprendre i millorar les meves habilitats, usant eines com Laravel, Vue i Node.js, entre d’altres.</p><p>Si vols saber més sobre el meu treball o contactar amb mi, no dubtis a enviar-me un <a href=“#contact”>missatge</a>. Estaré encantat d’atendre’t 😊</p>',
        showing: false,
    },
    galician:{
        html: '<p>A miña paixón polo desenvolvemento web naceu no ano 2019, cando aprendín a crear páxinas web con HTML e PHP. Dende entón, non parei de aprender e mellorar as miñas habilidades, usando ferramentas como Laravel, Vue e Node.js, entre outras.</p<p>Se queres saber máis sobre o meu traballo ou contactar comigo, non dubides en enviarme unha <a href=“#contact”>mensaxe</a>. Estarei encantado de atenderte 😊</p>',
        showing: false,
    },
    english:{
        html: '<p>My passion for web development was born in 2019, when I learned to create web pages with HTML and PHP. Since then, I have not stopped learning and improving my skills, using tools such as Laravel, Vue and Node.js, among others.</p><p>If you want to know more about my work or contact me, do not hesitate to send me a <a href=“#contact”>message</a>. I will be happy to assist you 😊</p>',
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

const selectedLanguage = computed(()=>{
    //return the language key of the language of the about section
    return Object.keys(langs.value).filter(lang => {
        return langs.value[lang].showing;
    })[0].toString();
})

const changeLang = (langName) => {
    Object.keys(langs.value).forEach(lang =>{
        return langs.value[lang].name === langName ? langs.value[lang].showing = true : langs.value[lang].showing = false;
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

onMounted(()=>{
    //make the div with class zoom-from-zero dissapear fading-out if the distance to top screen is less than 100px
    window.addEventListener('scroll', () => {
        let welcomeSection = document.getElementById('welcome-section');
        let aboutSection = document.getElementById('about-section');
        let skillsSection = document.getElementById('skills-section');
        let contactSection = document.getElementById('contact-section');

        const elements = [
            {
                element: welcomeSection,
                distance: -50,
            },
            {
                element: aboutSection,
                distance: -100,
            },
            {
                element: skillsSection,
                distance: -400,
            },
        ]

        elements.forEach(element => {
            element.element.getBoundingClientRect().top < element.distance ?
            element.element.classList.add('opacity-0','transition-all','duration-700') :
            element.element.classList.remove('opacity-0','transition-all','duration-700');
        });
    });
})

</script>
<template>
    <div class="flex flex-col w-full text-center zoom-from-zero"
        id="welcome-container">
        <section class="w-full flex flex-col justify-center relative h-screen rounded-md px-1 md:px-12 items-center content-center"
            id="welcome-section"
        >
            <div class="absolute z-90 top-[40%] lg:left-[60%]"
                :class="{
                    'bg-slate-700 rounded-md p-2' : windowWidth < 400,
                }"
                v-for="message in showingWelcomeLanguage" :key="message.text">
                <h1 class="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4 carrousel-text">
                    {{message.title}}
                </h1>
                <p class="carrousel-message text-xl text-gray-50" v-html="message.text"></p>
            </div>
            <video autoplay loop class="rounded-md"
                :style="{
                    height:  windowWidth < 400 ? '100%' : 'auto',
                    width: '100%',
                    objectFit: 'cover',
                    marginTop: windowWidth < 400 ? '60px' : '0',
                }"
            >
                <source src="storage/video/bg-video.webm" type="video/mp4">
            </video>
        </section>
        <section
            id="about-section"
            class="w-full md:w-8/12 flex flex-col justify-center text-center items-center content-center mx-auto relative"
            :style="{
                height: windowHeigh + 'px'
            }"
        >
            <div class="flex flex-row flex-wrap gap-4 mb-4"
                :class="{
                    'mb-12' : windowWidth < 400,
                }"
            >
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
            <div class="text-center about-me-text px-4 md:px-0"
                v-for="text in showingAboutLanguage"
                :key="text.html">
                <div v-html="text.html"
                    class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 about-text"
                ></div>
            </div>
        </section>
        <section
            id="skills-section"
            class="w-full flex flex-col justify-center"
            :style="{
                height: windowHeigh + 'px'
            }"
        >
            <div class="max-w-7xl mx-auto p-6 lg:p-8 relative flex gap-4">

            </div>
        </section>
        <section
            id="contact-section"
            class="w-full flex flex-col justify-center"
            :style="{
                height: windowHeigh + 'px'
            }"
        >
            <div class="w-full md:w-8/12 justify-center mx-auto p-6 lg:p-8 relative flex gap-4 mt-16">
                <ContactForm
                    :lang="selectedLanguage"
                />
            </div>
        </section>
        <section
            id="footer-section"
            class="w-full flex flex-col justify-center"
        >
            <footer class="flex flex-wrap justify-between py-4 md:px-6">
                <div class="w-full md:w-auto md:pr-4 mb-4 md:mb-0">
                    <p>Christian Pasín Rey</p>
                    <p>+34 622 35 96 35</p>
                    <p>contacto@christianpasinrey.es</p>
                </div>
                <div class="w-full md:w-auto md:pr-4 mb-4 md:mb-0"></div>
                <div class="w-full md:w-auto">
                    <!-- Aquí puedes agregar tu imagen o logo -->
                </div>
            </footer>
        </section>
    </div>
</template>
<style scoped>
    /* when screen is small, make video cover all screen */
    .carrousel-text{
        animation: fade 3s ease-in-out;
        -webkit-text-stroke: 1px white;
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

