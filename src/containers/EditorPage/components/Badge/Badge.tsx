import { FC } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

interface BadgeProps extends ViewProps {
  isActive?: boolean;
}

export const Badge: FC<BadgeProps> = ({ isActive = false, children, ...rest }) => {
  return (
    <View {...rest} css={[styles.container(isActive), rest.css]}>
      <View css={styles.content}>{children}</View>
    </View>
  );
};
