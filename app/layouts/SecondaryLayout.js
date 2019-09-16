import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {connect} from 'react-redux';
import { push } from 'react-router-redux'
import { Link } from 'react-router'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import RootLayout from './RootLayout.js';

@connect(
    ({routing}) => ({
        routing
    }),
    (dispatch) => ({
        dispatch
    })
)
export default class SecondaryLayout extends Component {
    render() {
        const obj = {
            'caiwu': [
                {'c': '票财税一体化','e': 'piaocaishuiyitihua'},
                {'c': '智能凭证','e': 'zhinengpingzheng'},
                {'c': '智能结账','e': 'zhinengjiezhang'}
            ],
            'shuiwu': [
                {'c': '发票预算','e': 'fapiaoyusuan'},
                {'c': '税务风险检查','e': 'shuiwufengxianjiancha'}
            ],
            'guanli': [
                {'c': '现金流分析','e': 'xianjinliufenxi'},
                {'c': '经营状况分析','e': 'jingyingzhuangkuangfenxi'},
                {'c': '盈利指标分析','e': 'yinglizhibiaofenxi'},
            ],
            'ershouche': [
                {'c': '大表选车','e': 'dabiaoxuanche'},
                {'c': '司法拍卖','e': 'sifapaimai'},
                {'c': '我要卖车','e': 'salecar'},
            ]
        };

        const dictionary = {
            'caiwu': '财务',
            'shuiwu': '税务',
            'guanli': '管理',
            'ershouche': '二手车'
        };

        // 拿到本栏目的中文名
        const c = obj[this.props.c1].filter(item => item.e === this.props.c2)[0].c;

        return (
            <RootLayout c1={this.props.c1}>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[this.props.c2]}
                            style={{ height: '100%', borderRight: 0 }}
                            onSelect={({key})=>{
                                this.props.dispatch(push('/' + key));
                            }}
                        >
                            {
                                obj[this.props.c1].map(item =>  <Menu.Item key={item.e}>
                                    {item.c}
                                </Menu.Item>)
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>
                                <Link to="/index">首页</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={"/" + this.props.c1}>{dictionary[this.props.c1]}</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {c}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </RootLayout>
        )
    }
}
