import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { getRenew } from '@/services/user';
import { useRequest,useNavigate } from '@umijs/max';
import { Tabs, Space, Tag } from 'antd-mobile'
import styles1 from '@/pages/sort/index.less';
export default function Page() {
  let [day, setDay] = useState(6);
  const navigate = useNavigate();
  const [week, setweel] = useState(['周一', '周二', '周三', '周四', '周五', '周六', '周日',]);

  const { data, run, refresh } = useRequest(() => getRenew({
    pos: day
  }), {
    manual: true,
    refreshDeps: [day],
  });
  const callback = (key: string) => {
    let count;
    count = Number(key)
    setDay(count)
  }

  useEffect(() => {
    run()
    refresh()
  }, [day, data])
  useEffect(() => {
    run()
    refresh()
  }, [])
  const checkDataExist = () => {
    if (data) {
      return <Tabs defaultActiveKey='1' onChange={callback} >
        {week.map((i, idx) => {
          return <Tabs.Tab title={i} key={idx} >
            {
              data && data.topics.map((item: any, index: number) => {
                return <div key={index} onClick={()=>{navigate(`/chapter?title=${item.title}&id=${item.id}`)}}>
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
        })}
      </Tabs>

    }
    else {
      return <><div className={styles1.fulfillingbouncingcirclespinner}>
        <div className={styles1.circle}></div>
        <div className={styles1.orbit}></div>
      </div>
        <h2 className={styles1.loadingtips}>加载中，请稍后</h2></>
    }
  }
  return (
    <div>
      {checkDataExist()}
    </div>
  );
}
