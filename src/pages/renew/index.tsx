import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { getRenew } from '@/services/user';
import { useRequest } from '@umijs/max';
import { Tabs,Space,Tag } from 'antd-mobile'

export default function Page() {
  let [day,setDay]=useState(6);

  const { data,run,refresh } = useRequest(() => getRenew({
    pos:day
  }),{
    manual: true,
    refreshDeps: [day],
  });

  const callback=(key:string)=>{
    let count;
    console.log('onChange', key);
    count=Number(key)
    setDay(count)
    console.log(count,"xxxx") 
  }

  useEffect(()=>{ 
    let now = new Date();
    var dd = now.getDay(); 
    setDay[dd]   
    run()
    refresh()
  },[day,data])
  
  return (
    <div>
        <Tabs defaultActiveKey='1' onChange={callback} >
          <Tabs.Tab title='周一' key='0' >
          {
              data && data.topics.map((item:any,index:number)=> {
                return <div key={index}>
                  <div className='title'>
                  <Space>
                   <Tag color='danger'>{item.tags}</Tag>
                   <span className={styles.rnewtitle}>{item.title}</span>
                  </Space>
                  <p className={styles.author}>作者：{item.user.nickname}</p>
                  </div>
                  <div className={styles.img}>
                  <img src={item.cover_image_url} className={styles.renewimg} />
                  </div>
                  </div>
              })
            }
          </Tabs.Tab>
          <Tabs.Tab title='周二' key='1'>
          {
              data && data.topics.map((item:any,index:number)=> {
                return <div key={index}>
                  <div className='title'>
                  <Space>
                   <Tag color='danger'>{item.tags}</Tag>
                   <span className={styles.rnewtitle}>{item.title}</span>
                  </Space>
                  <p className={styles.author}>作者：{item.user.nickname}</p>
                  </div>
                  <div className={styles.img}>
                  <img src={item.cover_image_url} className={styles.renewimg} />
                  </div>
                  </div>
              })
            }
          </Tabs.Tab>
          <Tabs.Tab title='周三' key='2'>
          {
              data && data.topics.map((item:any,index:number)=> {
                return <div key={index}>
                  <div className='title'>
                  <Space>
                   <Tag color='danger'>{item.tags}</Tag>
                   <span className={styles.rnewtitle}>{item.title}</span>
                  </Space>
                  <p className={styles.author}>作者：{item.user.nickname}</p>
                  </div>
                  <div className={styles.img}>
                  <img src={item.cover_image_url} className={styles.renewimg} />
                  </div>
                  </div>
              })
            }
          </Tabs.Tab>
          <Tabs.Tab title='周四' key='3'>
          {
              data && data.topics.map((item:any,index:number)=> {
                return <div key={index}>
                  <div className='title'>
                  <Space>
                   <Tag color='danger'>{item.tags}</Tag>
                   <span className={styles.rnewtitle}>{item.title}</span>
                  </Space>
                  <p className={styles.author}>作者：{item.user.nickname}</p>
                  </div>
                  <div className={styles.img}>
                  <img src={item.cover_image_url} className={styles.renewimg} />
                  </div>
                  </div>
              })
            }
          </Tabs.Tab>
          <Tabs.Tab title='周五' key='4'>
          {
              data && data.topics.map((item:any,index:number)=> {
                return <div key={index}>
                  <div className='title'>
                  <Space>
                   <Tag color='danger'>{item.tags}</Tag>
                   <span className={styles.rnewtitle}>{item.title}</span>
                  </Space>
                  <p className={styles.author}>作者：{item.user.nickname}</p>
                  </div>
                  <div className={styles.img}>
                  <img src={item.cover_image_url} className={styles.renewimg} />
                  </div>
                  </div>
              })
            }
          </Tabs.Tab>
          <Tabs.Tab title='周六' key='5'>
            {
              data && data.topics.map((item:any,index:number)=> {
                return <div key={index}>
                  <div className='title'>
                  <Space>
                   <Tag color='danger'>{item.tags}</Tag>
                   <span className={styles.rnewtitle}>{item.title}</span>
                  </Space>
                  <p className={styles.author}>作者：{item.user.nickname}</p>
                  </div>
                  <div className={styles.img}>
                  <img src={item.cover_image_url} className={styles.renewimg} />
                  </div>
                  </div>
              })
            }
          </Tabs.Tab>
          <Tabs.Tab title='周日' key='6'>
          {
              data && data.topics.map((item:any,index:number)=> {
                return <div key={index}>
                  <div className='title'>
                  <Space>
                   <Tag color='danger'>{item.tags}</Tag>
                   <span className={styles.rnewtitle}>{item.title}</span>
                  </Space>
                  <p className={styles.author}>作者：{item.user.nickname}</p>
                  </div>
                  <div className={styles.img}>
                  <img src={item.cover_image_url} className={styles.renewimg} />
                  </div>
                  </div>
              })
            }
          </Tabs.Tab>
        </Tabs>
    </div>
  );
}
