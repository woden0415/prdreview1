/*
 * @desc 全屏布局文件
 */
import * as React from "react";
import { Link } from 'dva/router';
import { Layout, Menu } from 'antd';
import './index.less'

const { Header, Content, Footer } = Layout;

export const LayoutView: React.StatelessComponent<{}> = (props) => (
  <Layout className="layout" style={{minHeight: '100vh'}}>
    <Header>
      <div className="logo"><Link to='/index'>demo</Link></div>
    </Header>
    <Content style={{ padding: '0 50px'}}>
      { props.children }
    </Content>
    <Footer style={{ textAlign: 'center' }}></Footer>
  </Layout>
)