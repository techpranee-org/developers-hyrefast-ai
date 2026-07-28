import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    default: 'Hyrefast API Documentation',
    template: '%s — Hyrefast API',
  },
  description: 'Integrate Hyrefast into your platform — create jobs, submit applications, and manage interviews programmatically.',
  metadataBase: new URL('https://developers.hyrefast.ai'),
  openGraph: {
    title: 'Hyrefast API Documentation',
    description: 'Integrate Hyrefast into your platform — create jobs, submit applications, and manage interviews programmatically.',
    url: 'https://developers.hyrefast.ai',
    siteName: 'Hyrefast API Documentation',
    type: 'website',
  },
}

const banner = (
  <Banner storageKey="hyrefast-api-launch">
    🎉 Hyrefast API v1 is now available —{' '}
    <a href="/reference" style={{ color: 'inherit', textDecoration: 'underline' }}>
      try it in the API reference →
    </a>
  </Banner>
)

const navbar = (
  <Navbar
    logo={
      <b style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          display: 'inline-block',
          width: '28px',
          height: '28px',
          borderRadius: '6px',
          background: 'linear-gradient(135deg, #40A0E0, #2563eb)',
        }} />
        Hyrefast API
      </b>
    }
  />
)

const footer = (
  <Footer>
    © {new Date().getFullYear()} Hyrefast. All rights reserved.
  </Footer>
)

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/techpranee-org/developers-hyrefast-ai"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}