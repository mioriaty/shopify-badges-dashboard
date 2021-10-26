import { FC } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import { BadgeBoxLoading } from './BadgeBoxLoading';
import * as styles from './styles';

export interface BadgeBoxProps extends ViewProps {
  isActive?: boolean;
}

const BadgeBox: FC<BadgeBoxProps> & { Loading: typeof BadgeBoxLoading } = ({ isActive = false, children, ...rest }) => {
  return (
    <View {...rest} css={[styles.container(isActive), rest.css]}>
      <View css={styles.content}>{children}</View>
    </View>
  );
};

BadgeBox.Loading = BadgeBoxLoading;

export default BadgeBox;
