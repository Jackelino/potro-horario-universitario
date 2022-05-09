import { defineConfig } from 'vite'
import wasmPack from 'vite-plugin-wasm-pack'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    // El primer Array que se pasa a wasmPack es para
    // módulos en una ruta en el sistema de archivos local y el segundo
    // para módulos instalados con npm.
    plugins: [vue(), wasmPack([], ['uaemex-horarios'])],
    serve: {
        host: '0.0.0.0'
    },
})
