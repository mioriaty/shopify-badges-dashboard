import { FC, ReactNode, useEffect, useState } from 'react';
import { ImageProps, View, ViewProps } from 'wiloke-react-core';
import ImagePreviewLoading from './ImagePreviewLoading';
import * as styles from './styles';

export interface ImagePreviewProductProps extends ViewProps {
  imageSrc: ImageProps['src'];
  badgetPlacement?: Placement;
}

const ImagePreviewProduct: FC<ImagePreviewProductProps> & {
  Loading: typeof ImagePreviewLoading;
} = ({ imageSrc, badgetPlacement = 'topLeft', ...rest }) => {
  const [src, setSrc] = useState(imageSrc);

  useEffect(() => {
    if (src !== imageSrc) {
      setSrc(imageSrc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc]);

  const mappingPlacementBadget: Record<Placement, ReactNode> = {
    topLeft: <View css={[styles.badget, styles.topleft]}>{rest.children}</View>,
    topRight: <View css={[styles.badget, styles.topRight]}>{rest.children}</View>,
    bottomLeft: <View css={[styles.badget, styles.bottomLeft]}>{rest.children}</View>,
    bottomRight: <View css={[styles.badget, styles.bottomRight]}>{rest.children}</View>,
    center: <View css={[styles.badget, styles.center]}>{rest.children}</View>,
  };

  return (
    <View {...rest} css={[styles.container, rest.css]} backgroundColor="gray3">
      <View css={styles.imageContainer}>
        {!!src ? (
          <View tagName="img" draggable={false} backgroundColor="light" css={styles.image} src={src as string} />
        ) : (
          <View css={styles.image} backgroundColor="gray4" />
        )}
        {mappingPlacementBadget[badgetPlacement]}
      </View>
    </View>
  );
};

ImagePreviewProduct.Loading = ImagePreviewLoading;

export default ImagePreviewProduct;
