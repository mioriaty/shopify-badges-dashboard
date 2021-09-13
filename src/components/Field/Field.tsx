import { Ref, useState } from 'react';
import { FC, memo, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { offset } from 'utils/offset';
import { LineAwesome, Text, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface FieldProps extends ViewProps {
  children: ReactNode;
  /** Label của field có thể có hoặc không */
  label?: ReactNode;
  /** Font-size của label */
  fontSize?: number;
  /** Note của Field */
  note?: ReactNode;
  innerRef?: Ref<HTMLElement>;
}

const Field: FC<FieldProps> = ({ label, children, color = 'gray8', fontSize = 14, note, innerRef, ...rest }) => {
  const [visibleNote, setVisibleNote] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const el = event.currentTarget as HTMLElement;
    const { top, left } = offset(el);
    setVisibleNote(true);
    setTop(top);
    setLeft(left);
  };

  const handleMouseLeave = () => {
    setVisibleNote(false);
  };
  return (
    <View {...rest} ref={innerRef} css={[styles.container, rest.css]}>
      <View css={styles.inner}>
        {!!label && (
          <Text color={color} size={fontSize} tagName="label" css={styles.label}>
            {label}
          </Text>
        )}
        {!!note && (
          <View css={styles.note}>
            <View onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <LineAwesome name="question-circle" size={18} color={color} colorHover="primary" css={{ paddingTop: '3px' }} />
            </View>
            {visibleNote && createPortal(<View css={styles.popover(top, left)}>{note}</View>, document.body)}
          </View>
        )}
      </View>
      {children}
    </View>
  );
};

export default memo(Field);
