import { FC, useState } from "react";
import { Link, NavLink, Outlet } from "@umijs/max";
import styles from '@/layouts/index.less';
import { NavBar, TabBar} from 'antd-mobile'
import {AppOutline,MessageOutline,UnorderedListOutline,} from 'antd-mobile-icons'
import { useNavigate } from "@umijs/max";
const Layout: FC = () => {
    const navigate = useNavigate();
    const [activeKey, setActiveKey] = useState('home')
    const tabs = [
        {
            key: '',
            title: '首页',
            icon: <AppOutline />,
        },
        {
            key: 'renew',
            title: '更新',
            icon: <UnorderedListOutline />,
        },
        {
            key: 'sort',
            title: '我的消息',
            icon: <MessageOutline />,
        },
  
    ]
    const back = () =>{

    }
    const tabChange = (key:string)=>{
        navigate(`/${key}`)
        setActiveKey(key)
    }

    return <div>
        <NavBar className={styles.Navbar} back='返回' onBack={back}>
          标题
        </NavBar>
        <div className={styles.content}></div>
        <Outlet/>

        <TabBar className={styles.adsdasd} onChange={(event)=>tabChange(event)}>
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
        </TabBar>
    </div>
}

export default Layout
