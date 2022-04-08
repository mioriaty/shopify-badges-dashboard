import { Input } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Button from 'components/Button';
import { authorizationSelector, initializationSelector } from 'containers/InitializationPage';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { css, useStyleSheet, View } from 'wiloke-react-core';
import { ModalAntd } from 'components/ModalAntd';
import delay from 'utils/functions/delay';
import { usePopupPurchaseCode, useSetPurchaseCode, useVerifyPurchaseCode } from '.';

const modalClass = css`
  .ant-modal-footer {
    display: none !important;
  }
`;

export const VerificationPage = () => {
  const { purchaseCodeLink, email, clientSite, productName } = useSelector(initializationSelector);
  const { verificationStatus, message, popupPurchaseCode } = useSelector(authorizationSelector);
  const verification = useVerifyPurchaseCode();
  const setPurchaseCode = useSetPurchaseCode();
  const setVisible = usePopupPurchaseCode();
  const { styles } = useStyleSheet();

  const onFinish = async (values: any) => {
    const { purchaseCode } = values;
    if (purchaseCode) {
      verification.request({ email: email ?? '', clientSite: clientSite ?? '', purchaseCode, productName });
      setPurchaseCode(purchaseCode);

      if (verificationStatus === 'success') {
        await delay(2000);
        setVisible(false);
      }
    }
  };

  const _onClose = () => {
    setVisible(false);
  };

  return (
    <ModalAntd
      visible={popupPurchaseCode}
      className={styles(modalClass)}
      onCancel={_onClose}
      onOk={_onClose}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
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

        <FormItem>
          <Button loading={verificationStatus === 'loading'} block size="small" type="submit" radius={6}>
            Submit
          </Button>
        </FormItem>
      </Form>
    </ModalAntd>
  );
};
