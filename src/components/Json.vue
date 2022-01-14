<template>
    <div ref='editContainer' class="edit"></div>
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

const emit = defineEmits(['change', 'changeText'])

const editContainer = ref()
let JsonEditor = null

watch(() => props.value, (newValue) => {
    JsonEditor.update(newValue)
})

const onChange = () => {
    const data = JsonEditor.get()
    emit('change', data)
}

const onChangeText = (data) => {
    emit('changeText', data)
}

onMounted(() => {
    JsonEditor = useCreateJsonEditor(editContainer.value, { 
        modes: ['code', 'tree', 'form', 'view', 'preview', 'text'],
        history: true,
        // name: 'json',
        search: true,
        indentation: 2,
        mainMenuBar: true,
        navigationBar: true,
        statusBar: true,
        language: 'zh-CN',
        limitDragging: true,
        onChange,
        onChangeText,
        // onValidationError: this.onError
    })
    JsonEditor.set(props.value)
})

onBeforeMount(() => {
    if(JsonEditor) {
        JsonEditor.destroy()
    }
})
</script>

<style scoped>
    .edit {
        width: 100%;
    }
</style>
