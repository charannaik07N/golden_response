const normalizeProduct = (raw) => ({
  externalId: raw.id,
  title: raw.title,
  description: raw.description,
  images: raw.images || [],
  price: raw.price,
  stock: raw.stock,
  category: raw.category,
  rating: raw.rating,
});

module.exports = normalizeProduct;
