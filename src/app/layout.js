import './globals.css';
 
// Polyfill webkitURL for Next.js 15 server-side rendering
if (typeof globalThis.webkitURL === 'undefined') {
  globalThis.webkitURL = typeof URL !== 'undefined' ? URL : {};
}
 
export const metadata = {
  title: 'noodle shrine ʕ•ᴥ•ʔ',
  description: 'community-rated instant ramen — slurp, score, repeat',
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&family=Caveat:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
 