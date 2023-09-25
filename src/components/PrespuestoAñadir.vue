<script setup>
    import {ref,reactive,watch,computed,onMounted} from 'vue'
    const presupuesto = ref(0)
    import Alerta from './Alerta.vue'
    import iconoCerar from '../assets/img/cerrar.svg'

    const props = defineProps({
        modalPresupuesto:{
            type:Object,
            required:true
        },
    })
    const emit =defineEmits(['sumar-presupuesto','ocultarModalPresupuesto'])
    const error = ref('')

    const añadirPresupuesto = ()=>{
        if(presupuesto.value <=0 || presupuesto.value === ''){
            error.value = "Presupuesto no válido"
            setTimeout(() =>{
                error.value = ''
            },2500)

            return 
        }
        emit('sumar-presupuesto',presupuesto.value)
    }
</script>

<template>
    <div class="modal">
        <!-- X para cerrar el modal y convertir modal.animar en false -->
        <div class="cerrar-modal">
            <img :src="iconoCerar" 
            alt="Icono cerrar"
            @click="$emit('ocultarModalPresupuesto')"
            >
        </div>
        <!-- Clase dincamica con un operador terceario  -->
        <div 
        class="contenedor contenedor-formulario"
        :class="[modalPresupuesto.animar ? 'animar' : 'cerrar']"
        >

            <form
            class="nuevo-gasto"
            @submit.prevent="añadirPresupuesto"
            >
               <!-- Slot -->
            <Alerta
            v-if="error">
                {{ error }}
            </Alerta>
            <div class="campo">
                <label for="presupuesto">Definir Presupuesto</label>
                <input 
                class="nuevo-presupuesto" 
                id="nuevo-presupuesto"
                placeholder="Añade tu presupuesto"
                type="number"
                min="0"
                v-model="presupuesto"
                >
                <input type="submit" value="Añadir Más Prespuesto">
            </div>
            </form>
        </div>
    </div>
</template>

<style scoped>

    .modal{
        position: absolute;
        background-color: rgba(37, 48, 54, 0.9);
        top: 0;
        right: 0;
        left:0;
        bottom: 0;
    }
    .cerrar-modal {
        position: absolute;
        right: 3rem;
        top: 3rem;
    }
    .cerrar-modal img{
        width: 3rem;
        cursor: pointer;
    }
    /* Animación de la opacidad del fondo  */
    .contenedor-formulario{
        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: ease-in;
        opacity: 0;
    }
    /* Seleccionar dos clases  clase1.clase2*/
    /* Si modal.animar true */
    .contenedor-formulario.animar{
        opacity: 1;
    }
    /* Si modal.animar false */
    .contenedor-formulario.cerrar{
        opacity: 0;
    }
    .nuevo-gasto{
        margin: 10rem auto 0 auto;
        display: grid;
        gap: 2rem;
        
    }
    .nuevo-gasto legend{
        text-align: center;
        color: var(--blanco);
        font-size: 3rem;
        font-weight: 700;
    }
    .campo {
        display: grid;
     
        gap: 2rem;
    }
    .nuevo-gasto input,
    .nuevo-gasto select {
        background-color: var(--gris-claro);
        border-radius: 1rem;
        padding: 1rem;
        border: none;
        font-size: 2.2rem;
    }
    .nuevo-gasto input.obligatorio{
        border-color: brown;
       
    }
    .nuevo-gasto label{
        color: var(--blanco);
        font-size: 3rem;
    }
    .nuevo-gasto input[type="submit"]{
        background-color: var(--azul);
        color: var(--blanco);
        font-weight: 700;
        cursor: pointer; 
    }
    .btn-eliminar{
        padding: 1rem;
        width: 100%;
        background-color: #ef4444;
        font-weight: 700;
        font-size: 1.2rem;
        color: var(--blanco);
        margin-top: 10rem;
        border: none;
        cursor: pointer;
    }
</style>