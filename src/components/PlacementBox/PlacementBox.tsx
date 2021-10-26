import { FC, useEffect, useState } from 'react';
import { LineAwesome, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface PlacementBoxProps extends ViewProps {
  value?: string | number;
  /** Trạng thái của checkbox */
  isSelected?: boolean;
}

const PlacementBox: FC<PlacementBoxProps> = ({ isSelected = false, ...rest }) => {
  const [isChecked, setChecked] = useState(isSelected);

  useEffect(() => {
    if (isChecked !== isSelected) {
      setChecked(isSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected]);

  return (
    <View {...rest} css={[styles.container, rest.css]} radius={10} className="placement-box-container">
      {isChecked && (
        <View css={styles.input}>
          <LineAwesome
            backgroundColor="primary"
            color="light"
            name="check"
            css={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            radius={50}
          />
        </View>
      )}

      {rest.children}
    </View>
  );
};

export default PlacementBox;
