import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Para simplificar, usamos sempre usuarioId = 1
const USER_ID = 1;

export async function GET() {
  const itens = await prisma.carrinho.findMany({
    where: { usuarioId: USER_ID },
    include: { produto: true },
    orderBy: { id: 'asc' },
  });
  return NextResponse.json(itens);
}

export async function POST(req: Request) {
  const { produtoId, quantidade = 1 } = await req.json();

  await prisma.carrinho.upsert({
    where: { usuarioId_produtoId: { usuarioId: USER_ID, produtoId: Number(produtoId) } },
    update: { quantidade: { increment: quantidade } },
    create: { usuarioId: USER_ID, produtoId: Number(produtoId), quantidade },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { produtoId } = await req.json();

  // First, get the current item to check quantity
  const item = await prisma.carrinho.findUnique({
    where: { 
      usuarioId_produtoId: { 
        usuarioId: USER_ID, 
        produtoId: Number(produtoId) 
      } 
    },
  });

  if (!item) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  if (item.quantidade > 1) {
    // Reduce quantity by 1
    await prisma.carrinho.update({
      where: { 
        usuarioId_produtoId: { 
          usuarioId: USER_ID, 
          produtoId: Number(produtoId) 
        } 
      },
      data: { quantidade: { decrement: 1 } }
    });
  } else {
    // Remove item completely if quantity is 1
    await prisma.carrinho.delete({
      where: { 
        usuarioId_produtoId: { 
          usuarioId: USER_ID, 
          produtoId: Number(produtoId) 
        } 
      },
    });
  }

  return NextResponse.json({ ok: true });
}