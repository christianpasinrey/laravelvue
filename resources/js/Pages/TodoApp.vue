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
            task: {
                text: '',
                limit_date: '',
            },
        }
    },
    methods:{
        submit(){
            var newTask = {
                text: this.task.text,
                limit_date: this.task.limit_date,
            };
            axios.post('tasks',{
                text:newTask.text,
                limit_date:newTask.limit_date,
            }).then(response=>{
                this.tasks.push(newTask);
                this.task.text = '';
                this.task.limit_date = '';
                console.log(response.message);
            });
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
        <div class="grid gap-4 grid-cols-3 grid-rows-1">
            <form @submit.prevent="submit">
                <div class="inline-block">
                    <BreezeLabel for="text" value="Tarea" />
                    <BreezeInput id="text" type="text" class="mt-1 w-full" v-model="task.text" required autofocus autocomplete="text" />
                </div>
                <div class="inline-block">
                    <BreezeLabel for="limit_date" value="Fecha límite" />
                    <BreezeInput id="limit_date" type="date" class="mt-1 w-full" v-model="task.limit_date" required autofocus autocomplete="limit_date" />
                </div>
                <div class="inline-block">
                    <BreezeButton class="ml-4" :class="{ 'opacity-25': task.processing }" :disabled="task.processing">
                        Añadir
                    </BreezeButton>
                </div>
            </form>
        </div>
        <table class="table-auto">
            <thead>
                <tr>
                    <th>Tarea</th>
                    <th>Id de usuario</th>
                    <th>Fecha límite</th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="task in tasks" :key="task.id">
                    <td>{{task.text}}</td>
                    <td>{{task.user_id}}</td>
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
td{
    text-align: center;
}
</style>
