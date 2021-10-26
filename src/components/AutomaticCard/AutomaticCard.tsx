import Checkbox, { CheckboxProps } from 'components/Checkbox';
import FieldBox from 'components/FieldBox';
import { FC, useEffect, useState } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import ProductCardLoading from './AutomaticCardLoading';
import * as css from './styles';

export interface AutomaticCardProps {
  item: ClientAutomatic;
  /* Ảnh preview của Product */
  previewImage?: string;
  /* Check xem item đã được select hay chưa */
  selected?: boolean;
  /* Sự kiện onSelect */
  loadingDelete?: boolean;
  onSelect?: CheckboxProps['onValueChange'];
  onClick?: ViewProps['onClick'];
  onDelete?: () => void;
}

const AutomaticCard: FC<AutomaticCardProps> & {
  Loading: typeof ProductCardLoading;
} = ({ item, selected = false, loadingDelete = false, onSelect, onClick, onDelete, children }) => {
  const { description, title: productName = 'Essential Cotton-blend Shirt' } = item;
  const [selectedState, setSelect] = useState(selected);

  useEffect(() => {
    if (selectedState !== selected) {
      setSelect(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const _handleSelected = () => {
    setSelect(!selectedState);
    onSelect?.(!selectedState);
    onDelete?.();
  };

  return (
    <FieldBox css={{ marginBottom: '10px', padding: '20px' }}>
      <View css={css.container}>
        <View css={css.image} radius={10}>
          <View css={css.children}>{children}</View>

          <View onClick={onClick} backgroundColor="gray8" color="light" css={css.changeBadge}>
            Change badge
          </View>
        </View>
        <View css={{ display: 'flex', flex: 1, cursor: 'pointer', userSelect: 'none' }} onClick={_handleSelected}>
          <View css={css.content}>
            <View css={css.productName} color="gray7">
              {productName}
            </View>
            <View>{description}</View>
          </View>
          <View css={css.action}>
            {loadingDelete ? (
              <Checkbox.Loading />
            ) : (
              <Checkbox size="small" activeColor="primary" checked={selectedState} onValueChange={_handleSelected} />
            )}
          </View>
        </View>
      </View>
    </FieldBox>
  );
};

AutomaticCard.Loading = ProductCardLoading;

export default AutomaticCard;
