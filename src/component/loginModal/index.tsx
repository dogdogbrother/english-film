import { Modal } from 'antd'
import { observer } from "mobx-react-lite"
import userStore from '@/store/user'
import { Form, Input, Button } from 'antd'
import styled from '@emotion/styled'
import { useState } from 'react'
import type { LoginProp } from '@/api/user'

function LoginModal() {
  const { state } = userStore
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  function onFinish(values: LoginProp) {
    console.log(values)
    setLoading(true)
  }
  return <Modal destroyOnClose={true} width={340} style={{ top: 200 }} footer={false} open={state}>
    <FormBox>
      <Form preserve={false} form={form} onFinish={onFinish}>
        <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder='请输入用户名'/>
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder='请输入密码'/>
        </Form.Item>
        <Form.Item  >
          <Button type='primary' htmlType='submit' loading={loading} block>登 录</Button>
        </Form.Item>
      </Form>
    </FormBox>
  </Modal>
}

const FormBox = styled.div` 
  padding-top: 35px;
`

export default observer(LoginModal)