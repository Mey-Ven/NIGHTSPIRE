import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="dark scroll-smooth">
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* Script to fix malformed CSS variables */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Fix malformed CSS variables on the HTML element
              const htmlEl = document.documentElement;
              const style = htmlEl.getAttribute('style');
              if (style && style.includes('--main--position--')) {
                // Replace malformed CSS variable with correct syntax
                const fixedStyle = style.replace(/--main--position--\s*:\s*"?([^";]+)"?/g, '--main-position: $1');
                htmlEl.setAttribute('style', fixedStyle);
              }
            })();
          `
        }} />
      </body>
    </Html>
  )
}
