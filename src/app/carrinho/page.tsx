import { prisma } from '@/lib/prisma';
import RemoveFromCartButton from '@/app/components/RemoveFromCartButton';

export default async function CarrinhoPage() {
  const USER_ID = 1;
  const itens = await prisma.carrinho.findMany({
    where: { usuarioId: USER_ID },
    include: { produto: true },
  });

  const total = itens.reduce((acc, i) => acc + i.quantidade * i.produto.preco, 0);

  return (
    <div>
      <h1 className="text-4xl font-bold p-5 mt-48">Seu carrinho</h1>
      {itens.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className="space-y-4 p-5">
          {itens.map((i) => (
            <div key={i.id} className="flex items-center justify-between rounded-xl bg-green-500 p-5 gap-5 shadow">
              <div className="flex-1">
                <p className="font-semibold text-white">{i.produto.nome}</p>
                <p className="text-sm text-green-100 p-2">Qtd: {i.quantidade}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-white font-semibold">R$ {(i.quantidade * i.produto.preco).toFixed(2)}</p>
                <RemoveFromCartButton produtoId={i.produtoId} />
              </div>
            </div>
          ))}
          <div className="mt-6 text-right text-xl font-semibold">Total: R$ {total.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}
