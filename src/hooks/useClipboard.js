
import ClipboardJS from 'clipboard'

export function useClipboard(slector) {
    const clipboard = new ClipboardJS(slector)
    return clipboard
}