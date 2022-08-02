import React, { useState, useEffect, CSSProperties } from 'react';
import styles from './index.less';
import { queryContent, getChapter } from "@/services/user";
import { useRequest, history, useParams, useNavigate, useSearchParams } from '@umijs/max';
import { Image, Toast, Card, Space, Button, Popup, InfiniteScroll, List } from 'antd-mobile';
import { Divider } from 'antd';
import { LeftOutline, MessageOutline, RightOutline } from 'antd-mobile-icons';
import { List as VirtualizedList, AutoSizer } from 'react-virtualized';
import '@/assets/iconfont/iconfont.css';

export default function Page() {
  const params = useParams();
  const [SearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [id, setId] = useState("1");
  const [flag, setFlag] = useState(false);
  const [btnPre, setbtnPre] = useState(false);
  const [btnNext, setbtnNext] = useState(false);
  const { data, loading: dloading } = useRequest(() => queryContent(params.id!), { cacheKey: 'content' });
  const { data: pdata, loading: ploading } = useRequest(() => getChapter(SearchParams.get("val")!), { cacheKey: 'chapter' });
  const { data: cdata, loading: cloading, run } = useRequest(() => queryContent(id), { refreshDeps: [id] })
  const GoPre = (e: any, id: string) => {
    //阻止事件冒泡
    e.stopPropagation();
    setId(id);
    setbtnPre(true)
    if (cdata.code != 200) {
      Toast.show({
        content: '加载失败，请重试',
        maskClickable: false,
        duration: 2000,
      })
      setTimeout(() => {
        setbtnPre(false);
      }, 2000)
    } else {
      history.push(`/content/${id}?title=${cdata.comic_info.title}&val=${pdata.topic_info.id}`);
      window.location.reload();
      setFlag(false);
      setbtnPre(false)
    }
  }
  const GoNext = (e: any, id: string) => {
    //阻止事件冒泡
    e.stopPropagation();
    setId(id);
    setbtnNext(true);
    if (cdata.code != 200) {
      Toast.show({
        content: '加载失败，请重试',
        maskClickable: false,
        duration: 2000,
      })
      setTimeout(() => {
        setbtnNext(false);
      }, 2000)
    } else {
      history.push(`/content/${id}?title=${cdata.comic_info.title}&val=${pdata.topic_info.id}`);
      window.location.reload();
      setFlag(false);
      setbtnNext(false);
    }
  }
  const GO = (id: string, title: string, need_vip: boolean, locked_code: string,) => {
    // console.log(id, title,need_vip,locked_code);
    // navigate(`/content/${id}?title=${title}&val=${pdata.topic_info.id}`);
    // setFlag(false);
    // window.location.reload();
    if (locked_code == '200' && !need_vip) {
      navigate(`/content/${id}?title=${title}&val=${pdata.topic_info.id}`);
      setFlag(false);
      window.location.reload();
    } else if (need_vip) {
      Toast.show({
        content: '当前是vip章节,升级会员后方可解锁观看',
        maskClickable: false,
        duration: 2000,
      })
    } else {
      Toast.show({
        content: '当前是付费章节,付费后方可解锁观看',
        maskClickable: false,
        duration: 2000,
      })
    }
  }
  useEffect(() => {
    run();
  }, [id])

  function rowRenderer({
    index,
    style,
  }: {
    index: number
    key: string
    style: CSSProperties
  }) {
    const item = pdata.topic_info.comics[index]
    return (
      <List.Item
        key={index}
        style={style}
        onClick={() => GO(item.id, item.title, item.need_vip, item.locked_code)}
        arrow={false}
      >
        <span className={styles.span}>{(item.locked_code == 10103) ? '付费':""}</span>{item.title}
      </List.Item>
    )
  }
  console.log(pdata);
  return (
    <div className={styles.cont} onClick={() => setFlag(!flag)}>
      {
        data && <div>
          {
            data.comic_info.comic_images && data.comic_info.comic_images.map((item: any) => {
              return <Image key={item.url} src={item.url} width={375} height={293} fit='fill'></Image>
            })
          }
          <Button className={styles.button1} loading={btnPre ? true : false} loadingText='正在加载' disabled={data.previous_comic_info ? false : true} color='primary' size='large' onClick={(e: any) => GoPre(e, data.previous_comic_info.id)}>
            上一话
          </Button>
          <Divider className={styles.vertical} type="vertical" />
          <Button className={styles.button2} loading={btnNext ? true : false} loadingText='正在加载' disabled={data.next_comic_info ? false : true} color='primary' size='large' onClick={(e: any) => GoNext(e, data.next_comic_info.id)}>
            下一话
          </Button>
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
      {
        pdata && pdata.topic_info.comics && <Space direction='vertical'>
          <Popup visible={flag} onMaskClick={() => { setFlag(false) }} position='left' bodyStyle={{ minWidth: '53.4vw' }}>
            <AutoSizer disableHeight>
              {({ width }: { width: number }) => (
                <VirtualizedList
                  rowCount={pdata.topic_info.comics.length}
                  rowRenderer={rowRenderer}
                  width={200}
                  height={660}
                  rowHeight={50}
                  overscanRowCount={10}
                  style={{ '--active-background-color':'powderblue'}}
                />
              )}
            </AutoSizer>
          </Popup>
        </Space>
      }
    </div>
  );
}
