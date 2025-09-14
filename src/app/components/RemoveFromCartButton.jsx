'use client';

import { useState } from 'react';

export default function RemoveFromCartButton({ produtoId }) {
  const [loading, setLoading] = useState(false);

  async function remove() {
    try {
      setLoading(true);
      await fetch('/api/carrinho', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produtoId }),
      });
      alert('Quantidade reduzida em 1!');
      // Refresh the page to update the cart
      window.location.reload();
    } catch (error) {
      alert('Erro ao remover item do carrinho');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={remove}
      disabled={loading}
      className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700 disabled:opacity-60 transition-colors"
      aria-label="Remover do carrinho"
    >
      {loading ? 'Removendo...' : '➖'}
    </button>
  );
}
