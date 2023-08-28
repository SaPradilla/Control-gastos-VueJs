<script setup>
    import iconoCerar from '../assets/img/cerrar.svg'
    import Alerta from './Alerta.vue';
    import {ref} from 'vue'

    const error = ref('')

    const emit = defineEmits(['ocultarModal','guardarGasto','update:nombre','update:cantidad','update:categoria'])
    
    const props = defineProps({
        modal:{
            type:Object,
            required:true
        },
        nombre:{
            type:String,
            required:true
        },
        cantidad:{
            type:[String,Number],
            required:true
        },
        categoria:{
            type:String,
            required:true
        }, 
        disponible:{
            type:Number,
            required:true
        }
    })

    const agregarGasto = ()=>{
        // validar que todos los campos tengan algo
        const {cantidad,categoria,nombre,disponible} = props
        if([cantidad,categoria,nombre].includes('')){
            error.value = 'Todos los campos son obligatorios'
        
            setTimeout(() =>{
                error.value = ''
            },3000)

            return
        }
        // validar cantidad
        if (cantidad <= 0 ){
            error.value = 'Cantidad no válida'
            setTimeout(() =>{
                error.value = ''
            },3000)
            return
        }
        // Validar un consumista xdd
        if (cantidad > disponible ){
            error.value = 'Has excedido el Prespuesto'
            setTimeout(() =>{
                error.value = ''
            },3000)
            return
        }

        emit('guardarGasto')
    }

</script>

<template>
    <div class="modal">
        <!-- X para cerrar el modal y convertir modal.animar en false -->
        <div class="cerrar-modal">
            <img :src="iconoCerar" 
            alt="Icono cerrar"
            @click="$emit('ocultarModal')"
            >
        </div>
        <!-- Clase dincamica con un operador terceario  -->
        <div 
        class="contenedor contenedor-formulario"
        :class="[modal.animar ? 'animar' : 'cerrar']"
        >

            <form
            class="nuevo-gasto"
            @submit.prevent="agregarGasto"
            >
                <!-- ALERTA -->

                <Alerta v-if="error">{{ error }}</Alerta>

                <legend>Añadir Gasto</legend>
                <!-- Nombre -->
                <div class="campo">
                    <label for="nombre">Nombre Gasto:</label>
                    <input 
                    type="text"
                    id="nombre"
                    placeholder="Añade el gasto"
                    :value="nombre"
                    @input="$emit('update:nombre',$event.target.value)"
                    :class="[error ? 'obligatorio' : '']"
                    >
                    <!--$event.target.value = Lo que el usuario esta escribiendo  -->
                </div>
                <!-- Cantidad -->
                <div class="campo">
                    <label for="cantidad">Cantidad:</label>
                    <input 
                    type="number"
                    id="cantidad"
                    placeholder="Añade la cantidad del Gasto, ej. 700"
                    :value="cantidad"
                    @input="$emit('update:cantidad',+$event.target.value)"

                    >
                </div>
                <!-- Categoria -->
                <div class="campo">
                    <label for="categoria">Categoria:</label>
                    <select id="categoria"
                    :value="categoria"
                    @input="$emit('update:categoria',$event.target.value)"
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos-varios">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
         
                    </select>
                </div>
                <input 
                type="submit" 
                value="Añadir Gasto"
                >
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
</style>