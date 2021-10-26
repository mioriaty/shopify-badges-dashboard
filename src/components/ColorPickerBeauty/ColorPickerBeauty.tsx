import ColorPicker, { ColorPickerProps } from 'components/ColorPicker';
import Box from 'components/FieldBox';
import React, { FC } from 'react';
import { ColorNames, Radius, Text, View, ViewProps } from 'wiloke-react-core';
import ColorPickerBeautyLoading from './ColorPickerBeautyLoading';
import * as css from './styles';

export interface ColorPickerBeautyProps
  extends Pick<ColorPickerProps, 'pickerType' | 'placement' | 'strategy' | 'onChange' | 'onChangeComplete'>,
    Pick<ViewProps, 'borderWidth' | 'borderStyle' | 'borderColor'> {
  /** Background color của box */
  backgroundInnerField?: ColorNames;
  /** Radius của field box */
  radiusBox?: Radius;
  /** Radius của color picker */
  radiusPicker?: Radius;
  value?: string;
}

const ColorPickerBeauty: FC<ColorPickerBeautyProps> & {
  Loading: typeof ColorPickerBeautyLoading;
} = ({
  placement = 'bottom-start',
  backgroundInnerField = 'light',
  strategy = 'absolute',
  value,
  borderStyle = 'solid',
  borderColor = 'gray3',
  radiusPicker = 5,
  radiusBox = 10,
  borderWidth = 2,
  pickerType,
  onChange,
  onChangeComplete,
}) => {
  return (
    <Box
      backgroundColor={backgroundInnerField}
      borderColor={borderColor}
      borderStyle={borderStyle}
      borderWidth={borderWidth}
      radius={radiusBox}
      css={css.box}
    >
      <View css={css.inner}>
        <ColorPicker
          pickerType={pickerType}
          radius={radiusPicker}
          placement={placement}
          strategy={strategy}
          color={value}
          onChange={onChange}
          onChangeComplete={onChangeComplete}
          renderAfter={color => (
            <View css={css.colorDetailsContainer}>
              <Text css={css.colorDetails}>{color}</Text>
            </View>
          )}
        />
      </View>
    </Box>
  );
};

ColorPickerBeauty.Loading = ColorPickerBeautyLoading;

export default ColorPickerBeauty;
