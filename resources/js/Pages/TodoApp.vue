<script>
import { defineComponent } from 'vue'
import BreezeAuthenticatedLayout from '@/Layouts/Authenticated.vue';
import { Head } from '@inertiajs/inertia-vue3';
export default defineComponent({
    data(){
        return{
            tasks:Array,
        }
    },
    components:{
        BreezeAuthenticatedLayout,
    },
    mounted() {
        this.tasks
    }
})
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
