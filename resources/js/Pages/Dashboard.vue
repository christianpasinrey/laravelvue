<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <transition>
                    <div
                        id="welcome-card"
                        class="bg-white rounded-md px-6 py-4 opacity-[0.6] relative">
                        <div class="front absolute">
                            <span class="opacity-[1]">Hola y bienvenido :D</span>
                        </div>
                        <div class="back absolute">
                            <span id="back-text" class="opacity-[1]">Hovered</span>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
<style scoped>
/* Estilos de tarjeta welcome card, posición ancho y alto estáticos, cursor */
#welcome-card {
    position: relative;
    width: 30vw;
    height: 10vh;
    background-color: #fff;
    cursor: pointer;
    transform-style: preserve-3d;
}
/* Estilos de textos contenidos dentro de la tarjeta
    posición absoluta ajustada
    transición en 0.7s
*/
.front, .back {
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: #000;
    transition: all 0.7s ease-in-out;}

/* Rotación de elemento .back al hover en elemento .front */

#welcome-card:hover .front {
    transform: rotateY(-180deg);
}
.back {
    transform: rotateY(180deg);
}
/* Si .back tiene el mouse sobre él (hover), no rotamos el elemento*/
#welcome-card:hover .back {
    transform: rotateY(0deg);
}

</style>
