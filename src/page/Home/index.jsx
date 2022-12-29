import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { DesktopOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router';

const { Content, Footer, Sider } = Layout;

const menuItem = [
  {
    key: 1,
    icon: <DesktopOutlined />,
    label: 'Games',
  },
];

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ margin: '15px', fontWeight: '500', fontSize: '1.3rem', textAlign: 'center', color: '#E0E7FF' }}>
          {collapsed ? 'SG' : 'SG Dashboard'}
        </div>
        <Menu style={{ marginTop: '50px' }} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItem} />
      </Sider>
      <Layout className="site-layout">
        <Content>{<Outlet />}</Content>
        <Footer style={{ textAlign: 'center' }}>Stark Gaming © 2022 Created by Yours Truly</Footer>
      </Layout>
    </Layout>
  );
}
