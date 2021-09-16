import { View } from 'wiloke-react-core';
import { Badges } from './components/Badges/Badges';
import * as styles from './styles';

export const EditorPage = () => {
  return (
    <View css={styles.container}>
      <View css={styles.editorSidebar}>
        <Badges />
      </View>
      <View css={styles.preview}></View>
    </View>
  );
};
