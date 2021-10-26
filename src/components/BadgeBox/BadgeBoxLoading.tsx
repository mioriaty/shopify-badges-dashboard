import { FC } from 'react';
import { ActivityIndicator, css, View, ViewProps } from 'wiloke-react-core';

const styles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  position: relative;
  padding: 10px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 0;
    width: 100%;
    padding-top: 100%;
  }
`;

const BadgeBoxLoading: FC<{ width?: number; height?: number; css?: ViewProps['css'] }> = ({ width = 85, height = 85, css }) => {
  return (
    <View
      width={width}
      height={height}
      css={[styles, css]}
      radius={10}
      borderColor="gray2"
      borderStyle="solid"
      borderWidth={2}
      backgroundColor="light"
    >
      <View css={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <ActivityIndicator size="medium" />
      </View>
    </View>
  );
};

export { BadgeBoxLoading };
