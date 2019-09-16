import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import {connect} from 'react-redux';
import { push } from 'react-router-redux'

const { Header} = Layout;

@connect(
    ({routing}) => ({
        routing
    }),
    (dispatch) => ({
        dispatch
    })
)
export default class RootLayout extends Component {
    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[this.props.c1]}
                        style={{ lineHeight: '64px' }}
                        onClick={({key})=>{
                            this.props.dispatch(push('/' + key));
                        }}
                    >
                        <Menu.Item key="index">首页</Menu.Item>
                        <Menu.Item key="caiwu">财务</Menu.Item>
                        <Menu.Item key="shuiwu">税务</Menu.Item>
                        <Menu.Item key="guanli">管理</Menu.Item>
                        <Menu.Item key="ershouche">二手车</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    {this.props.children}
                </Layout>
            </Layout>
        )
    }
}
