import Tabs from 'components/Tabs';
import { FC, useState } from 'react';
import { View } from 'wiloke-react-core';

const HomePage: FC = () => {
  const [activeTabKey, setTabKey] = useState('products');

  const handleChangeTab = (activeKey: string) => {
    setTabKey(activeKey);
  };

  return (
    <View>
      <Tabs activeKey={activeTabKey} defaultActiveKey={activeTabKey} onChange={handleChangeTab}>
        <Tabs.Pane key="products" tab={'Products'} />
        <Tabs.Pane key="badges" tab={'Badges'} />
        <Tabs.Pane key="advance-setting" tab={'Advance setting'} />
        <Tabs.Pane key="faqs" tab={'FAQs'} />
        <Tabs.Pane key="pricing" tab={'Pricing'} />
        <Tabs.Pane key="support" tab={'Support'} />
      </Tabs>
    </View>
  );
};

export default HomePage;
