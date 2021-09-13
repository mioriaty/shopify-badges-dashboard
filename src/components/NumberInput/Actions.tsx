import { DOMAttributes, FC } from 'react';
import { LineAwesome, Size, View } from 'wiloke-react-core';
import * as css from './styles';

export interface ActionProps {
  size?: Exclude<Size, 'extra-small'>;
  increment?: DOMAttributes<HTMLElement>['onClick'];
  decrement?: DOMAttributes<HTMLElement>['onClick'];
}

const Action: FC<ActionProps> = ({ size = 'medium', increment, decrement }) => {
  return (
    <View css={css.actionsContainer}>
      <View onClick={increment} css={css.actionIncre}>
        <LineAwesome name="angle-up" css={css.icon(size)} />
      </View>
      <View onClick={decrement} css={css.actionDecre}>
        <LineAwesome name="angle-down" css={css.icon(size)} />
      </View>
    </View>
  );
};

export default Action;
