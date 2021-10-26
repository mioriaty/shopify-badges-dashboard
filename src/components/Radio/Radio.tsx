import React, { FC, InputHTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { ColorNames, Size, Text, useStyleSheet, View } from 'wiloke-react-core';
import { memoization } from 'wiloke-react-core/utils';
import { useRadioAction, useRadioState } from './context';
import RadioButton from './RadioButton';
import RadioGroup from './RadioGroup';
import RadioPlacement from './RadioPlacement';
import * as css from './styles';

export type Value = string | number;

export type RadioVariant = 'default' | 'button' | 'placement';

export interface RadioProps {
  /** Size cua Radio va RadioButton */
  size?: Size;
  /** Trang thai checked cua Radio */
  checked?: boolean;
  /** Value radio input html */
  value?: Value;
  /** Name radio input html */
  name?: string;
  /** kieu cua radio */
  variant?: RadioVariant;
  /**className*/
  className?: string;
  /** Trang thai disabled cua Radio*/
  disabled?: boolean;
  /** block cua RadioButton */
  block?: boolean;
  /** Trang thai default cua Radio */
  defaultChecked?: boolean;
  /** Color khi active Radio */
  activeColor?: ColorNames;
  /** Color text khi active radio button */
  textActiveColor?: ColorNames;
  placement?: Placement;
  /** Su kien onChange */
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
  /** Su kien onChange lay value */
  onChangeValue?: (value: string) => void;
}

interface RadioStatic {
  Group: typeof RadioGroup;
  Button: typeof RadioButton;
  Placement: typeof RadioPlacement;
}

const Radio: FC<RadioProps> & RadioStatic = ({
  size = 'medium',
  checked = false,
  disabled = false,
  children,
  value,
  variant = 'default',
  name,
  textActiveColor = 'light',
  activeColor = 'primary',
  placement = 'topLeft',
  block = false,
  onChange,
  onChangeValue,
}) => {
  const { styles } = useStyleSheet();
  const stateContext = useRadioState();
  const onChangeContext = useRadioAction();
  if (stateContext) {
    name = stateContext.name;
    checked = String(value) === stateContext.value;
    disabled = disabled || (stateContext.disabled as boolean);
    size = stateContext.size as Size;
    activeColor = stateContext.activeColor as ColorNames;
    textActiveColor = stateContext.textActiveColor as ColorNames;
  }
  const [checkedState, setCheckedState] = useState(checked);

  const _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }
    setCheckedState(!checkedState);
    onChange?.(event);
    onChangeValue?.(event.target.value);
    onChangeContext?.(event);
  };

  useEffect(() => {
    if (checkedState !== checked) {
      setCheckedState(checked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const _renderRadioNative = () => {
    return (
      <input
        name={name}
        className={styles(css.radioNative(variant))}
        disabled={disabled}
        checked={checkedState}
        type="radio"
        onChange={_handleChange}
        value={value}
      />
    );
  };

  const _renderRadioIcon = () => {
    return (
      <Text
        tagName="span"
        borderColor={checkedState && !disabled ? activeColor : 'gray5'}
        radius="pill"
        borderWidth={2}
        borderStyle="solid"
        css={css.control(size)}
      >
        <Text radius="pill" css={[css.dotCheckBackground(checkedState, disabled, activeColor), css.dot(size, checked)]} />
      </Text>
    );
  };

  const mappingPlacement: Record<Placement, ReactNode> = {
    bottomLeft: <View css={[css.dotPlacement(checkedState), css.bottomLeft]} />,
    bottomRight: <View css={[css.dotPlacement(checkedState), css.bottomRight]} />,
    topLeft: <View css={[css.dotPlacement(checkedState), css.topLeft]} />,
    topRight: <View css={[css.dotPlacement(checkedState), css.topRight]} />,
    center: <View css={[css.dotPlacement(checkedState), css.center]} />,
  };

  const mappingRadioVariant: Record<RadioVariant, ReactNode> = {
    default: (
      <Text tagName="label" css={css.container(disabled, size)}>
        <Text tagName="span" css={css.radioWrapper}>
          {_renderRadioNative()}
          {_renderRadioIcon()}
        </Text>
        {children && (
          <Text css={{ padding: `0 8px`, display: 'inline-block', verticalAlign: 'middle' }} tagName="span">
            {children}
          </Text>
        )}
      </Text>
    ),
    button: (
      <Text
        color={checkedState ? textActiveColor : 'gray7'}
        tagName="label"
        borderStyle="solid"
        borderColor="inherit"
        css={[
          css.disabled(disabled),
          css.block(block),
          css.radioButtonContainer(size),
          css.radioButtonCheckBackground(checkedState, disabled, activeColor),
        ]}
      >
        <Text tagName="span" css={css.radioButtonWrapper}>
          {_renderRadioNative()}
        </Text>
        {children && (
          <Text css={{ position: 'relative', zIndex: 999 }} tagName="span">
            {children}
          </Text>
        )}
      </Text>
    ),
    placement: (
      <View
        width={48}
        height={48}
        backgroundColor="gray2"
        borderStyle="solid"
        borderWidth={2}
        radius={10}
        css={[css.placementContainer, css.checkedPlacemetBackground(checkedState), css.block(block), css.disabled(disabled)]}
      >
        {children ? children : mappingPlacement[placement]}
        <View
          disabled={disabled}
          value={value}
          name={name}
          tagName="input"
          css={css.input}
          checked={checkedState}
          type="radio"
          onChange={_handleChange}
        />
      </View>
    ),
  };

  return <>{mappingRadioVariant[variant]}</>;
};

Radio.Group = RadioGroup;
Radio.Button = RadioButton;
Radio.Placement = RadioPlacement;

export default memoization(Radio);
