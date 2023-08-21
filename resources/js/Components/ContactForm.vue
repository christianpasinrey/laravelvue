<script setup>
    import { ref, computed, onBeforeMount } from 'vue';
    import { useForm } from '@inertiajs/vue3';
    import { useToast } from 'vue-toast-notification';

    const toast = useToast();

    const props = defineProps(['lang']);

    const form = useForm({
        name: '',
        guest_email: '',
        subject: '',
        message: '',
    });

    const fieldsInLanguages = ref({
        spanish: {
            name: 'Nombre',
            email: 'Email',
            subject: 'Asunto',
            message: 'Mensaje',
            action: 'Enviar',
        },
        catalan: {
            name: 'Nom',
            email: 'Email',
            subject: 'Assumpte',
            message: 'Missatge',
            action: 'Enviar',
        },
        galician: {
            name: 'Nome',
            email: 'Email',
            subject: 'Asunto',
            message: 'Mensaxe',
            action: 'Enviar',
        },
        english: {
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message',
            action: 'Send',
        },
    });

    const messageSentText = ref({
        spanish: 'Mensaje enviado correctamente',
        catalan: 'Missatge enviat correctament',
        galician: 'Mensaxe enviado correctamente',
        english: 'Message sent correctly',
    });

    const sendForm = () => {
        form.post(route('contact-messages.store'),{
            preserveScroll: true,
            onSuccess: () => {
                toast.success(messageSentLang.value, {
                    position: 'top-right',
                    duration: 5000,
                });
                form.reset();
            },
            onError: () => {
                console.log('error');
            },
        });
    };

    const messageSentLang = computed(()=>{
        return messageSentText.value[props.lang];
    });

</script>
<template>
    <div class="px-8 pt-8 bg-slate-300 shadow-lg w-full rounded-xl form-box">
        <form @submit.prevent="sendForm" class="w-full">
            <div class="grid grid-cols-12 gap-4">
                <div class="mb-3 text-left col-span-12 lg:col-span-6">
                    <label for="name" class="form-label">{{ fieldsInLanguages[props.lang].name }}</label>
                    <input type="text"
                        class="rounded border-2 border-gray-200 focus:border-blue-400 transition-all duration-500 ease-in-out w-full"
                        id="name"
                        v-model="form.name"
                        required>
                </div>
                <div class="mb-3 text-left col-span-12 lg:col-span-6">
                    <label for="guest_email" class="form-label">{{ fieldsInLanguages[props.lang].email }}</label>
                    <input type="email"
                        class="rounded border-2 border-gray-200 focus:border-blue-400 transition-all duration-500 ease-in-out w-full"
                        id="guest_email"
                        v-model="form.guest_email"
                        required>
                </div>
                <div class="mb-3 text-left col-span-12">
                    <label for="subject" class="form-label">{{ fieldsInLanguages[props.lang].subject }}</label>
                    <input type="text"
                    class="rounded border-2 border-gray-200 focus:border-blue-400 transition-all duration-500 ease-in-out w-full"
                    id="subject"
                    v-model="form.subject"
                    required>
                </div>
                <div class="text-left col-span-12">
                    <label for="message" class="form-label">{{ fieldsInLanguages[props.lang].message }}</label>
                    <textarea
                        class="rounded border-2 border-gray-200 focus:border-blue-400 transition-all duration-500 ease-in-out w-full"
                        id="message"
                        rows="5"
                        v-model="form.message"
                        required>
                    </textarea>
                </div>
                <div class="my-8 col-span-12 text-end">
                    <button type="submit"
                        :disabled="form.processing"
                        class="internal-shadow-as-button-3d-curvature rounded bg-slate-100 border-md hover:bg-slate-600 hover:text-white hover:scale-95 shadow-md transition-all duration-500 ease-in-out px-4 py-1 text-2xl">
                        {{ !form.processing ? fieldsInLanguages[props.lang].action : '...' }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped>
    .internal-shadow-as-button-3d-curvature{
        /* add a shadow inside the element simulating a 3d effect */
        box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
    }
    .internal-shadow-as-button-3d-curvature:hover{
        /* change the shadow to light gray */
        box-shadow: inset 0 0 5px rgba(243, 235, 235, 0.66);
    }

</style>
