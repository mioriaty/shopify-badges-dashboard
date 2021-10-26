import { FC, ReactNode } from 'react';
import { useStyleSheet, View } from 'wiloke-react-core';
import { animations } from './animations';
import * as styles from './styles';

export interface AnimationBoxProps {
  animation?: AnimationType;
}

const AnimationBox: FC<AnimationBoxProps> = ({ animation = 'none', children }) => {
  const { renderer } = useStyleSheet();
  renderer.renderStatic(animations);

  const mappingAnimation: Record<AnimationType, ReactNode> = {
    none: <View>{children}</View>,
    bounce: (
      <View className="bounce" css={styles.bounce}>
        {children}
      </View>
    ),
    flash: <View css={styles.flash}>{children}</View>,
    shake: <View css={styles.shake}>{children}</View>,
    zoomIn: <View css={styles.zoomIn}>{children}</View>,
    tada: <View css={styles.tada}>{children}</View>,
    flip: <View css={styles.flip}>{children}</View>,
  };

  return (
    <View css={styles.container} className="Animation-container">
      {mappingAnimation[animation]}
    </View>
  );
};

export { AnimationBox };
