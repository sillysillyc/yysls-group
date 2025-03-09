import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd());

  return {
    base: mode === 'development' ? '/' : `/${env.VITE_PUBLIC_PATH}`,
    plugins: [react()],
    build: {
      emptyOutDir: true, // 构建前清空输出目录
      outDir: 'output', // 输出目录，默认就是 dist
    },
    server: {
      port: Number(env.VITE_PORT) || 3000,
      proxy: {
        // 正则表达式写法
        // pro
        // '^/yysls-group-api/.*': {
        //   target: 'https://dnf.zhyf.site',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/yysls-group-api/, ''),
        // },
        // dev
        '^/yysls-group-api/yysls/.*': {
          target: 'http://127.0.0.1:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/yysls-group-api\/yysls/, ''),
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    define: {
      /**
       * 全局变量
       */
      PORT: JSON.stringify(env.VITE_PORT),
      PUBLIC_PATH: JSON.stringify(env.VITE_PUBLIC_PATH), // 修正变量名拼写错误
      API_PREFIX: JSON.stringify(env.VITE_API_PREFIX),
      APP_NAME: JSON.stringify(env.VITE_APP_NAME),
    },
  };
});
