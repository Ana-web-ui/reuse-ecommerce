import './globals.css';
import Link from 'next/link';

export const metadata = { title: 'ReUse! E-commerce', description: 'Catálogo ReUse!' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="bg-[#f59e0b]">
          <div className="container flex items-center gap-6 py-9 px-9">
            <Link href="/" className="text-4xl font-extrabold tracking-tight text-cyan-900">
              ReUse!
            </Link>
            <input
              className="flex-1 rounded-full px-6 py-3 text-base outline-none"
              placeholder="Buscar produtos…"
            />
            <nav className="hidden md:flex gap-6 text-base">
              <Link href="/categorias/roupas-femininas" className="hover:underline">Roupas Femininas</Link>
              <Link href="/categorias/roupas-masculinas" className="hover:underline">Roupas Masculinas</Link>
              <Link href="/categorias/decoracao" className="hover:underline">Decoração</Link>
              <Link href="/categorias/acessorios" className="hover:underline">Acessórios</Link>
              <Link href="/carrinho" className="font-semibold">🛒 Carrinho</Link>
            </nav>
          </div>
        </header>
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}
