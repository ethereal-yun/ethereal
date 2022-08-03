import React, { useState, useEffect } from 'react';
import './index.less';
import { Form, Input, Button, ImageUploader,Dialog } from 'antd-mobile'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'
import { connect,useNavigate } from '@umijs/max';
import { useRequest } from '@umijs/max';
import { createlogin} from "@/services/user";

const Demo= ({ dispatch }) => {
  const navigate = useNavigate();
  const onFinish = async(values: any) => {
    const res=await createlogin({username:values.username,password:values.password})
    if(res.status==200){
      Dialog.alert({
        content: "登录成功",
      })
      //存到dva
      dispatch({type: 'user/setLogin',payload:res}); 
      //存到本地
      localStorage.setItem("userinfo",JSON.stringify(res))
      navigate("/me")
      
    }else if(res.status==400){
      Dialog.alert({
        content: res.msg,
      })
    }
  };
  
  return (
    <div>
      <Form
        onFinish={onFinish}
        layout='horizontal'
        footer={
          <Button block type='submit' color='success' size='large'>
            提交
          </Button>
        }
      >
        <Form.Header>登录</Form.Header>
        <Form.Item
          name='username'
          label='姓名'
          rules={[{ required: true, message: '姓名不能为空' }]}
        >
          <Input  placeholder='请输入姓名' />
        </Form.Item>
        <Form.Item
          name='password'
          label='密码'
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input placeholder='请输入密码'  type='password' />
        </Form.Item>
      </Form>

    </div>
  );
}
export default connect(({ user }) => ({
  users: user.users,
}))(Demo);
