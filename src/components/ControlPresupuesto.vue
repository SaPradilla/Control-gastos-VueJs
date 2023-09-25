        
<script setup>
    import iconoPresupuesto from '../assets/img/nuevo-presupuesto.svg'
    
    // Dependecia de circulo de progreso
    import CircleProgress from 'vue3-circle-progress'
    // su estilo
    import "vue3-circle-progress/dist/circle-progress.css"
    import {computed}from 'vue'
    import {formatearCantidad} from '../helpers'

    const props = defineProps({
        presupuesto:{
            type:Number,
            required: true
        },
        disponible:{
            type:Number,
            required: true
        },
        gastado:{
            type:Number,
            required:true
        },
        modalPresupuesto:{
            type:Object,
            required:true
        }
    })

    defineEmits(['reset-app','mostrarModalPresupuesto'])
    
    const porcentaje = computed(()=>{
        // ((300 - 150)/300) * 100
        // Calcula el porcentaje con regla de 3 
        return parseInt(((props.presupuesto - props.disponible) / props.presupuesto) * 100)
    })
</script>

<template>
    <div class="dos-columnas">

        <div class="contenedor-grafico">
            <p class="porcentaje">{{ porcentaje }}%</p>
            <CircleProgress
                :percent="porcentaje "
                :size="210"
                :border-width="20"
                :border-bg-width="20"
                fill-color="#3b82f6"
                empy-color="#e1e1e1"

            />
        </div>

        <div class="contenedor-presupuesto">
            <div class="añadir">
                <button
                    class="añadir-presupuesto"
                    type="button"
                    @click="$emit('mostrarModalPresupuesto')"
                >Añadir presupuesto
                </button>
                <img :src="iconoPresupuesto" alt="Icono añadir" 
                >
            </div>
            

            <button
                class="reset-app"
                type="button"
                @click="$emit('reset-app')"
            >Resetar App
            </button>
            <p>
                <span>Prespuesto:</span>
                {{ formatearCantidad(presupuesto)}}
            </p>
            <p>
                <span>Disponible:</span>
                {{ formatearCantidad(disponible) }}
            </p>
            <p>
                <span>Gastado:</span>
                {{formatearCantidad(gastado)}}
            </p>
        </div>
    </div>

</template>

<style scoped>
    .contenedor-grafico{
        position: relative;
    }
    .porcentaje{
        position: absolute;
        margin: auto;
        /* Lo posiciona el centro */
        top: calc(50% - 1.5rem);
        /* horizontal */
        left: 0;
        right: 0;
        text-align: center;
        z-index: 100;
        font-size: 3rem;
        font-weight: 900; 
        color: var(--gris-oscuro);
    }
    .dos-columnas{
        display: flex;
        flex-direction: column;
    }
    .dos-columnas > :first-child{
        margin-bottom: 3rem;
    }


    .reset-app {
        background-color: #DB2777;
        border: none;
        padding: 1rem;
        width: 100%;
        color: var(--blanco);
        font-weight: 900;
        text-transform: uppercase;
        border-radius: 1rem;
        transition-property: background-color;
        transition-duration: 300ms;
    }
    .reset-app:hover{
        cursor: pointer;
        background-color: #b7155e;
    }
    .añadir-presupuesto{
        border: none;
        background-color: var(--azul);
        width: 100%;
        color: var(--blanco);
        font-weight: 900;
        border-radius: 1rem;
        text-transform: uppercase;
        z-index: 100;
    }
    .añadir-presupuesto:hover{
        cursor: pointer;
    }
    .añadir{
        margin-bottom: 40px;
        display: flex;
        background-color: var(--azul);
        border: none;
        border-radius: 1rem;
        transition-property: background-color;
        transition-duration: 300ms;
    }
    .añadir img{
        width: 45px;
        z-index: 100;

    }
    .contenedor-presupuesto{
        width: 100%;
    }
    .contenedor-presupuesto p{
        font-size: 2.4rem;
        text-align: center;
        color: var(--gris-oscuro);

    }
    .contenedor-presupuesto span{
        font-weight: 900;
        color: var(--azul);

    }

    @media (min-width: 768px){
        .dos-columnas{
            flex-direction:row;
            gap:4rem;
            align-items: center;
        }
        .dos-columnas > :first-child{
            margin-bottom: 0;
        }
        .contenedor-presupuesto p{
            font-size: 2.4rem;
            text-align:left;
        }
    }
    @media (max-width: 460px){
        .porcentaje{
            top: calc(50% - 1.6rem);
        }
        .contenedor-grafico{
            margin: 0 auto;
        }
    }
</style>