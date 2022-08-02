import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { queryContent } from "@/services/user";
import { useRequest, history, useParams, useNavigate } from '@umijs/max';
import { Image, Toast, Card} from 'antd-mobile';
import { LeftOutline, MessageOutline, RightOutline } from 'antd-mobile-icons';
import '@/assets/iconfont/iconfont.css';

export default function Page() {
  const params = useParams();
  const navigate = useNavigate();
  const [id, setId] = useState("1");
  const [flag, setFlag] = useState(false)
  const { data, loading: dloading } = useRequest(() => queryContent(params.id!), { cacheKey: 'content' })
  const { data: cdata, loading: cloading, run } = useRequest(() => queryContent(id), { refreshDeps: [id] })
  const Go = (e: any, id: string) => {
    //阻止事件冒泡
    e.stopPropagation();
    setId(id);
    if (cdata.code != 200) {
      Toast.show({
        content: '加载失败，请重试',
        maskClickable: false,
        duration: 2000,
      })
    } else {
      history.push(`/content/${id}?title=${cdata.comic_info.title}`);
      window.location.reload();
      setFlag(false);
    }
  }
  console.log(params.id, data);
  useEffect(() => {
    run();
  }, [id])
  console.log(data);
  return (
    <div className={styles.cont} onClick={() => setFlag(!flag)}>

      {
        data && <div>
          {
            data.comic_info.comic_images && data.comic_info.comic_images.map((item: any) => {
              return <Image key={item.url} src={item.url} width={375} height={293} fit='fill'></Image>
            })
          }
          {
            flag ? <div>
              {
                data.previous_comic_info && <div onClick={(e: any) => Go(e, data.previous_comic_info.id)}>
                  <LeftOutline className={styles.showLeft} fontSize={48} color='var(--adm-color-primary)' />
                </div>
              }
              {
                data.next_comic_info && <div onClick={(e: any) => Go(e, data.next_comic_info.id)}>
                  <RightOutline className={styles.showRight} fontSize={48} color='var(--adm-color-primary)' />
                </div>
              }
            </div> : ""
          }
          <Card title='同类推荐'>
            {
              data.recommend_topics && data.recommend_topics.map((item: any) => {
                return <div key={item.id} className={styles.retopics} onClick={() => { navigate(`/chapter?id=${item.id}&title=${item.title}`) }}>
                  <Image src={item.vertical_image_url} width={375} height={293} fit='fill'></Image>
                  <p className={styles.title}>{item.title}</p>
                  <p className={styles.icon}><i className='iconfont icon-dianzan' />{item.likes_count}</p>
                  <p className={styles.cmnts} ><MessageOutline />{item.comments_count}</p>
                </div>
              })
            }
          </Card>
        </div>
      }
    </div>
  );
}
