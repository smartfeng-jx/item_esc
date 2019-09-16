import React, { Component } from 'react';
import RootLayout from '../../layouts/RootLayout.js';
import {connect} from 'react-redux';
import {message, Descriptions, Badge } from 'antd'; 
import { push } from 'react-router-redux';
import RcViewer from '@hanyk/rc-viewer'
import LazyImg from '../../components/LazyPic.js';
 

import './carinfo.css';

@connect(
    ({routing, carinfoReducer}) => ({
        routing,
        carinfoReducer
    }),
    (dispatch) => ({
        dispatch
    })
)
export default class Carinfo extends Component {
    componentWillMount(){
        const pathname = this.props.routing.locationBeforeTransitions.pathname;
        // 用正则表达式检查是否符合/carinfo/7位数的形式
        if(/^\/carinfo\/\d{7}$/.test(pathname)){
            // 得到这7位id
            var id = pathname.match(/^\/carinfo\/(\d{7})$/)[1];
            
            // 发出Ajax请求
            this.props.dispatch({'type': 'LOADCARINFO', id});
        }else{
            message.warning('没有这个id，已经给您跳转回首页');
            this.props.dispatch(push('/index'));
        }
    }

    componentDidMount(){
        // 让滚动条到顶部
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }



    render() {
        const {id, result: {images, license, brand, series, color, price, km, buydate, fuel, exhaust, gearbox, engine}} = this.props.carinfoReducer;

        // 看全局的images有没有准备好，如果没有阻止渲染
        if(images === undefined){
            return <div>正在读取，请稍后...</div>;
        }

        // 封装函数
        const show = (c, e) =>  <div className="imagesBox">
            <h3>{c}图片</h3>
            <RcViewer options={{
                url(img){
                    return img.src.replace('_small', '');
                }
            }} ref='viewer'>
                <ul>
                    {
                        images[e].map(item => <li key={item}>
                            <LazyImg 
                                width={150}
                                height={100}
                                src={"http://192.168.2.250:3000/images/carimages_small/" + id + "/" + e + "/" + item}
                            />
                        </li>)
                    }
                </ul>
            </RcViewer>
        </div>

        return (
            <RootLayout c1="ershouche">
                <div className=" carinfobox">
                    <h1>{brand}{series}[{id}]车辆信息</h1>
                    <Descriptions bordered column={3}>
                        <Descriptions.Item label="品牌">{brand}</Descriptions.Item>
                        <Descriptions.Item label="车系">{series}</Descriptions.Item>
                        <Descriptions.Item label="颜色" >{color}</Descriptions.Item>
                        <Descriptions.Item label="价格">{price}万元</Descriptions.Item>
                        <Descriptions.Item label="里程表读数">{km}</Descriptions.Item>
                        <Descriptions.Item label="燃料">{fuel}</Descriptions.Item>
                        <Descriptions.Item label="购买日期">{buydate}</Descriptions.Item>
                        <Descriptions.Item label="尾气排放标准">{exhaust}</Descriptions.Item>
                        <Descriptions.Item label="变速箱类型">{gearbox}</Descriptions.Item>
                        <Descriptions.Item label="发动机排量">{engine}</Descriptions.Item>
                        <Descriptions.Item label="是否有牌">{license?'有牌':'无牌'}</Descriptions.Item>
                    </Descriptions>

                    {show('外观', 'view')}
                    {show('内饰', 'inner')}
                    {show('结构和发动机', 'engine')}
                    {show('更多细节', 'more')}
                     
                    
                </div>
            </RootLayout>
        )
    }
}
