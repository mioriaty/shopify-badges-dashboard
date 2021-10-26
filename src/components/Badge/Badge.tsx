import { FC } from 'react';
import { createBadgeSvg } from 'utils/createBadgeSvg';
import { View, ViewProps } from 'wiloke-react-core';

export interface BadgeProps {
  texts: SvgType[];
  html: string;
  width?: number;
  css?: ViewProps['css'];
}

const Badge: FC<BadgeProps> = ({ width = 100, texts, html, css }) => {
  return html ? (
    <View
      dangerouslySetInnerHTML={{
        __html: createBadgeSvg({
          texts,
          html,
        }),
      }}
      css={css}
      style={{
        width: `${width}px`,
      }}
    />
  ) : (
    <></>
  );
};

export default Badge;
