import { Data, WordpressProduct } from 'containers/HomePage/ProductAPI';

export const transformNewProduct = (products: WordpressProduct[]) => {
  return products.map<Data>(product => {
    return {
      id: product.id,
      createdAt: '',
      cursor: '',
      featuredImage: {
        src: product.image.src,
        height: product.image.height,
        width: product.image.width,
      },
      handle: product.slug,
      isSelected: product.isSelected,
      manual: product.manual,
      priceRangeV2: {
        minVariantPrice: {
          amount: product.price[0],
        },
        maxVariantPrice: {
          amount: product.price[1],
        },
      },
      title: product.title,
    };
  });
};
