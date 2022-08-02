import React from 'react';
import styles from './index.less';
import { getChapter } from '@/services/user';
import { useRequest } from '@umijs/max';
import { Tabs,Space } from 'antd-mobile'
import { StarOutline } from 'antd-mobile-icons'

export default function Page() {
  const { data } = useRequest(() => getChapter(1749));
  // console.log(data);


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
          <p>类型：{data && data.topic_info.tags.map((item:any,index:number)=>{
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
           data && data.topic_info.comics.map((item:any,index:number)=>{
             return <div key={index} className={styles.listitem}>
               <div>
               <img className={styles.listimg} src={item.cover_image_url} />
               </div>
               <div>
               <h3 className={styles.listitle}>{item.title}</h3>
               <p className={styles.data}>{item.created_at}</p>
               </div>
               </div>
             })
          }
          </Tabs.Tab>
          <Tabs.Tab title='评价留言' key='message'>
            暂无评价
          </Tabs.Tab>
        </Tabs>
    </div>
  );
}
