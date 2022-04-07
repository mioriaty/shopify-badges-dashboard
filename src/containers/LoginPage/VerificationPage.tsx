import { Input } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Button from 'components/Button';
import { authorizationSelector, initializationSelector } from 'containers/InitializationPage';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { View } from 'wiloke-react-core';
import { useSetPurchaseCode, useVerifyPurchaseCode } from '.';

export const VerificationPage = () => {
  const { purchaseCodeLink, email, clientSite, productName } = useSelector(initializationSelector);
  const { verificationStatus, message } = useSelector(authorizationSelector);
  const verification = useVerifyPurchaseCode();
  const setPurchaseCode = useSetPurchaseCode();

  const onFinish = async (values: any) => {
    const { purchaseCode } = values;
    if (purchaseCode) {
      verification.request({ email: email ?? '', clientSite: clientSite ?? '', purchaseCode, productName });
      setPurchaseCode(purchaseCode);

      // if (statusResponse === 'success') {
      //   await delay(2000);
      //   setVisible(false);
      // }
    }
  };

  return (
    <Form layout="vertical" name="basic" onFinish={onFinish}>
      <FormItem
        style={{ marginBottom: '10px' }}
        label="Purchase Code"
        name="purchaseCode"
        rules={[{ required: true, message: 'Please input your evanto purchase code!' }]}
      >
        <Input size="large" style={{ borderRadius: '6px' }} />
      </FormItem>

      {message && ( // thay verificationStatus = status response
        <View css={{ paddingLeft: '5px', marginBottom: '5px' }} color={verificationStatus === 'success' ? 'success' : 'tertiary'}>
          {parse(message)}
        </View>
      )}

      {purchaseCodeLink && (
        <View css={{ paddingLeft: '5px', marginBottom: '10px' }}>
          <View tagName="a" backgroundColor="light" color="primary" target="_blank" href={purchaseCodeLink}>
            Where is my purchase code?
          </View>
        </View>
      )}
      <View css={{ paddingLeft: '5px', marginBottom: '10px' }}>
        <View tagName="a" backgroundColor="light" color="primary" target="_blank" href={''}>
          Buy pro version now
        </View>
      </View>

      <FormItem>
        <Button loading={verificationStatus === 'loading'} block size="small" type="submit" radius={6}>
          Submit
        </Button>
      </FormItem>
    </Form>
  );
};
