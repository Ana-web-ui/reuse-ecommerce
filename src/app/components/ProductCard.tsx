import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from './Button/AddToCartButton';

type Produto = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
};

export default function ProductCard({ produto }: { produto: Produto }) {
  return (
    <div className="rounded-2xl shadow-md hover:shadow-lg transition-shadow "style={{ backgroundColor: '#82CA9D' }}>
      <Link href={`/produto/${produto.id}`}>
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl flex items-center justify-center bg-white">
          <Image
            src={produto.imagem}
            alt={produto.nome}
            fill
            className="object-contain p-10"
          />
        </div>
        <div className="px-8 py-3">
          <h3 className="text-base font-medium text-white mb-1">{produto.nome}</h3>
          <p className="text-sm text-green-100 mb-2 line-clamp-2">
            {produto.descricao}
          </p>
          <p className="text-lg font-semibold text-white">
            R$ {produto.preco.toFixed(2)}
          </p>
        </div>
      </Link>
      <div className="px-8 pb-4 flex justify-between items-center">
        <button className="rounded-full border border-white/70 w-9 h-9 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
          🤍
        </button>
        <AddToCartButton produtoId={produto.id} />
      </div>
    </div>
  );
}
