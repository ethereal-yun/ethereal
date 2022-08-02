import React, { useState,useEffect } from 'react';
import styles from './index.less';
import { getChapter } from '@/services/user';
import { useRequest } from '@umijs/max';
import { Tabs } from 'antd-mobile'
import { StarOutline } from 'antd-mobile-icons';
import { connect } from '@umijs/max';
import { useSearchParams } from '@umijs/max';

const Page=({dispatch,list})=> {

  const [searchParams, setSearchParams] = useSearchParams();
  let id=Number(searchParams.get("id"));
  const { data } = useRequest(() => getChapter(searchParams.get("id")!));
  const [isList,setIsList]=useState(true)

  //初始化
  useEffect(()=>{
    setIsList(isStore())
  },[])
   const storeHandle=(data:any)=>{  
    if(isStore()){
      //已收藏
     setIsList(false)  
      dispatch({type: 'collect/unCollect',payload:data.id});  
    }else{
      //未收藏  
      setIsList(true)  
      dispatch({type: 'collect/isCollect',payload:data});
    }    
   }
    //dva中是否存在,是否收藏，返回true，则收藏,返回false，则未收藏
   function isStore(){  
    return list.some(item=>{   
      return item.id==id
    })   
   } 

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
          {
            data && <div className={styles.collect} style={{ color: !isList ? "" : "red" }} onClick={()=>storeHandle(data.topic_info)} >
            收藏
          <StarOutline className={styles.col} style={{ color: !isList ? "" : "red" }} />
          </div>
          }
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

 export default connect(({ collect }) => ({
  list: collect.list,
}))(Page);


