import SelectAntd, { SelectAntdProps } from 'components/SelectAntd';
import { FC, ReactNode } from 'react';
import { Image, Text, useStyleSheet, useTheme, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface SelectedProductsProps extends SelectAntdProps {
  title?: ReactNode;
}

const SelectedProducts: FC<SelectedProductsProps> = ({ title = 'Product Selected', ...rest }) => {
  const { colors } = useTheme();
  const { styles: css } = useStyleSheet(colors);

  return (
    <View css={styles.container}>
      <Text css={styles.title} color="gray7" size={15}>
        {title}
      </Text>
      <View css={{ width: '50%' }}>
        <SelectAntd
          className={css(styles.select)}
          {...rest}
          renderOption={item => {
            return (
              <View key={item.value} css={styles.selectOption} color="gray7">
                {item.image && (
                  <View css={styles.image}>
                    <Image src={item.image} />
                  </View>
                )}
                <View css={{ flex: 1, fontWeight: 500, textAlign: 'left' }}>{item.label}</View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export { SelectedProducts };
