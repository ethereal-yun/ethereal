import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { getRenew } from '@/services/user';
import { useRequest,useNavigate } from '@umijs/max';
import { Tabs,Space,Tag } from 'antd-mobile'

export default function Page() {
  let [day,setDay]=useState(6);
  const navigate = useNavigate();

  const { data:rdata,run,refresh } = useRequest(() => getRenew({
    pos:day
  }),{
    manual: true
  });

  const callback=(key:string)=>{
    let count;
    // console.log('onChange', key);
    count=Number(key)
    setDay(count)
    day = count;
    // console.log(count,"xxxx") 
    refresh()
  }

  const goContent = (id:string,title:string) => {
       navigate(`/chapter/?title=${title}&id=${id}`)
  }


  useEffect(()=>{   
    run()
  },[])
  
  return (
    <div>
        <Tabs defaultActiveKey='0' onChange={callback} >
           {
             rdata && rdata.week_days.map((item:any,index:number)=>{
               return <Tabs.Tab title={item} key={index}>
                 {
              rdata && rdata.topics.map((item:any,index:number)=> {
                return <div key={index} onClick={()=>goContent(item.id,item.title)}>
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
             })
           }
        </Tabs>
    </div>
  );
}
