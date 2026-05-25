import { defineConfig } from 'orval'

export default defineConfig({
  client: {
    input: 'http://localhost:3000/openapi.yaml',
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
