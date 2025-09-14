import { prisma } from '../../../../lib/prisma';
import ProductCard from '@/app/components/ProductCard';

interface Produto {
  id: number;
  nome: string;
  descricao: string | null;
  preco: number;
  imagem: string;
}

export default async function Home() {
  const produtos = await prisma.produto.findMany({ orderBy: { id: 'asc' } });

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {produtos.map((p: Produto) => (
          <ProductCard key={p.id} produto={{ id: p.id, nome: p.nome, descricao: p.descricao || '', preco: p.preco, imagem: p.imagem }} />
        ))}
      </div>
    </>
  );
}
