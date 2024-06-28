/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-practice/',
  test: {
    globals: true,
    environment: 'jsdom', // テスト環境をjsdomに設定
    setupFiles: './vitest.setup.ts', // セットアップファイル
  },
});
