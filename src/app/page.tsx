import { prisma } from '@/lib/prisma';
import ProductCard from '@/app/components/ProductCard';

export default async function Home() {
  const produtos = await prisma.produto.findMany({ orderBy: { id: 'asc' } });

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Catálogo de Produtos</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {produtos.map((produto) => (
          <ProductCard key={produto.id} produto={{ 
            id: produto.id, 
            nome: produto.nome, 
            descricao: produto.descricao || '', 
            preco: produto.preco, 
            imagem: produto.imagem 
          }} />
        ))}
      </div>
    </>
  );
}
