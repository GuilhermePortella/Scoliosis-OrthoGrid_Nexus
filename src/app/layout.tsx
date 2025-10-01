import SiteNav from '@/components/SiteNav';
import './globals.css'

export const metadata = {
  title: 'NF1 Study Hub',
  description: 'Informações e casos de estudo sobre NF1',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SiteNav />
        <main className="container" style={{ paddingBlock: "24px 64px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}