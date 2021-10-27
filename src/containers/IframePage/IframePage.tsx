import { FRONTEND_URL } from 'utils/posrmessage';
import { View } from 'wiloke-react-core';
import * as styles from './style';

const IframePage = () => {
  return (
    <View css={styles.container}>
      <iframe id="frontend-iframe" src={FRONTEND_URL} />
    </View>
  );
};

export { IframePage };
