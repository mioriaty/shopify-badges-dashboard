import React, { ChangeEvent, FC, InputHTMLAttributes } from 'react';
import { Size, View, ViewProps } from 'wiloke-react-core';
import { classNames } from 'wiloke-react-core/utils';
import * as css from './styles';
import TextInputLoading from './TextInputLoading';

type InputType = 'text' | 'password' | 'email';

export interface TextInputProps extends ViewProps {
  /** Size của input */
  sizeInput?: Exclude<Size, 'extra-small'>;
  /** Placeholder của input */
  placeholder?: string;
  /** Bật lên input sẽ rộng 100% */
  block?: boolean;
  /** Kiểu đầu vào của input */
  type?: InputType;
  /** Giá trị đầu vào của input */
  value?: string;
  /** Khi bật disabled thì nút mờ đi và không thể thực hiện event */
  disabled?: boolean;
  /** Sự kiện onChange của input */
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
  /** Sự kiện onValueChange của input, trả về dữ liệu dạng string(chuỗi) */
  onValueChange?: (text: string) => void;
}

const TextInput: FC<TextInputProps> & {
  Loading: typeof TextInputLoading;
} = ({
  className,
  sizeInput = 'large',
  placeholder = '',
  block = false,
  type = 'text',
  defaultValue,
  value,
  disabled = false,
  borderColor = 'gray3',
  borderStyle = 'solid',
  borderWidth = 2,
  color = 'gray8',
  backgroundColor = 'light',
  radius = 10,
  onChange,
  onValueChange,
  ...rest
}) => {
  const _handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onValueChange?.(event.target.value);
      onChange?.(event);
    }
  };

  return (
    <View
      {...rest}
      className={classNames(className, 'TextInput-container')}
      css={[css.container(sizeInput, block, disabled), rest.css]}
      color={color}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderStyle={borderStyle}
      radius={radius}
    >
      <View
        autoFocus={rest.autoFocus}
        tagName="input"
        css={css.input(sizeInput)}
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={_handleChange}
      />
    </View>
  );
};

TextInput.Loading = TextInputLoading;

export default TextInput;
