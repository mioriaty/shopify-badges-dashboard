import { Header } from 'containers/Header';
import { FC } from 'react';
import { MainTemplate } from 'template/Template';
import { View } from 'wiloke-react-core';
import { SideBar } from './components';

const HomePage: FC = () => {
  return <MainTemplate Header={Header} Content={() => <View />} Sidebar={SideBar} />;
};

export default HomePage;
