import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, Montserrat } from "next/font/google"
import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { MotionProvider } from "@/components/motion/motion-provider"
import { Analytics } from "@/components/tracking/analytics"
import { SiteSettingsProvider } from "@/components/site-settings"
import { CookieBanner } from "@/components/tracking/cookie-banner"
import { siteConfig } from "@/lib/config"
import { getSiteContent } from "@/lib/content"
import "./globals.css"

const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] })
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] })

const title = `${siteConfig.name}: Take your AI-built website or app to production`

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: "/",
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.social.twitter,
    title,
    description: siteConfig.description,
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { settings } = await getSiteContent()
  return (
    <html lang="en-US" className={`${montserrat.variable} ${plexMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <SiteSettingsProvider value={settings}>
          <MotionProvider>
            <Navbar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer email={settings.email} />
            <CookieBanner />
          </MotionProvider>
        </SiteSettingsProvider>
        <Analytics />
      </body>
    </html>
  )
}
