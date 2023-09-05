<script setup>
  import {ref,reactive,watch,computed,onMounted} from 'vue'
  // Componentes 
  import Presupuesto from './components/Presupuesto.vue';    
  import ControlPresupuesto from './components/ControlPresupuesto.vue';
  import Modal from './components/Modal.vue'
  import Filtros from './components/Filtros.vue'
  import Gasto  from './components/Gasto.vue'

  import {generarId} from './helpers'
  import iconoGasto from './assets/img/nuevo-gasto.svg'
  
  //    >= States =<
  // Objecto reactivo
  const modal = reactive({
    mostrar: false,
    animar: false
  })
  const gasto = reactive({
    nombre: '',
    cantidad: '',
    categoria: '',
    id: null, 
    fecha: Date.now()
  })
  // constantes reactivas
  const gastos = ref([])
  const presupuesto = ref(0)
  const disponible = ref(0)
  const gastado = ref(0)
  const filtro = ref('')

  watch(gastos, () =>{
    const totalGastado = gastos.value.reduce((total,gasto) => gasto.cantidad + total,0)
    gastado.value = totalGastado
    disponible.value = presupuesto.value - totalGastado
  },{
    deep:true
  }
  )
  // Cuando el modal se cierre reinicia el objecto
  watch(modal, ()=>{
    if(!modal.mostrar){
      reiniciarStateGasto()
    }
  },{
    deep:true
  })

  watch(presupuesto, ()=>{
    localStorage.setItem('presupuesto', presupuesto.value)
    localStorage.setItem('gastos', gastos.value)
  })

  onMounted(()=>{
    const presupuestoStorage = localStorage.getItem('presupuesto')
    if(presupuestoStorage){
      presupuesto.value = Number(presupuestoStorage)
      disponible.value = Number(presupuestoStorage)
    }
  })

  // Funciones
  const definirPresupuesto = (cantidad) =>{
    presupuesto.value = cantidad
    disponible.value = cantidad
  }

  const mostrarModal = ()=>{
    modal.mostrar = true
    setTimeout(() => {
      modal.animar = true
    }, 300);
  }

  const ocultarModal = ()=>{

    modal.animar = false
    setTimeout(() => {
      modal.mostrar = false
    }, 300);
  }
  const guardarGasto = ()=>{
    // Si hay un id estamos editando
    if(gasto.id){
      // Editando
      const {id} = gasto
      // posicion en el arreglo
      const i = gastos.value.findIndex((gasto => gasto.id === id))
      // ...gastos quiere decir que traera una copia del gasto esto para que no se triga la reactividad
      gastos.value[i] = {...gasto}
    }else{
      // Registro nuevo
      gastos.value.push({
        // Guarda una copia de gasto y lo extre de gasto reactive
        ...gasto,
        id:generarId()
      })
    }
    ocultarModal()
    // Reiniciar el obejecto del formulario cuando se cierra
    reiniciarStateGasto()
  }
  const reiniciarStateGasto = ()=>{
    Object.assign(gasto,{
      nombre: '',
      cantidad: '',
      categoria: '',
      id: null, 
      fecha: Date.now()
    })
  }

  const seleccionarGasto = id =>{
    const gastoEditar = gastos.value.filter(gasto => gasto.id == id)[0]
    Object.assign(gasto, gastoEditar)
    mostrarModal()
    
  }
  const eliminarGasto = () =>{
    if(confirm('Eliminar?')){

      // Si la condición se cumple devuelve un [] y se reasigna
      gastos.value = gastos.value.filter(gastoState => gastoState.id != gasto.id)
      ocultarModal()
    }
  }
  const gastosFiltrados = computed(()=>{
    if(filtro.value){
      return gastos.value.filter(gasto => gasto.categoria === filtro.value)
    }
    return gastos.value
  })
</script>

<template>
  <!-- Clase dinamica con condicion a la derecha-->
  <div 
    :class="{fijar:modal.mostrar}"
  >
    <header>
      <h1>Planificador de Gastos</h1>
      <div class="contenedor-header contenedor sombra">
      <!-- Componente #1 -->
      <Presupuesto
      v-if="presupuesto === 0"
      @definir-presupuesto="definirPresupuesto"
      />
      <!-- Componente #2 -->
      <ControlPresupuesto
        v-else
        :presupuesto="presupuesto"
        :disponible="disponible"
        :gastado="gastado"
      />
    </div>
    </header>

    <main v-if="presupuesto > 0">
      <!-- Componente #3 -->

      <Filtros
      v-model:filtro="filtro"
      />

      <div class="listado-gastos contenedor">
        <h2>{{ gastosFiltrados.length > 0 ? 'Gastos':'No hay gastos' }}</h2>
        <!-- Componente #4 -->
          <!-- Intera en el arreglo de objectos GastosFiltrados -->
        <Gasto
          v-for="gasto in gastosFiltrados"
          :key="gasto.id"
          :gasto="gasto"
          @seleccionar-gasto="seleccionarGasto"
        />
      
      </div>

      <!-- Abre el modal  -->
      <div class="crear-gasto">
        <img :src="iconoGasto" 
        alt="icono Gasto"
        @click="mostrarModal"
        >
      </div>
      <!-- Componente #3 -->
      <!-- Modal - dentro de el esta la X para cerrar -->
      <Modal 
      v-if="modal.mostrar"
      
      @ocultarModal="ocultarModal"
      @guardarGasto="guardarGasto"
      @eliminar-gasto="eliminarGasto"
      :modal="modal"
      :disponible="disponible"
      :id="gasto.id"
      v-model:nombre="gasto.nombre"
      v-model:categoria="gasto.categoria"
      v-model:cantidad="gasto.cantidad"

      />

    </main>
  </div>
</template>

<style>
  :root{
    --azul:#3b82f6;
    --blanco:#FFF;
    --gris-claro:#F5F5F5;
    --gris:#94a3b8;
    --gris-oscuro:#64748b;
    --negro:#000;
  }

  html{
    font-size: 62.5%;
    box-sizing: border-box;
  }

  *,*::before,*::after{
   box-sizing: inherit; 
  }
  body{
    font-size: 1.6rem;
    font-family: "Lato", sans-serif;
    background-color: var(--gris-claro);

  }
  h1{
    font-size: 4rem;
  }
  h2{
    font-size: 3rem;
  }
  .fijar{
    overflow: hidden;
    height: 100vh;
  }
  header{
    background-color: var(--azul);
  }
  header h1{
    padding: 3rem 0;
    margin: 0;
    color: var(--blanco);
    text-align: center;
  }
  .contenedor{
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
  }
  .contenedor-header{
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
  }
  .sombra{
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    background-color: var(--blanco);
    border-radius: 1.2rem;
    padding: 5.2rem;
  }
  .crear-gasto{
    position: fixed; 
    bottom: 5rem;
    right: 5rem;   
  }
  .crear-gasto img{
    width: 5rem;
    cursor: pointer;
  }
  .crear-gasto img:hover{
    transform: translateY(-2px);
    transition: 3ms;
  }

  .listado-gastos{
    margin-top: 10rem;
  }
  .listado-gastos h2{
    font-weight: 900;
    color: var(--gris-oscuro);
  }
</style>
