import './globals.css'

export const metadata = {
  title: 'NF1 Study Hub',
  description: 'Informações e casos de estudo sobre NF1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}