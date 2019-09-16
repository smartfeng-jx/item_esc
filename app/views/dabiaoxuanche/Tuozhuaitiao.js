import React, { Component } from 'react';
import {Row, Col, Slider, Input, Button, message} from 'antd';
import {connect} from 'react-redux';
import classnames from 'classnames';

@connect(
    ({carReducer}) => ({
        carReducer
    }),
    (dispatch) => ({
        dispatch
    })
)
export default class Tuozhuaitiao extends Component {
    constructor(props){
        super();

        // 这个就是组件的state，用来让拖拽条和文本框产生联系
        // 为什么要产生联系？因为拖拽条使用的是defaultValue直接和reducer绑定
        // 使用了onAfterChange（当拖拽结束之后的时间），当拖拽过程中，没有值和他耦合
        // 所以要认为制造一个值和拖拽过程中耦合
        this.state = {
            v0: props.carReducer[props.k].length !== 0 ? props.carReducer[props.k][0] / props.rate  : props.min / props.rate,
            v1: props.carReducer[props.k].length !== 0 ? props.carReducer[props.k][1] / props.rate : props.max  / props.rate
        };
    }

    // 组件迎来了新的props，注意carReducer也是props
    // 所以当carReducer变化的时候，这个生命周期能够触发
    // 让props变化，能够让state一起变化
    componentWillReceiveProps(nextProps){
        this.setState({
            v0: nextProps.carReducer[this.props.k].length !== 0 ? nextProps.carReducer[this.props.k][0] / this.props.rate : this.props.min / this.props.rate,
            v1: nextProps.carReducer[this.props.k].length !== 0 ? nextProps.carReducer[this.props.k][1] / this.props.rate : this.props.max / this.props.rate
        });
    }

    render() {
        // 得到reduce中的值
        const v = this.props.carReducer[this.props.k];

        return (
            <div className="tztbox">
                <Row>
                    <Col span={4}>
                        {this.props.c}：
                    </Col>
                    <Col span={12}>
                        <Slider 
                            range 
                            min={this.props.min / this.props.rate} 
                            max={this.props.max / this.props.rate} 
                            value={[this.state.v0, this.state.v1]}
                            onAfterChange={(v)=>{
                                // 当用户松手的时候，发出Ajax请求，这样服务器压力不大
                                this.props.dispatch({'type': 'CHANGEFILTER', 'k': this.props.k, 'v': v.map(item => item * this.props.rate)});
                            }}
                            onChange={(v)=>{
                                // 当用户实时拖拽的时候，不发出Ajax请求，只改变state，这样就改变了数字文本框
                                this.setState({
                                    v0: v[0],
                                    v1: v[1]
                                });
                            }}
                        />
                    </Col>
                    <Col span={24 - 4 - 12 - 1} offset={1}>
                        <Input min={this.props.min} max={this.props.max} type="number" className="numberbox" value={this.state.v0} onChange={e=>{
                            this.setState({
                                v0: e.target.value
                            });
                        }}/>
                        ~
                        <Input min={this.props.min} max={this.props.max} type="number" className="numberbox" value={this.state.v1} onChange={e=>{
                            this.setState({
                                v1: e.target.value
                            });
                        }} />
                        <Button type="primary" onClick={()=>{
                            // 进行合法性检查
                            if(this.state.v0 > this.state.v1){
                                // 显示提示框
                                message.error('最小值不能大于最大值！');
                            }else{
                                // 合法的时候就发出dispatch
                                this.props.dispatch({'type': 'CHANGEFILTER', 'k': this.props.k, 'v': [this.state.v0, this.state.v1]});
                            }
                        }}>确定</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
