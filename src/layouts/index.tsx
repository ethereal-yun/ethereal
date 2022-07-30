import { FC, useState } from "react";
import { Outlet, useLocation, useNavigate, useSearchParams } from "@umijs/max";
import styles from '@/layouts/index.less';
import { NavBar, TabBar } from 'antd-mobile'
import { AppOutline, UnorderedListOutline, ContentOutline, UserOutline } from 'antd-mobile-icons'

const Layout: FC = () => {

    const navigate = useNavigate();
    const [SearchParams] = useSearchParams();
    const [activeKey, setActiveKey] = useState('home')
    const includesArr = ["/", "/renew", "/book", "/me"];
    const location = useLocation();
    const getNav = () => {
        if (includesArr.includes(location.pathname)) {
            let newtitle = '首页'
            switch (location.pathname) {
                case '/': newtitle = '首页'; break;
                case '/renew': newtitle = '更新'; break;
                case '/book': newtitle = '书架'; break;
                case '/me': newtitle = '我的'; break;
            }
            return <NavBar backArrow={false} className={styles.Navbar}>{newtitle}</NavBar>;
        } else {
            return <NavBar className={styles.Navbar} back='返回' onBack={back}> {SearchParams.get("title")}</NavBar>;
        }
    };
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
            key: 'book',
            title: '书架',
            icon: <ContentOutline />,
        },
        {
            key: 'me',
            title: '我的',
            icon: <UserOutline />,
        },
    ]
    const back = () => {
        navigate(-1);
    }
    const tabChange = (key: string) => {
        navigate(`/${key}`)
        setActiveKey(key)
        console.log(key);
    }

    return <div>
        {getNav()}
        <div className={styles.content}></div>
        <Outlet />
        <div className={styles.content2}></div>
        <TabBar className={styles.adsdasd} onChange={(event) => tabChange(event)}>
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
        </TabBar>
    </div>
}

export default Layout;


