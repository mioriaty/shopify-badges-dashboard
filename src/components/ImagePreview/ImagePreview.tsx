import placeHolderImage from 'assets/images/placeholder-image.png';
import { AnimationBox, AnimationBoxProps } from 'components/AnimationBox';
import Badge from 'components/Badge';
import { BadgeProps } from 'components/Badge/Badge';
import { FC, ReactNode } from 'react';
import { View } from 'wiloke-react-core';

import * as styles from './styles';

export interface ImagePreviewProps {
  src: string;
  height: number;
  width: number;
  html: string;
  texts: BadgeProps['texts'];
  sizeBadge: number;
  placement?: Placement;
  placementStyle?: PlacementStyle;
  animation?: AnimationBoxProps['animation'];
}

const ImagePreview: FC<ImagePreviewProps> = ({ src, texts, html, sizeBadge, animation = 'none', placement = 'topLeft', placementStyle }) => {
  const mappingPlacementBadge: Record<Placement, ReactNode> = {
    topLeft: (
      <View
        css={[styles.badget, styles.topleft]}
        style={{ top: `${placementStyle?.topLeft?.top}px`, left: `${placementStyle?.topLeft?.left}px`, width: `${sizeBadge}%` }}
      >
        <AnimationBox animation={animation}>
          <Badge css={{ display: 'grid', width: '100% !important' }} html={html} texts={texts} />
        </AnimationBox>
      </View>
    ),
    topRight: (
      <View
        css={[styles.badget, styles.topRight]}
        style={{ top: `${placementStyle?.topRight?.top}%`, left: `${placementStyle?.topRight?.right}%`, width: `${sizeBadge}%` }}
      >
        <AnimationBox animation={animation}>
          <Badge css={{ display: 'grid', width: '100% !important' }} html={html} texts={texts} />
        </AnimationBox>
      </View>
    ),
    bottomLeft: (
      <View
        css={[styles.badget, styles.bottomLeft]}
        style={{ top: `${placementStyle?.bottomLeft?.bottom}%`, left: `${placementStyle?.bottomLeft?.left}%`, width: `${sizeBadge}%` }}
      >
        <AnimationBox animation={animation}>
          <Badge css={{ display: 'grid', width: '100% !important' }} html={html} texts={texts} />
        </AnimationBox>
      </View>
    ),
    bottomRight: (
      <View
        css={[styles.badget, styles.bottomRight]}
        style={{ top: `${placementStyle?.bottomRight?.bottom}%`, left: `${placementStyle?.bottomRight?.right}%`, width: `${sizeBadge}%` }}
      >
        <AnimationBox animation={animation}>
          <Badge css={{ display: 'grid', width: '100% !important' }} html={html} texts={texts} />
        </AnimationBox>
      </View>
    ),
    center: (
      <View css={[styles.badget, styles.center]} style={{ width: `${sizeBadge}%` }}>
        <AnimationBox animation={animation}>
          <Badge css={{ display: 'grid', width: '100% !important' }} html={html} texts={texts} />
        </AnimationBox>
      </View>
    ),
  };

  return (
    <View css={styles.container}>
      {src ? (
        <View css={{ display: 'inline-block', position: 'relative', height: '320px' }}>
          <img src={src} style={{ height: '100%', maxWidth: '100%' }} />
          {mappingPlacementBadge[placement]}
        </View>
      ) : (
        <View width={460} height={320}>
          <img src={placeHolderImage} style={{ position: 'absolute', top: 0, left: 0, objectFit: 'cover', width: '100%', height: '100%' }} />
          {mappingPlacementBadge[placement]}
        </View>
      )}
    </View>
  );
};

export { ImagePreview };
