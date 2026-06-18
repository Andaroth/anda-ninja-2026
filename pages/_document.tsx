// Must be the first import
import type { DocumentContext } from 'next/document'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

const setInitialColorMode = `!function(){let e=localStorage.getItem("theme")||"light";document.documentElement.classList.add(e+"-mode")}();`
const loadCritialFonts = `localStorage.criticalFontsLoaded?document.documentElement.classList.add("critical-fonts-loaded"):"fonts"in document&&Promise.all([document.fonts.load("500 normal 16px Bureau Agent"),]).then(t=>{document.documentElement.classList.add("critical-fonts-loaded"),localStorage.setItem("criticalFontsLoaded",!0)});`
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage()

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
      }
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <Html lang="fr">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
