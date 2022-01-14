<template>
    <el-container class="container">
        <el-header>
            <div class="operation">
                <el-button-group>
                    <el-button 
                        type="primary" 
                        class="copy" 
                        :data-clipboard-text="clipboardText"
                        :icon="DocumentCopy"> copy </el-button>
                </el-button-group>
            </div>
        </el-header>
        <el-main class="main">
            <Json 
                :value="jsonData" 
                @changeText="onChangeText"
                @change="onChange"></Json>
            <Preview :value="jsonData" ></Preview>
        </el-main>
    </el-container>
</template>

<script setup>
// libs
import { ref, onMounted } from 'vue'
// components
import Json from '../components/Json.vue'
import Preview from '../components/Preview.vue'
import { DocumentCopy } from '@element-plus/icons-vue'
// hooks
import { useClipboard } from '../hooks/useClipboard'

const defaultJson = {
    "Array": [1, 2, 3],
    "Boolean": true,
    "Null": null,
    "Number": 123,
    "Object": {"a": "b", "c": "d"},
    "String": "Hello World",
    "Set": new Set([1, 2, 3, 4])
}
let jsonData = ref(defaultJson)

const onChange = (data) => {
    jsonData.value = data
}

let clipboardText = ref(JSON.stringify(defaultJson, null, 2))
const onChangeText = (data) => {
    clipboardText.value = data
}


onMounted(() => {
    const clipboard = useClipboard('.copy')
    clipboard.on('success', function(e) {
        // console.info('Text:', e.text);
        ElMessage({
            message: 'coped !',
            type: 'success',
        })
        e.clearSelection();
    });
})

</script>
 
<style scoped>
.container {
    height: 100%;
}
.operation {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 16px;
}

.copy {
    cursor: pointer;
}
.main {
    display: flex;
    height: 100%;
}
</style>
