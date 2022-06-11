import { fileURLToPath, URL } from 'url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import WindiCSS from 'vite-plugin-windicss';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { createHtmlPlugin } from 'vite-plugin-html'
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

const CWD = process.cwd();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_SERVER_HOST, VITE_SERVER_PORT } = loadEnv(mode, CWD);
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
          }),
        ],
      }),
      Components({
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
          }),
        ],
      }),
      createHtmlPlugin(),
      WindiCSS(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: VITE_SERVER_HOST,
      port: Number(VITE_SERVER_PORT),
    },
  };
});
