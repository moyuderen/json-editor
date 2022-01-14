import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css'

export const useCreateJsonEditor = (container, options) => {
    const jsonditor = new JSONEditor(container, options)
    return jsonditor
}
