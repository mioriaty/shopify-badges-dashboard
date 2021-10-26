import Checkbox, { CheckboxProps } from 'components/Checkbox';
import FieldBox from 'components/FieldBox';
import ImagePreview from 'components/ProductCard/ImagePreview';
import { FC, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'wiloke-react-core';
import ProductCardLoading from './ProductCardLoading';
import * as css from './styles';

export interface ProductCardProps {
  item: ClientProduct;
  previewImage?: string;
  selected?: boolean;
  badgePlacement?: Placement;
  loadingDelete?: boolean;
  onSelect?: CheckboxProps['onValueChange'];
  onDelete?: () => void;
}

const ProductCard: FC<ProductCardProps> & {
  Loading: typeof ProductCardLoading;
} = ({ item, selected = false, badgePlacement = 'topLeft', loadingDelete = false, onSelect, children }) => {
  const { price = ['20, 25'], image, title: productName = 'Essential Cotton-blend Shirt' } = item;
  const minPrice = price[0];
  const maxPrice = price[1];
  const percent = (Number(minPrice) / Number(maxPrice)) * 100;
  const salePrice = (Number(minPrice) * (percent / 100)).toFixed(2);
  const discount = (100 - percent).toFixed(2);
  const [selectedState, setSelected] = useState(selected);

  useEffect(() => {
    if (selectedState !== selected) {
      setSelected(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const _handleSelected = () => {
    setSelected(!selectedState);
    onSelect?.(!selectedState);
  };

  return (
    <FieldBox css={{ marginBottom: '10px', cursor: 'pointer', userSelect: 'none' }} onClick={_handleSelected}>
      <View css={css.container}>
        <View css={css.image} radius={6}>
          <ImagePreview badgetPlacement={badgePlacement} imageSrc={image.src}>
            {children}
          </ImagePreview>
        </View>
        <View css={css.content}>
          <View css={css.productName} color="gray7">
            {productName}
          </View>
          <View>
            <View css={css.price} tagName="span">
              ${minPrice}
            </View>
            {Number(salePrice) !== Number(minPrice) && (
              <View css={css.salePrice} tagName="span">
                ${salePrice}
              </View>
            )}
            {Number(salePrice) !== Number(minPrice) && (
              <View css={css.discount} tagName="span">
                {discount}%
              </View>
            )}
          </View>
        </View>
        <View css={css.action}>
          {loadingDelete ? (
            <ActivityIndicator size="small" />
          ) : (
            <Checkbox size="small" activeColor="primary" checked={selectedState} onValueChange={_handleSelected} />
          )}
        </View>
      </View>
    </FieldBox>
  );
};

ProductCard.Loading = ProductCardLoading;

export default ProductCard;
