import user from '@/models/user'
import { connect } from '@umijs/max'
import { useNavigate, useRequest } from '@umijs/max'
import { Card, Space } from 'antd-mobile'
import { AddOutline, RightOutline } from 'antd-mobile-icons'
import useFormItemStatus from 'antd/lib/form/hooks/useFormItemStatus'
import { useEffect, useState } from 'react'
import './index.less'

const Page = ({ user,dispatch }) => {
  const { data } = useRequest('/api/v1/graph/pc/feeds/getRecommendFeed?uid=0&webTokenId=1615007958330_FFwnyURnzD0rgO2&since=0&limit=20 ')
  const navigate = useNavigate()
  const [info, setInfo] = useState(true)
  
  const mast=localStorage.getItem("userinfo")as any

  const shujia = () => {
    navigate('/book')
  }
  const shijie = () => {
    navigate('/world')
  }

  return (
    <div className="title">

      <Card title="用户信息">
        <div className='info'>
          <div className='clicle'>
            <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.PblCAZjGQhdLpHc3AyEjVgHaIG?pid=ImgDet&rs=1" alt="" />
          </div>
          {
            mast ? 
             <div className='login'>{JSON.parse(mast).nick} </div>
             : <div className='login' onClick={() => navigate("/login")}>请先登录</div>
          }

        </div>
      </Card>


      <span onClick={shijie}>更多</span>
      {data && (
        <Card title="世界">
          <div className="world">
            <Space justify="evenly" block>
              <div className="bookinfo">
                <img src={data.universalModels[0].post.recommendCover.picOriginalUrl} alt="" />
                {/* <p>{data.universalModels[0].post.showLabel.name}</p> */}
              </div>
              <div className="bookinfo">
                <img src={data.universalModels[1].post.recommendCover.picOriginalUrl} alt="" />
                {/* <p>{data.universalModels[1].post.showLabel.name}</p> */}
              </div>
              <div className="bookinfo">
                <img src={data.universalModels[2].post.recommendCover.picOriginalUrl} alt="" />
                {/* <p>{data.universalModels[2].post.showLabel.name}</p> */}
              </div>
              <div className="bookinfo">
                <img src={data.universalModels[3].post.recommendCover.picOriginalUrl} alt="" />
                {/* <p>{data.universalModels[3].post.showLabel.name}</p> */}
              </div>
            </Space>
          </div>
        </Card>
      )}

      <span onClick={shujia}>
        <RightOutline fontSize={16} />
      </span>
      {data && (
        <Card title="书架">
          <div className="world">
            <Space justify="evenly" block>
              <div className="bookinfo">
                <img src={data.universalModels[4].post.recommendCover.picOriginalUrl} alt="" />
                {/* <p>{data.universalModels[4].post.showLabel.name}</p> */}
              </div>
              <div className="bookinfo">
                <img src={data.universalModels[5].post.recommendCover.picOriginalUrl} alt="" />
                {/* <p>{data.universalModels[5].post.showLabel.name}</p> */}
              </div>
              <div className="bookinfo">
                <img src={data.universalModels[6].post.recommendCover.picOriginalUrl} alt="" />
                {/* <p>{data.universalModels[6].post.showLabel.name}</p> */}
              </div>
              <div className="bookinfo">
                <img src={data.universalModels[7].post.recommendCover.picOriginalUrl} alt="" />
                {/* <p>{data.universalModels[7].post.showLabel.name}</p> */}
              </div>
            </Space>
          </div>
        </Card>
      )}
    </div>
  )
}
export default connect(({ user }) => ({
  user: user.user,
}))(Page);
