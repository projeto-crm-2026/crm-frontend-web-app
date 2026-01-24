import preset from 'crm-project-ui/tailwind-preset'

const tailwindConfig = {
  presets: [preset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/crm-project-ui/dist/**/*.{js,ts}'
  ]
}

export default tailwindConfig
