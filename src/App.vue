<template>
    <div class="container">
        <div ref='editContainer' class="edit"></div>

        <div ref='viewContainer' class="view"></div>
    </div>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, reactive, watch, onMounted, onBeforeMount } from 'vue'
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css'

let jsonData = reactive({
        "Array": [1, 2, 3],
        "Boolean": true,
        "Null": null,
        "Number": 123,
        "Object": {"a": "b", "c": "d"},
        "String": "Hello World"
    })

const viewContainer = ref()
let viewJson = reactive(null)

const editContainer = ref()
let editJson = reactive(null)

const setJSON = (jsoneditor, value) => {
    jsoneditor.set(value)
}

const getJSON = (jsoneditor) => {
   return jsoneditor.get()
}

const getJSONText = (jsoneditor) => {
    return jsoneditor.getJSONText()
}

const onChange = () => {
    const json = getJSON(editJson)
    console.log(json)
    viewJson.update(json)
}

watch(viewJson, (newValue, oleValue) => {
    // setJSON(viewJson, newValue)
})

onMounted(() => {
    viewJson = new JSONEditor(viewContainer.value, { mode: 'view'})
    setJSON(viewJson, jsonData)

    editJson = new JSONEditor(editContainer.value, { 
        mode: 'code',
        history: true,
        onChange: onChange,
        // onValidationError: this.onError
    })

    setJSON(editJson, jsonData)
    
})

onBeforeMount(() => {

})

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container {
    display: flex;
    height: 90vh;
    padding: 16px;
}

.edit, .view {
    flex: 1;
}
</style>
