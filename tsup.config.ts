import { defineConfig } from 'tsup'
//  tsup config file, see https://github.com/egoist/tsup for detail
export default defineConfig({
  outExtension({ format }) {
    // esm
    if (format === 'esm') {
      return {
        js: '.mjs',
      }
    }
    // global
    if (format === 'iife') {
      return {
        js: '.global.js',
      }
    }
    // cjs
    return {
      js: '.cjs',
    }
  },
})
