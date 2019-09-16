import React, { Component } from 'react';
import {Row, Col} from 'antd';
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
export default class MenuInner extends Component {
    render() {
        const arr = [
            {'e': 'id', 'c': 'id'},
            {'e': 'price', 'c': '价格'},
            {'e': 'km', 'c': '公里数'},
            {'e': 'buydate', 'c': '购买日期'},
        ];

        return (
            <div className="menuinner">
                <Row>
                    <Col span={12}>
                        <h3>按什么属性排序</h3>
                        {
                            arr.map(item =>  <span key={item.e} className={classnames(
                                {'cur': this.props.carReducer.sortby === item.e})}
                                onClick={()=>{
                                    this.props.dispatch({'type': 'CHANGESORTBY', 'sortby': item.e})
                                }}
                            >
                                {item.c}
                            </span>)
                        }
                    </Col>
                    <Col span={12}>
                        <h3>顺序</h3>
                        <span className={classnames({'cur': this.props.carReducer.sortdirection === 1})} onClick={()=>{
                            this.props.dispatch({'type': 'CHANGESORTDIRECTION', 'sortdirection': 1});
                        }}>正序（从小到大）</span>

                        <span className={classnames({'cur': this.props.carReducer.sortdirection === -1})} onClick={()=>{
                            this.props.dispatch({'type': 'CHANGESORTDIRECTION', 'sortdirection': -1});
                        }}>逆序（从大到小）</span>
                    </Col>
                </Row>
            </div>
        )
    }
}
