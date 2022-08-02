import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { queryContent } from "@/services/user";
import { useRequest, history, useParams,useNavigate } from '@umijs/max';
import { Image, Button, Toast, Divider, Card } from 'antd-mobile';
import { MessageOutline } from 'antd-mobile-icons';
import '@/assets/iconfont/iconfont.css';
export default function Page() {
  const params = useParams();
  const navigate = useNavigate();
  const [id, setId] = useState("1");
  const [flag1, setFlag1] = useState(false)
  const [flag2, setFlag2] = useState(false)
  const { data, loading: dloading } = useRequest(() => queryContent(params.id!), { cacheKey: 'content' })
  const { data: cdata, loading: cloading, run } = useRequest(() => queryContent(id), { refreshDeps: [id] })
  const gopre = (id: string) => {
    setId(id);
    setFlag1(true);
    if (cdata.code != 200) {
      Toast.show({
        content: '加载失败，请重试',
        maskClickable: false,
        duration: 2000,
      });
      setTimeout(() => {
        setFlag1(false);
      }, 2000)
    } else {
      history.push(`/content/${id}?title=${cdata.comic_info.title}`);
      window.location.reload();
      setFlag1(false);
    }
  }
  const gonext = (id: string) => {
    setId(id);
    setFlag2(true);
    if (cdata.code != 200) {
      Toast.show({
        content: '加载失败，请重试',
        maskClickable: false,
        duration: 2000,
      })
      setTimeout(() => {
        setFlag2(false);
      }, 2000)
    } else {
      history.push(`/content/${id}?title=${cdata.comic_info.title}`);
      window.location.reload();
      setFlag2(false);
    }
  }
  useEffect(() => {
    run();
  }, [id])
  return (
    <div className={styles.cont}>
      {
        data && <div>
          {
            data.comic_info.comic_images && data.comic_info.comic_images.map((item: any) => {
              return <Image key={item.url} src={item.url} width={375} height={293} fit='fill'></Image>
            })

          }
          <div className={styles.btn}>
            <Button className={styles.button1} loading={flag1 ? true : false} loadingText='正在加载' disabled={data.previous_comic_info ? false : true} onClick={() => gopre(data.previous_comic_info.id)} color='success' shape='rectangular' size='large'>上一话</Button>
            <Divider className={styles.vertical} direction='vertical' />
            <Button className={styles.button2} loading={flag2 ? true : false} loadingText='正在加载' disabled={data.next_comic_info ? false : true} onClick={() => gonext(data.next_comic_info.id)} color='success' shape='rectangular' size='large'>下一话</Button>
          </div>
          <Card title='同类推荐'>
            {
              data.recommend_topics && data.recommend_topics.map((item: any) => {
                return <div key={item.id} className={styles.retopics} onClick={()=>{navigate(`/chapter?id=${item.id}&title=${item.title}`)}}>
                  <Image src={item.vertical_image_url} width={375} height={293} fit='fill'></Image>
                  <p className={styles.title}>{item.title}</p>
                  <p className={styles.icon}><i className='iconfont icon-dianzan'/>{item.likes_count}</p>
                  <p className={styles.cmnts} ><MessageOutline/>{item.comments_count}</p>
                </div>
              })
            }
          </Card>
        </div>
      }
    </div>
  );
}
