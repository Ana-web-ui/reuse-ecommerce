import { prisma } from '../../../../lib/prisma';
import Image from 'next/image';

export default async function Produto({ params }: { params: { id: string } }) {
  const produto = await prisma.produto.findUnique({ where: { id: Number(params.id) } });

  if (!produto) return <p className="text-red-600">Produto não encontrado.</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-white">
        <Image src={produto.imagem} alt={produto.nome} fill className="object-cover" />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{produto.nome}</h1>
        <p className="mt-2 text-xl">R$ {produto.preco.toFixed(2)}</p>
        <p className="mt-4 text-gray-700">{produto.descricao}</p>
      </div>
    </div>
  );
}
