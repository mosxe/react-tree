import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const baseDefault = '/cst_tree_persons/dist';

type ViteConfig = {
  command: string;
  mode: string;
};

export default defineConfig(({ mode }: ViteConfig) => {
  const generateScopedName = '[local]__[hash:base64:3]';
  const base = mode === 'production' ? baseDefault : '/';

  return {
    base: base,
    manifest: true,
    resolve: {
      alias: {
        assets: '/src/assets',
        components: '/src/components',
        modules: '/src/modules'
      }
    },
    plugins: [react()],
    css: {
      modules: {
        generateScopedName: generateScopedName
      }
    }
  };
});
