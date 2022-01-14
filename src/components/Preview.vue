<template>
    <div ref='viewContainer' class="view"></div>
</template>

<script setup>
import { 
    ref, 
    reactive, 
    watch,
    defineProps,
    onMounted, 
    onBeforeMount,
} from 'vue'
// hooks
import { useCreateJsonEditor } from '../hooks/useJson'

const props = defineProps({
    value: Object,
})

let mainMenuBar = ref(true)
let viewJson = null
const viewContainer = ref()

watch(() => props.value, (newValue) => {
    viewJson.update(newValue)
})

onMounted(() => {
    viewJson = useCreateJsonEditor(viewContainer.value, { 
        mode: 'view',
        mainMenuBar: mainMenuBar.value,
    })
    viewJson.set(props.value)
})

onBeforeMount(() => {
    if(viewJson) {
        viewJson.destroy()
    }
})
</script>

<style scoped>
    .view {
        width: 100%;
    }
</style>
