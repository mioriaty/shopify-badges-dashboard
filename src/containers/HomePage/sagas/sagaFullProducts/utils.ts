import { Data, WordpressProduct } from 'containers/HomePage/ProductAPI';

export const transformNewProduct = (products: WordpressProduct[]) => {
  return products.map<Data>(product => {
    return {
      ...product,
      id: product.id,
      createdAt: '',
      cursor: '',
      handle: product.handle,
      link: product.handle,
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
