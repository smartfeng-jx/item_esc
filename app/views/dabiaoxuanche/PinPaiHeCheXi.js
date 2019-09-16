import React, { Component } from 'react';
import {Row, Col, Button, Tabs} from 'antd';
import {connect} from 'react-redux';
import classnames from 'classnames';

const { TabPane } = Tabs;

@connect(
    ({bsReducer}) => ({
        bsReducer
    }),
    (dispatch) => ({
        dispatch
    })
)
export default class PinPaiHeCheXi extends Component {
    componentWillMount(){
        // 发出Ajax请求
        this.props.dispatch({'type': 'LOADALLBS'});
    }
    render() {
        // 扁平化的数据
        var flattenObj  = Object.values(this.props.bsReducer.allbs).reduce((a, b) => ({...a, ...b}), {});

        return (
            <div className='pphcx'>
                <Row>
                    <Col span={2}>
                        品牌：
                    </Col>
                    <Col span={20}>
                        <Tabs defaultActiveKey="1" onChange={()=>{}}>
                            {
                                Object.keys(this.props.bsReducer.allbs).map(zimu => <TabPane tab={zimu} key={zimu}>
                                    {
                                        Object.keys(this.props.bsReducer.allbs[zimu]).map(pinpai => <a 
                                            className={classnames({
                                                'cur': this.props.bsReducer.brand === pinpai
                                            })}
                                            key={pinpai}
                                            onClick={()=>{
                                                this.props.dispatch({'type': 'CHANGEBRAND', 'brand': pinpai})
                                            }}
                                        >
                                            {pinpai}
                                        </a>)
                                    }
                                </TabPane>)
                            }
                        </Tabs>
                    </Col>
                </Row>
                <div style={{
                    "height": "20px"
                }}></div>
                <Row>
                    <Col span={2}>
                        车系：
                    </Col>
                    <Col span={20}>
                        {
                            flattenObj[this.props.bsReducer.brand] !== undefined
                            ?
                            flattenObj[this.props.bsReducer.brand].map(chexi => <a
                                key={chexi}
                                className={classnames({
                                    'cur': this.props.bsReducer.series === chexi
                                })}
                                onClick={()=>{
                                    this.props.dispatch({'type': 'CHANGESERIES', 'series': chexi})
                                }}
                            >
                                {chexi}
                            </a>)
                            :
                            null
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}
