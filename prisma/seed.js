const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Usuário “anônimo” (id = 1) para simplificar o carrinho
  await prisma.usuario.upsert({
    where: { email: 'anon@example.com' },
    update: {},
    create: { nome: 'Anônima', email: 'anon@example.com', senha: 'placeholder' }
  });

  // 10 produtos matching the static data
  const produtos = [
    {
      nome: "Women's Black Blouse",
      descricao: "Elegant black blouse perfect for office or casual wear. Made with premium cotton blend for comfort.",
      preco: 89.99,
      imagem: "/images/image1.png"
    },
    {
      nome: "Women's Orange Dress",
      descricao: "Vibrant orange dress with modern cut. Ideal for summer occasions and casual outings.",
      preco: 129.99,
      imagem: "/images/image2.png"
    },
    {
      nome: "Floral Shoes",
      descricao: "Beautiful floral patterned shoes. Comfortable and stylish for any occasion.",
      preco: 79.99,
      imagem: "/images/image3.png"
    },
    {
      nome: "Men's Green Shirt",
      descricao: "Classic green button-down shirt. Perfect for business casual or weekend wear.",
      preco: 69.99,
      imagem: "/images/image4.png"
    },
    {
      nome: "Men's Brown Suit",
      descricao: "Professional brown suit for formal occasions. Tailored fit with premium materials.",
      preco: 299.99,
      imagem: "/images/image5.png"
    },
    {
      nome: "Women's Navy Blue Pants",
      descricao: "Versatile navy blue pants. Great for office wear or casual weekend outfits.",
      preco: 99.99,
      imagem: "/images/image6.png"
    },
    {
      nome: "Office Supply Set",
      descricao: "Complete office supply set including pens, notebooks, and organizers.",
      preco: 49.99,
      imagem: "/images/image7.png"
    },
    {
      nome: "Decorative Basket",
      descricao: "Handwoven decorative basket perfect for home organization or as a decorative piece.",
      preco: 39.99,
      imagem: "/images/image8.png"
    },
    {
      nome: "Accessories",
      descricao: "Stylish accessory set including jewelry and fashion items to complete any outfit.",
      preco: 59.99,
      imagem: "/images/image9.png"
    },
    {
      nome: "Plant Basket",
      descricao: "Beautiful plant basket for indoor or outdoor plants. Made from natural materials.",
      preco: 34.99,
      imagem: "/images/image10.png"
    }
  ];

  // Evita duplicar caso rode de novo
  const existentes = await prisma.produto.findMany();
  if (existentes.length === 0) {
    await prisma.produto.createMany({ data: produtos });
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
