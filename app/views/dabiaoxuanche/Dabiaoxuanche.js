import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Table, Tag, Row, Col, Button, Menu, Dropdown, Radio, Pagination, Spin } from 'antd';
import Fuxuankuang from './Fuxuangkuang.js';
import Tuozhuaitiao from './Tuozhuaitiao.js';
import Riqi from './Riqi.js';
import moment from 'moment';
import MenuInner from './MenuInner.js';
import PinPaiHeCheXi from './PinPaiHeCheXi.js';
import SecondaryLayout from '../../layouts/SecondaryLayout.js';
import { Link } from 'react-router';
import LazyPic from '../../components/LazyPic.js';

@connect(
    ({carReducer, bsReducer}) => ({
        carReducer,
        bsReducer
    }),
    (dispatch) => ({
        dispatch
    })
)
export default class Dabiaoxuanche extends Component {
    constructor(){
        super();

        this.state = {
            // 是否显示菊花
            'showSpin': false,
            'showType': 1       //1表格，2网格
        };
    }
    componentWillMount(){
        this.props.dispatch({'type': 'LOADDATA'});
    }
 

    render() {
        // 定义的是复选框的数组，这个数组只影响初始形态，就是用户点击之后不改变这个数组。
        // 用户点击之后，直接发出dispatch了，被saga拦截，直接改变reducer了。
        // 这个数组不改变
        const fuxuankuangArr = [
            {'c': '颜色', 'k': 'color', 'options': ['黑','白','红','灰','蓝','黄','银灰','橙','绿','紫','香槟','咖啡','其他']},
            {'c': '尾气', 'k': 'exhaust', 'options': ['国一', '国二', '国三', '国四', '国五']},
            {'c': '排量', 'k': 'engine', 'options':['1.0L', '1.2L', '1.4L', '1.4T', '1.6L', '1.6T']},
            {'c': '变速箱', 'k': 'gearbox', 'options': ['手动', '自动', '手自一体']},
            {'c': '燃料', 'k': 'fuel', 'options': ['汽油', '柴油', '纯电动', '油电混合']}
        ];

        // 定义拖拽条的初始数组
        const tuozhuaitiaoArr = [
            {'c': '价格（万元）', 'k': 'price', 'min': 0, 'max': 120, 'rate': 1},
            {'c': '公里数（万公里）', 'k': 'km', 'min': 0, 'max': 2500000, 'rate': 10000}
        ];
 


        return (
            <SecondaryLayout c1="ershouche" c2="dabiaoxuanche">
                <div className="tagsbox">
                    {
                        // 上面的标签区域
                        (()=>{
                            var domarr = [];

                            // 筛选品牌
                            if(this.props.bsReducer.brand !== ''){
                                domarr.push(
                                    <Tag key='brand' closable onClose={()=>{
                                        this.props.dispatch({'type': 'CHANGEBRAND', 'brand': ''})
                                    }}>
                                        品牌：{this.props.bsReducer.brand}
                                    </Tag>
                                )
                            }

                            // 筛选车系
                            if(this.props.bsReducer.series !== ''){
                                domarr.push(
                                    <Tag key='series' closable onClose={()=>{
                                        this.props.dispatch({'type': 'CHANGESERIES', 'series': ''})
                                    }}>
                                        车系：{this.props.bsReducer.series}
                                    </Tag>
                                )
                            }

                            
                            fuxuankuangArr.forEach(item => {
                                if(this.props.carReducer[item.k].length !== 0){
                                    domarr.push(
                                        <Tag key={item.k} closable onClose={()=>{
                                            this.props.dispatch({'type': 'CHANGEFILTER', 'k': item.k, 'v': []})
                                        }}>
                                            {item.c}：{this.props.carReducer[item.k].join(' 或 ')}
                                        </Tag>
                                    )
                                }
                            });

                            // 两个拖拽条的tag
                            tuozhuaitiaoArr.forEach(item => {
                                if(this.props.carReducer[item.k].length !== 0){
                                    domarr.push(
                                        <Tag key={item.k} closable onClose={()=>{
                                            this.props.dispatch({'type': 'CHANGEFILTER', 'k': item.k, 'v': []})
                                        }}>
                                            {item.c}：{this.props.carReducer[item.k].join(' 到 ')}
                                        </Tag>
                                    )
                                }
                            });

                            // 购买日期
                            if(this.props.carReducer.buydate.length !== 0){
                                domarr.push(
                                    <Tag key='buydate' closable onClose={()=>{
                                        this.props.dispatch({'type': 'CHANGEFILTER', 'k': 'buydate', 'v': []})
                                    }}>
                                        购买日期：{this.props.carReducer.buydate.map(item => moment(item).format('YYYY年MM月DD日')).join(' 到 ')}
                                    </Tag>
                                )
                            }

                            return domarr;
                        })()
                    }
                </div>

                <PinPaiHeCheXi />
             
                {
                    // 根据复选框数组，放置复选框DOM
                    fuxuankuangArr.map(item => this.props.carReducer[item.k].length === 0 ? <Fuxuankuang 
                        key={item.k}
                        k={item.k}
                        c={item.c}
                        options={item.options}
                    /> : null)
                }

                {
                    // 根据拖拽条数组，放置拖拽条DOM
                    tuozhuaitiaoArr.map(item => <Tuozhuaitiao 
                        key={item.k}
                        k={item.k}
                        c={item.c}
                        min={item.min}
                        max={item.max}
                        rate={item.rate}
                    />)
                }

                <Riqi 
                    c="购买日期"
                    k='buydate'
                />

                <div className="rowinfo">
                    <Row>
                        <Col span={4}>
                            <h3>共{this.props.carReducer.total}辆车符合条件</h3>
                        </Col>
                        <Col span={4}>
                            <Dropdown overlay={<Menu><MenuInner /></Menu>}>
                                <span className="paixuspan">
                                    排序方式：按
                                    {
                                        (()=>{
                                            // 字典
                                            var dirctionary = {
                                                'id': 'id',
                                                'km': '公里数',
                                                'price': '价格',
                                                'buydate': '购买日期'
                                            };

                                            return dirctionary[this.props.carReducer.sortby];
                                        })()
                                    }
                                    {this.props.carReducer.sortdirection === 1 ? '正序' : '逆序'}
                                </span>
                            </Dropdown>
                        </Col>
                        <Col span={4}>
                            <Radio.Group value={this.state.showType} onChange={(e)=>{
                                this.setState({
                                    showType: e.target.value
                                });
                                // 这里还要改变每页显示几条
                                if(e.target.value === 2){
                                    this.props.dispatch({'type': 'CHANGEPAGESIZE', 'pagesize': 12});
                                }else{
                                    this.props.dispatch({'type': 'CHANGEPAGESIZE', 'pagesize': 10});
                                }
                            }}>
                                <Radio.Button value={1}>表格显示</Radio.Button>
                                <Radio.Button value={2}>网格显示</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                </div>

                <div className="cl h20"></div>
                
                {
                    this.state.showType === 1
                    ?
                    <Spin spinning={this.state.showSpin}>
                        <Table 
                            dataSource={this.props.carReducer.results}
                            columns={[
                                {'dataIndex': 'image', 'key': 'image', 'title': '图片', render(value, row){
                                    return <div>
                                        <Link to={"/carinfo/" + row.id}>
                                            <LazyPic
                                                width={150}
                                                height={100}
                                                src={'http://192.168.2.250:3000/images/carimages_small/' + row.id + '/view/' + row.image} 
                                            />
                                        </Link>
                                    </div>
                                }},
                                {'dataIndex': 'id', 'key': 'id', 'title': '编号'},
                                {'dataIndex': 'brand', 'key': 'brand', 'title': '品牌'},
                                {'dataIndex': 'series', 'key': 'series', 'title': '车系'},
                                {'dataIndex': 'color', 'key': 'color', 'title': '颜色'},
                                {'dataIndex': 'price', 'key': 'price', 'title': '价格'},
                                {'dataIndex': 'km', 'key': 'km', 'title': '公里数'},
                                {'dataIndex': 'exhaust', 'key': 'exhaust', 'title': '尾气'},
                                {'dataIndex': 'engine', 'key': 'engine', 'title': '排量'},
                                {'dataIndex': 'gearbox', 'key': 'gearbox', 'title': '变速箱'},
                                {'dataIndex': 'fuel', 'key': 'fuel', 'title': '燃料'},
                                {'dataIndex': 'buydate', 'key': 'buydate', 'title': '购买日期', 'render': (a, b) => {
                                    return <div>
                                        {moment(a).format('YYYY-MM-DD')}
                                    </div>
                                }}
                            ]}
                            rowKey="id"
                            pagination={{
                                current: this.props.carReducer.page,
                                pageSize: this.props.carReducer.pagesize,
                                total: this.props.carReducer.total,
                                showSizeChanger: true,
                                onChange: (page) => {
                                    this.props.dispatch({'type': 'CHANGEPAGE', page});
                                },
                                onShowSizeChange: (page, pagesize) => {
                                    this.props.dispatch({'type': 'CHANGEPAGESIZE', pagesize});
                                }
                            }}
                        />
                    </Spin>
                    :
                    
                        <div>
                            {
                                (()=>{
                                    // 一维数组，12项
                                    var arr = this.props.carReducer.results;
                                    var domarr = [];

                                    for(let i = 0 ; i < 4 ; i ++){
                                        let _arr = [];
                                        for(let j = 0 ; j < 3 ; j++){
                                            let o = arr[i * 3 + j];
                                            if(o === undefined){
                                                break;
                                            }
                                            _arr.push(
                                                <Col key={j} span={8} className="grid">
                                                    <Row>
                                                        <Col span={12}>
                                                            <img src={'http://192.168.2.250:3000/images/carimages_small/' + o.id + '/view/' + o.image}/>
                                                        </Col>
                                                        <Col span={11} offset={1}>
                                                            <p>
                                                                {o.id}{o.brand}{o.series}
                                                            </p>
                                                            <p>
                                                                排量：{o.engine}
                                                            </p>
                                                            <p>
                                                                尾气标准：{o.exhaust}
                                                            </p>
                                                            <p>
                                                                售价：{o.price}万元
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            )
                                        }
                                        domarr.push(<Row key={i}>
                                            {_arr}
                                        </Row>);
                                    }

                                    return domarr;
                                })()
                            }

                            <Pagination 
                                current={this.props.carReducer.page}
                                pageSize={this.props.carReducer.pagesize}
                                total={this.props.carReducer.total}
                                onChange={(page) => {
                                    this.props.dispatch({'type': 'CHANGEPAGE', page});
                                }}
                                onShowSizeChange={(page, pagesize) => {
                                    this.props.dispatch({'type': 'CHANGEPAGESIZE', pagesize});
                                }}
                            />
                        </div>
                     
                }
            </SecondaryLayout>
        )
    }
}
