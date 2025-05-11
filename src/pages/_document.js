import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Fonts need to be loaded in _document.js, not in component Head tags */}
          <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/harry-p" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&display=swap" />
          
          {/* Pre-connect to improve font loading performance */}
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="anonymous" />
          
          {/* Add scrollbar hiding styles at document level for older browsers */}
          <style dangerouslySetInnerHTML={{ __html: `
            html, body {
              overflow-x: hidden;
              scrollbar-width: none;
              -ms-overflow-style: none;
            }
            html::-webkit-scrollbar, body::-webkit-scrollbar {
              display: none;
              width: 0 !important;
            }
            /* Target ancient browsers */
            body {
              scrollbar-track-color: transparent;
              scrollbar-face-color: transparent;
              scrollbar-arrow-color: transparent;
              scrollbar-shadow-color: transparent;
            }
          `}} />
          
          {/* Conditional comments for IE */}
          {/* These will only be interpreted by IE browsers */}
          <script dangerouslySetInnerHTML={{ __html: `
            <!--[if IE]>
              <style type="text/css">
                html, body {
                  scrollbar-face-color: transparent;
                  scrollbar-shadow-color: transparent;
                  scrollbar-highlight-color: transparent;
                  scrollbar-3dlight-color: transparent;
                  scrollbar-darkshadow-color: transparent;
                  scrollbar-track-color: transparent;
                  scrollbar-arrow-color: transparent;
                }
              </style>
            <![endif]-->
          `}} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;