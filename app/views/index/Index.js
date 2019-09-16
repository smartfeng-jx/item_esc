import React, { Component } from 'react';
import RootLayout from '../../layouts/RootLayout.js';
var echarts = require('echarts');
import {connect} from 'react-redux';

@connect(
    ({tutuReducer}) => ({
        tutuReducer
    }),
    dispatch => ({
        dispatch
    })
)
export default class Index extends Component {
    componentDidMount(){
        this.tutu1 = echarts.init(this.refs.tutu1);

        this.tutu1.setOption({
            title: {
                text: 'ECharts 入门示例',
                textStyle: {
                    color: 'red',
                    width: 100
                },
                textAlign: 'center'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar'
            }]
        });
    }

    componentWillMount(){
        // 发出Ajax
        this.props.dispatch({'type': 'LOADTUTU1'});
    }

    // 组件收到了新的props
    componentWillReceiveProps(nextProps){
        // alert(nextProps.tutuReducer.sj);
        this.tutu1.setOption({
            series: {
                data: nextProps.tutuReducer.sj
            }
        })
    }

    render() {
        return (
            <RootLayout c1="index">
                <div className="wrap">
                    <div ref="tutu1" style={{
                        "width": "400px",
                        "height": "300px"
                    }}></div>
                    
                </div>
            </RootLayout>
        )
    }
}
