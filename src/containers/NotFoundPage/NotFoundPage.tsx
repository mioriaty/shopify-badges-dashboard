import Section from 'components/Section';
import React from 'react';
import { Text, View } from 'wiloke-react-core';

const NotFoundPage = () => {
  return (
    <View>
      <View container>
        <Section>
          <Text tagName="h1">404</Text>
        </Section>
      </View>
    </View>
  );
};

export default NotFoundPage;
