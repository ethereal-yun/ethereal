import { useNavigate, useRequest } from '@umijs/max';
import { Card, Space } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';
import { useEffect } from 'react';
import './index.less';

export default function Page() {
  const { data } = useRequest(
    '/api/v1/graph/pc/feeds/getRecommendFeed?uid=0&webTokenId=1615007958330_FFwnyURnzD0rgO2&since=0&limit=20 ',
  );
  useEffect(() => {
    console.log(data);
  });
  const navigate = useNavigate();
  const shujia = () => {
    navigate('/search');
  };

  while (data) {
    return (
      <div className="title">
        <Card title="用户信息">
          <img
            className="user"
            src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            alt=""
          />
          <Space className="right" direction="vertical">
            <p>昵称:wwwwwwww</p>
            <p>性别:女</p>
            <p>手机号:111111111</p>
          </Space>
        </Card>

        <Card title="世界">
          {' '}
          <span>
            <RightOutline />
          </span>
          <div className="world">
            <Space justify="evenly" block>
              <div className="bookinfo">
                <img
                  src={
                    data.universalModels[0].post.recommendCover.picOriginalUrl
                  }
                  alt=""
                />
                <p>{data.universalModels[0].post.showLabel.name}</p>
              </div>
              <div className="bookinfo">
                <img
                  src={
                    data.universalModels[1].post.recommendCover.picOriginalUrl
                  }
                  alt=""
                />
                <p>{data.universalModels[1].post.showLabel.name}</p>
              </div>
              <div className="bookinfo">
                <img
                  src={
                    data.universalModels[2].post.recommendCover.picOriginalUrl
                  }
                  alt=""
                />
                <p>{data.universalModels[2].post.showLabel.name}</p>
              </div>
              <div className="bookinfo">
                <img
                  src={
                    data.universalModels[3].post.recommendCover.picOriginalUrl
                  }
                  alt=""
                />
                <p>{data.universalModels[3].post.showLabel.name}</p>
              </div>
            </Space>
          </div>
        </Card>

        <Card title="书架">
          {' '}
          <span onClick={shujia}>
            <RightOutline />
          </span>
          <div className="world">
            <Space justify="evenly" block>
              <div className="bookinfo">
                <img
                  src={
                    data.universalModels[4].post.recommendCover.picOriginalUrl
                  }
                  alt=""
                />
                <p>{data.universalModels[4].post.showLabel.name}</p>
              </div>
              <div className="bookinfo">
                <img
                  src={
                    data.universalModels[5].post.recommendCover.picOriginalUrl
                  }
                  alt=""
                />
                <p>{data.universalModels[5].post.showLabel.name}</p>
              </div>
              <div className="bookinfo">
                <img
                  src={
                    data.universalModels[6].post.recommendCover.picOriginalUrl
                  }
                  alt=""
                />
                <p>{data.universalModels[6].post.showLabel.name}</p>
              </div>
              <div className="bookinfo">
                <img
                  src={
                    data.universalModels[7].post.recommendCover.picOriginalUrl
                  }
                  alt=""
                />
                <p>{data.universalModels[7].post.showLabel.name}</p>
              </div>
            </Space>
          </div>
        </Card>
      </div>
    );
  }
}
