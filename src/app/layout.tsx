import umbracoContext from '@/lib/umbracocontext';
import TopNavigation from '@/components/TopNavigation';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Lato, Roboto_Mono } from 'next/font/google';

const lato = Lato({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

const robotoMono = Roboto_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let rootContent = null;
  
  try {
    rootContent = await umbracoContext.getRoot();
  } catch (error) {
  }
  
  const siteLogoPath = rootContent?.Value('siteLogo');
  const siteName = rootContent?.Value('sitename') || 'Site Name';
  const siteLogo = siteLogoPath ? umbracoContext.getMediaUrl(siteLogoPath) : null;

  return (
    <html lang="en" className={`${lato.variable} ${robotoMono.variable}`}>
      <head>
        <title>{siteName}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/css/umbraco-starterkit-style.css" as="style" />
        <link rel="stylesheet" href="/css/umbraco-starterkit-style.css" />
      </head>
      <body className={`frontpage theme-font-${rootContent?.Value('font')} theme-color-${rootContent?.Value('colorTheme')}`}>
        <header className="header">
          <div className="logo">
            {siteLogo ? (
              <div className="nav-link--home">
                <Image className="logo-image" src={siteLogo} alt={siteName} width={200} height={60} />
              </div>
            ) : (
              <Link className="nav-link nav-link--home nav-link--home__text logo-text" href="/">
                {siteName}
              </Link>
            )}
          </div>

          <nav className="nav-bar top-nav">
            <TopNavigation />
          </nav>

          <div className="mobile-nav-handler">
            <div className="hamburger lines" id="toggle-nav">
              <span></span>
            </div>
          </div>
        </header>

        <main>
          {children}
        </main>
          <footer className="section--themed">
      <div className="container">
          <div className="row">
              <div className="col-md-12 ta-center">
                  {rootContent?.Value('footerAddress') || ''}
              </div>
          </div>
      </div>
  </footer>
        <Script 
          id="jquery"
          src="https://code.jquery.com/jquery-3.6.0.min.js" 
          integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" 
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <Script src="/scripts/umbraco-starterkit-app.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
