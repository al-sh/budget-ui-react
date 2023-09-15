import { notification } from 'antd';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UI_ROUTES } from '../../constants/urls';
import { getApi } from '../../services/Api';
import { getStorage } from '../../services/Storage';
import { Form, Input, Button } from 'antd';
import { API_ROUTES } from '../../constants/api-routes';
import { AuthPasswordRequestBody, AuthResponse } from '../../types/auth';

export const LoginPage: React.FC = () => {
  const api = getApi();
  const storage = getStorage();
  const navigate = useNavigate();

  const handleFinish = useCallback(
    async (formValues: AuthPasswordRequestBody) => {
      try {
        const response = await api.send<AuthResponse, AuthPasswordRequestBody>({
          data: formValues,
          endpoint: API_ROUTES.AUTH + '/password',
          method: 'POST',
        });
        console.log('response: ', response);
        storage.setItem('token', response.token);
        storage.setItem('userId', String(response.userId));
        navigate(UI_ROUTES.HOME);
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (e?.response?.status === 403) {
          notification.error({ message: 'Неправильный логин/пароль' });
        } else {
          notification.error({ message: 'Произошла ошибка авторизации. Повторите попытку позже.' });
        }
      }
    },
    [api, navigate, storage]
  );

  const onFinishFailed = useCallback((errorInfo) => {
    console.log('Failed:', errorInfo);
  }, []);

  return (
    <>
      <h2>Login</h2>
      <div style={{ width: 500 }}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          layout="vertical"
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            login: 'demo',
            password: 'demo',
          }}
          onFinish={handleFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Логин"
            name="login"
            rules={[
              {
                message: 'Введите логин',
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                message: 'Введите пароль',
                required: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Вход
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
