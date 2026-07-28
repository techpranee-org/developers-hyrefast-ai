import { ApiReference } from '@scalar/nextjs-api-reference'

const config = {
  spec: {
    url: '/openapi.yaml',
  },
  theme: 'bluePlanet',
  darkMode: true,
  pageTitle: 'Hyrefast API Reference',
  metaData: {
    title: 'Hyrefast API Reference',
    description: 'Interactive API documentation for the Hyrefast REST API. Test endpoints directly in your browser with your own API key.',
  },
  hideModels: false,
  hideDownloadButton: false,
  hideTestRequestButton: false,
  showSidebar: true,
}

export const GET = ApiReference(config as any)