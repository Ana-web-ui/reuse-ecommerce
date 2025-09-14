'use client';

import { useState } from 'react';

export default function AddToCartButton({ produtoId }) {
  const [loading, setLoading] = useState(false);

  async function add() {
    try {
      setLoading(true);
      await fetch('/api/carrinho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produtoId, quantidade: 1 }),
      });
      alert('Adicionado ao carrinho!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={add}
      disabled={loading}
      className="rounded-lg bg-green-600 px-3 py-1 text-white disabled:opacity-60"
      aria-label="Adicionar ao carrinho"
    >
      {loading ? 'Adicionando…' : '🛒'}
    </button>
  );
}
