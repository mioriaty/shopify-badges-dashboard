import Field from 'components/Field';
import SelectAntd from 'components/SelectAntd';
import { TextInput } from 'components/TextInput';
import { TextInputWrapper } from 'components/TextInputWrapper';
import { Svg1, Svg2, Svg3, Svg4 } from 'svgs';
import { css, GridSmart, useTheme, View } from 'wiloke-react-core';
import { Badge } from '../Badge';
import * as styles from './styles';

export const Badges = () => {
  const { colors } = useTheme();

  return (
    <View css={styles.container}>
      <Field
        css={css`
          display: flex;
          margin-bottom: 25px;
        `}
      >
        <View
          css={css`
            flex: 1 1 34.65%;
            margin-right: 4px;
            @media (min-width: 768px) {
              margin-right: 10px;
            }
          `}
        >
          <SelectAntd />
        </View>
        <View
          css={css`
            flex: 1 1 62.79%;
          `}
        >
          <TextInputWrapper searching onClear={() => {}}>
            <TextInput borderColor="gray3" borderWidth={2} radius={10} block placeholder="Search badges" />
          </TextInputWrapper>
        </View>
      </Field>
      <Field label="Choose Badges" css={{ marginBottom: '10px' }}>
        <GridSmart columnGap={10} columnWidth={90} columnCount={4}>
          <Badge children={<Svg1 />} />
          <Badge children={<Svg2 />} />
          <Badge children={<Svg3 />} />
          <Badge children={<Svg4 />} />
        </GridSmart>
      </Field>
      <View css={{ backgroundColor: colors.gray2, marginLeft: '-30px', marginRight: '-30px', padding: '10px 30px', marginBottom: '10px' }}>
        <Field label="Showing Similar Badges" css={{ marginBottom: 0 }}>
          <GridSmart columnGap={10} columnWidth={60} columnCount={5}>
            <Badge css={{ border: 'none' }} />
            <Badge css={{ border: 'none' }} />
            <Badge css={{ border: 'none' }} />
            <Badge css={{ border: 'none' }} />
            <Badge css={{ border: 'none' }} />
          </GridSmart>
        </Field>
      </View>
      <View>
        <GridSmart columnGap={10} columnWidth={90} columnCount={4}>
          <Badge />
          <Badge />
          <Badge />
          <Badge />
          <Badge />
          <Badge />
          <Badge />
          <Badge />
        </GridSmart>
      </View>
    </View>
  );
};
