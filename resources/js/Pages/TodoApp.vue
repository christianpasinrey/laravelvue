<script>
import { defineComponent } from 'vue'
import BreezeAuthenticatedLayout from '@/Layouts/Authenticated.vue';
import BreezeButton from '@/Components/Button.vue';
import BreezeCheckbox from '@/Components/Checkbox.vue';
import BreezeInput from '@/Components/Input.vue';
import BreezeLabel from '@/Components/Label.vue';
import BreezeValidationErrors from '@/Components/ValidationErrors.vue';
import { Head, Link, useForm } from '@inertiajs/inertia-vue3';
import axios from 'axios';
export default defineComponent({
    components: {
        BreezeAuthenticatedLayout,
        BreezeButton,
        BreezeCheckbox,
        BreezeInput,
        BreezeLabel,
        BreezeValidationErrors,
        Head,
        Link,
    },
    data(){
        return{
            tasks:[],
            task: useForm({
                text: '',
                limit_date: '',
            }),
        }
    },
    methods:{
        submit(){
            this.task.post(route('tasks'), {
                onFinish: () => task.reset('text', 'limit_date'),
            })
        }
    },
    mounted(){
        this.tasks = axios.get('tasks')
        .then(response => {
            this.tasks = response.data
        }).catch({
            error: 'Error fetching tasks'
        })
    },
});
</script>

<template>
    <Head title="Todo-App" />
    <BreezeAuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Todo-App
            </h2>
        </template>
        <table class="table-auto">
            <thead>
                <tr>
                    <th>Tarea</th>
                    <th>Estado</th>
                    <th>Fecha límite</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <form @submit.prevent="submit">
                    <td>
                        <div>
                            <BreezeLabel for="text" value="Tarea" />
                            <BreezeInput id="text" type="text" class="mt-1 block w-full" v-model="task.text" required autofocus autocomplete="text" />
                        </div>
                    </td>
                    <td>
                        <div>
                            <BreezeLabel for="limit_date" value="Fecha límite" />
                            <BreezeInput id="limit_date" type="date" class="mt-1 block w-full" v-model="task.limit_date" required autofocus autocomplete="limit_date" />
                        </div>
                    </td>
                    <td>
                        <div class="flex items-center justify-end mt-4">
                            <BreezeButton class="ml-4" :class="{ 'opacity-25': task.processing }" :disabled="task.processing">
                                Añadir
                            </BreezeButton>
                        </div>
                    </td>
                    </form>
                </tr>
                <tr v-for="task in tasks" :key="task.id">
                    <td>{{task.text}}</td>
                    <td>{{task.status}}</td>
                    <td>{{task.limit_date}}</td>
                </tr>
            </tbody>
        </table>
    </BreezeAuthenticatedLayout>
</template>
<style>
th{
    width: 100vh;
    border-top: solid grey 1px;
    border-bottom: solid grey 1px;
}
tr{
    border-bottom: solid grey 1px;
}
</style>
