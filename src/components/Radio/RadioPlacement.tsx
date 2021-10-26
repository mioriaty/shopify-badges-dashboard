import React, { FC } from 'react';
import { useRadioState } from './context';
import Radio, { RadioProps } from './Radio';

export interface RadioPlacementProps extends RadioProps {}

const RadioPlacement: FC<RadioPlacementProps> = props => {
  const stateContext = useRadioState();
  const { ...rest } = props;

  if (stateContext) {
    rest.checked = String(props.value) === stateContext.value;
    rest.disabled = props.disabled || (stateContext.disabled as boolean);
    rest.block = props.block || (stateContext.block as boolean);
  }
  return <Radio {...rest} variant="placement" />;
};

export default RadioPlacement;
