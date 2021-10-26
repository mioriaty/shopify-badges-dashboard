import Button from 'components/Button';
import Navigation, { NavigationProps } from 'components/Navigation';
import { v4 } from 'uuid';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

const navItems: NavigationProps['data'] = [
  {
    label: 'Products',
    href: '/',
    id: v4(),
    isReactRouter: true,
    exact: true,
  },
  {
    label: 'Badges',
    href: '/badges',
    id: v4(),
    isReactRouter: true,
    exact: true,
  },
];

export const Header = () => {
  return (
    <View css={styles.container}>
      <View css={styles.left}>
        <Navigation data={navItems} />
      </View>
      <View css={styles.right}>
        <Button size="small" backgroundColor="gray2" color="gray8" css={{ marginRight: '8px' }} radius={6}>
          Preview
        </Button>
        <Button
          radius={6}
          size="small"
          onClick={() => {
            // saveSetting.request(undefined)
          }}
        >
          Save Changes
        </Button>
      </View>
    </View>
  );
};
