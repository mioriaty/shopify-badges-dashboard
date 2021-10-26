import { Header } from 'containers/Header';
import { MainTemplate } from 'template/Template';
import { View } from 'wiloke-react-core';

export const Manual = () => {
  return <MainTemplate Header={Header} Content={() => <View>a</View>} />;
};
