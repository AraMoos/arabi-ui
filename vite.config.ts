import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'e-experts-ui',
      // the proper extensions will be added
      fileName: format => `index.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        },
        format: 'esm',
        assetFileNames: '[name].[ext]',
      }
    },
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
      'dev/': `${resolve(__dirname, 'src/dev')}/`,
    },
  },
  server: {
    port: 3005,
    host: '0.0.0.0',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "~/assets/style/main.scss";`
      }
    }
  },
});
