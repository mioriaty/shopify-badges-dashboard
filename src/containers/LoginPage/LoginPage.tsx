import { Input } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Button from 'components/Button';
import { authorizationSelector, initializationSelector } from 'containers/InitializationPage';
import parser from 'html-react-parser';
import { useSelector } from 'react-redux';
import { View } from 'wiloke-react-core';
import { useActionValidateApp } from './actions/actionLogin';

export const Login = () => {
  const validate = useActionValidateApp();
  const { url } = useSelector(initializationSelector);
  const { loginStatus, message } = useSelector(authorizationSelector);

  const onFinish = (values: any) => {
    const { username, password } = values;

    if (url) {
      validate.request({ username, password, url });
    }
  };

  return (
    <View
      backgroundColor="light"
      css={{
        width: '100%',
        height: '100%',
        padding: '20px',
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <Form layout="vertical" name="basic" onFinish={onFinish}>
        <FormItem label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input size="small" style={{ borderRadius: '6px', height: '42px' }} />
        </FormItem>

        <FormItem
          style={{ marginBottom: '4px' }}
          label="Application Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input size="small" style={{ borderRadius: '6px', height: '42px' }} />
        </FormItem>

        {message && (
          <View row>
            <View css={{ paddingLeft: '5px', marginBottom: '5px' }} color="tertiary">
              {parser(message)}
            </View>
          </View>
        )}

        <View row css={{ marginBottom: '24px' }}>
          <View css={{ paddingLeft: '14px' }}>
            <View tagName="a" backgroundColor="light" color="primary" target="_blank" href="https://docs.wiloke.com/wookit/getting-started">
              Learn how to setup this feature
            </View>
          </View>
        </View>

        <FormItem>
          <Button loading={loginStatus === 'loading'} size="small" type="submit" radius={6}>
            Submit
          </Button>
        </FormItem>
      </Form>
    </View>
  );
};
