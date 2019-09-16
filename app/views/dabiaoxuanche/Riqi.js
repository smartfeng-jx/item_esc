import React, { Component } from 'react';
import {Row, Col, DatePicker} from 'antd';
import {connect} from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';

@connect(
    ({carReducer}) => ({
        carReducer
    }),
    (dispatch) => ({
        dispatch
    })
)
export default class Riqi extends Component {
    render() {
        return (
            <div className='riqibox'>
                <Row>
                    <Col span={3}>
                        {this.props.c}：
                    </Col>
                    <Col span={14}>
                        <DatePicker.RangePicker
                            value={this.props.carReducer[this.props.k].map(item => moment(item))}
                            onChange={v => {
                                this.props.dispatch({'type': 'CHANGEFILTER', 'k': this.props.k, 'v': v.map(item => item.unix() * 1000)})
                            }}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}
