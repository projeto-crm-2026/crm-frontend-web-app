import preset from 'crm-project-ui/tailwind-preset'

const tailwindConfig = {
  presets: [preset],
  content: [
    './node_modules/crm-project-ui/dist/**/*.{js,ts}',
    './src/**/*.{js,ts,jsx,tsx}',
    './**/*.{js,ts,jsx,tsx}',
    './node_modules/crm-project-ui/**/*.{js,ts,jsx,tsx}'
  ]
}

export default tailwindConfig
