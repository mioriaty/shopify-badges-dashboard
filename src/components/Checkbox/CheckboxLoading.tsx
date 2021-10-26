import React, { FC, memo } from 'react';
import { Radius, View } from 'wiloke-react-core';

export interface CheckboxLoadingProps {
  radius?: Radius;
}

const CheckboxLoading: FC<CheckboxLoadingProps> = ({ radius = 6 }) => {
  return (
    <View height={24} radius={6} tachyons={['flex', 'items-center']}>
      <View width={24} height={24} backgroundColor="gray4" radius={radius}></View>
    </View>
  );
};

export default memo(CheckboxLoading);
