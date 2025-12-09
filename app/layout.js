export const metadata = {
  title: 'Explora+ | Descubra os Melhores Lugares',
  description: 'Encontre as melhores ofertas em bares, hotéis e restaurantes em Caruaru',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{
        margin: 0,
        padding: 0,
        background: '#007A8D',
        fontFamily: 'Arial, sans-serif',
        color: 'white'
      }}>
        {children}
      </body>
    </html>
  )
}
