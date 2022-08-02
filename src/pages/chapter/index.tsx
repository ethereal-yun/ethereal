import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { getChapter } from '@/services/user';
import { Tabs, Toast, Button, Popup, Space, TextArea, Form, Dialog, Input, Card } from 'antd-mobile'
import { StarOutline } from 'antd-mobile-icons'
import { useSearchParams, useNavigate, useRequest } from '@umijs/max';
import ImageUploader, { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
import { mockUpload } from './utils';
import { connect } from '@umijs/max';

const Page=({dispatch,list})=> {
  const [SearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data } = useRequest(() => getChapter(SearchParams.get('id')!), { cacheKey: 'chapter' });
  const [plist, setList] = useState([]) as any;
  const [visible1, setVisible1] = useState(false);
  const [fileList, setFileList] = useState<ImageUploadItem[]>([{ url: '' },]);
  const onFinish = (values: any) => {
    console.log(values);
    setList([...plist, values]);
    Dialog.alert({
      content: "评论成功",
      closeOnMaskClick: true,
    })
    setVisible1(false);
  }
  const GoContent = (locked_code: string, need_vip: boolean, id: string, title: string) => {
    if (locked_code == '200' && !need_vip) {
      navigate(`/content/${id}?title=${title}`)
    } else if(need_vip){
      Toast.show({
        content: '当前是vip章节,升级会员后方可解锁观看',
        maskClickable: false,
        duration: 2000,
      })
    }else{
      Toast.show({
        content: '当前是付费章节,付费后方可解锁观看',
        maskClickable: false,
        duration: 2000,
      })
    }
  }
  console.log(data);
  return (
    <div>
      <img className={styles.maximg} src={data && data.topic_info.cover_image_url} />
      <div className={styles.detail}>
        <div className={styles.pic}>
          <img className={styles.minimg} src={data && data.topic_info.vertical_image_url} />
        </div>
        <div className={styles.detright}>
          <h2 className={styles.title}>{data && data.topic_info.title}</h2>
          <p className={styles.descript}>作者：{data && data.topic_info.user.nickname}</p>
          <p>人气：{data && data.topic_info.popularity_info}</p>
          <p>类型：{data && data.topic_info.tags.map((item: any, index: number) => {
            return <span key={index}>{item}</span>
          })}</p>
          <div className={styles.collect}>
            收藏
            <StarOutline className={styles.col} />
          </div>
        </div>
      </div>
      <div className={styles.intro}>
        <h2 className={styles.introtit}>漫画简介</h2>
        <span>{data && data.topic_info.description}</span>
      </div>

      <Tabs>
        <Tabs.Tab title='章节列表' key='lists'>
          {
            data && data.topic_info.comics.map((item: any, index: number) => {
              return <div key={index} className={styles.listitem} onClick={() => GoContent(item.locked_code, item.need_vip, item.id, item.title)}>
                <div>
                  <img className={styles.listimg} src={item.cover_image_url} />
                </div>
                <div>
                  <h3 className={styles.listitle}>{item.title}</h3>
                  <p className={styles.data}><span className={styles.span}>{item.need_vip ? item.label_info.text : ""}{(item.locked_code == 10103) ? '付费章节':""}</span>{item.created_at}</p>
                </div>
              </div>
            })
          }
        </Tabs.Tab>
        <Tabs.Tab title='评价留言' key='message'>
          <Button block color='primary' size='large' onClick={() => { setVisible1(true) }}>
            去评价
          </Button>
          <Space direction='vertical'>
            <Popup visible={visible1} onMaskClick={() => { setVisible1(false) }} bodyStyle={{ minHeight: '40vh' }}>
              <Form onFinish={onFinish} footer={<Button block type='submit' color='primary' size='large'>提交</Button>}>
                <Form.Header>
                  <Form.Item name='title'>
                    <Input placeholder='请输入标题' clearable />
                  </Form.Item>
                </Form.Header>
                <Form.Item name='text'>
                  <TextArea defaultValue={''} showCount />
                </Form.Item>
                <Form.Item name='url'>
                  <ImageUploader value={fileList} onChange={setFileList} upload={mockUpload} />
                </Form.Item>
              </Form>
            </Popup>
          </Space>
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}
export default connect(({ collect }) => ({
  list: collect.list,
}))(Page);

