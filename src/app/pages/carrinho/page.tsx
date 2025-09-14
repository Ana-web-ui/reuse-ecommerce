import { prisma } from '@/lib/prisma';

export default async function CarrinhoPage() {
  const USER_ID = 1;
  const itens = await prisma.carrinho.findMany({
    where: { usuarioId: USER_ID },
    include: { produto: true },
  });

  const total = itens.reduce((acc, i) => acc + i.quantidade * i.produto.preco, 0);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Seu carrinho</h1>
      {itens.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className="space-y-4">
          {itens.map((i) => (
            <div key={i.id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow">
              <div>
                <p className="font-semibold">{i.produto.nome}</p>
                <p className="text-sm text-gray-600">Qtd: {i.quantidade}</p>
              </div>
              <p>R$ {(i.quantidade * i.produto.preco).toFixed(2)}</p>
            </div>
          ))}
          <div className="mt-6 text-right text-xl font-semibold">Total: R$ {total.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}
