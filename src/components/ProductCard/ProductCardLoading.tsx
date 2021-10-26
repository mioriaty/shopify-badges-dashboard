import FieldBox from 'components/FieldBox';
import { View } from 'wiloke-react-core';

const ProductCardLoading = () => {
  return (
    <FieldBox css={{ marginBottom: '10px' }}>
      <View height={70} css={{ display: 'flex' }}>
        <View width={95} css={{ marginRight: '15px' }} backgroundColor="gray2" radius={6} />
        <View css={{ alignSelf: 'center', flex: '1' }}>
          <View width={150} height={8} radius={6} css={{ marginBottom: '8px' }} backgroundColor="gray2" />
          <View width={120} height={8} radius={6} backgroundColor="gray2" />
          <View />
        </View>
        <View backgroundColor="gray2" width={24} height={24} radius={6} />
      </View>
    </FieldBox>
  );
};

export default ProductCardLoading;
