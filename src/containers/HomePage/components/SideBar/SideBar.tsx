import FieldBox from 'components/FieldBox';
import { useSelectPageType } from 'containers/HomePage/actions';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { homePageSelector } from 'store/selectors';
import { View } from 'wiloke-react-core';

export const SideBar = () => {
  const { pageType } = useSelector(homePageSelector);
  const setPageType = useSelectPageType();
  const history = useHistory();

  const handleChooseType = (type: PageType) => () => {
    setPageType(type);

    if (type === 'manual') {
      history.push('/products', undefined);
    }
    if (type === 'automatic') {
      history.push('/automatic-badges', undefined);
    }
  };

  return (
    <View>
      <FieldBox
        borderColorHover="primary"
        borderColor={pageType === 'manual' ? 'primary' : 'gray2'}
        css={{ marginBottom: '20px', cursor: 'pointer', padding: '30px' }}
        onClick={handleChooseType('manual')}
      >
        <View color="gray8" css={{ fontSize: '22px', fontWeight: 500 }}>
          Manual
        </View>
        {/* <View>{settings.manual.description}</View> */}
      </FieldBox>
      <FieldBox
        borderColorHover="primary"
        borderColor={pageType === 'automatic' ? 'primary' : 'gray2'}
        css={{ marginBottom: '20px', cursor: 'pointer', padding: '30px' }}
        onClick={handleChooseType('automatic')}
      >
        <View color="gray8" css={{ fontSize: '22px', fontWeight: 500 }}>
          Automatic
        </View>
        {/* <View>{settings.automatic.description}</View> */}
      </FieldBox>
    </View>
  );
};
