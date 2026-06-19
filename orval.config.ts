import { defineConfig } from 'orval'

export default defineConfig({
  client: {
    input: 'https://ciganov.net/api/openapi.json',
    output: {
      schemas: './src/api/generated',
      target: './src/api/generated/client.ts',
      client: 'axios',
      override: {
        mutator: {
          path: './src/api/instance.ts',
          name: 'customInstance'
        }
      }
    }
  }
})
