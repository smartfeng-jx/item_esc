import React, { Component } from 'react';
import {Row, Col, Button} from 'antd';
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
export default class Fuxuangkuang extends Component {
    constructor(){
        super();

        this.state = {
            canMultiple: false,
            now: []
        }
    }
    render() {
        return (
            <div className="fxkbox">
                <Row>
                    <Col span={2}>
                        {this.props.c}：
                    </Col>
                    <Col span={20}>
                        {
                            this.props.options.map(item => <span
                                className={classnames({
                                    'multiple': this.state.canMultiple,
                                    'cur': this.state.now.includes(item)
                                })}
                                key={item}
                                onClick={()=>{
                                    if(!this.state.canMultiple){
                                        this.props.dispatch({'type': 'CHANGEFILTER', 'k': this.props.k, 'v': [item]})
                                    }else{
                                        this.setState({
                                            'now': [...this.state.now, item]
                                        });
                                    }
                                }}
                            >
                                {item}
                            </span>)
                        }
                    </Col>
                    <Col span={2}>
                        {
                            this.state.canMultiple
                            ?
                            <Button type="primary"  onClick={()=>{
                                this.props.dispatch({'type': 'CHANGEFILTER', 'k': this.props.k, 'v': this.state.now})
                            }}>
                                确定
                            </Button>
                            :
                            <Button onClick={()=>{
                                this.setState({
                                    canMultiple: true
                                });
                            }}>
                                多选
                            </Button>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}
