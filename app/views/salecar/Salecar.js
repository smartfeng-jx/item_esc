import React, { Component } from 'react';
import SecondaryLayout from '../../layouts/SecondaryLayout.js';
import { Steps, Button, message, Modal } from 'antd';
import S1 from './S1.js';
import S2 from './S2.js';
import S3 from './S3.js';
import S4 from './S4.js';
import './css.css';
import ModalInner from './ModalInner.js';
import axios from 'axios';

const { Step } = Steps;

var step1data = null;

export default class Salecar extends Component {
    constructor(){
        super();

        this.state = {
            visible: false,
            zhengmianfile: null,
            beimianfile: null,
            nowStep: 1
        };
    }

    
    changeZhengmianfile(file){
        this.setState({
            zhengmianfile: file
        });
    }

    changeBeimianfile(file){
        this.setState({
            beimianfile: file
        });
    }

    render() {
        return (
            <SecondaryLayout c1="ershouche" c2="salecar">
                <Steps current={this.state.nowStep - 1}>
                    <Step title="车辆基本信息填写" />
                    <Step title="卖车人基本信息填写" />
                    <Step title="车辆照片上传" />
                    <Step title="成功" />
                </Steps>
                
                {
                    (()=>{
                        if(this.state.nowStep === 1){
                            return  <S1 ref="s1" />;
                        }else if(this.state.nowStep === 2){
                            return  <S2 ref="s2" changeZhengmianfile={this.changeZhengmianfile.bind(this)} changeBeimianfile={this.changeBeimianfile.bind(this)}/>;
                        }else if(this.state.nowStep === 3){
                            return  <S3 ref="s3" />;
                        }else if(this.state.nowStep === 4){
                            return  <S4 />;
                        }
                    })()
                }

                <Button type="primary" onClick={()=>{
                    if(this.state.nowStep === 1){
                        step1data = this.refs.s1.getFieldsValue();
                        // 判断S1表单的正确性
                        this.refs.s1.validateFields((a)=>{
                            // 只有a是null表示没有错误
                            if(a === null){
                                this.setState({
                                    nowStep: this.state.nowStep + 1
                                });
                            }else{
                                message.error('请修正错误提示项');
                            }
                       });
                    }else if(this.state.nowStep === 2){
                        // 判断S2表单的正确性
                        this.refs.s2.validateFields((a)=>{
                            // 只有a是null表示没有错误
                            if(a === null){
                                if(this.state.zhengmianfile === null || this.state.beimianfile === null){
                                    message.error('请上传身份证照片');
                                }else{
                                    this.setState({
                                        visible: true
                                    });
                                }
                            }else{
                                message.error('请修正错误提示项');
                            }
                       });
                    }else if(this.state.nowStep === 3){
                        console.log('亲爱的主人，所有信息已经准备就绪，它们是');
 
                       axios.post('/api/addcar',{
                            'brand': step1data.bs[1],
                            'series': step1data.bs[2],
                            'color': step1data.color,
                            'exhaust': step1data.exhaust,
                            'km': step1data.km,
                            'price': step1data.price,
                            images: {
                                views: this.refs.s3.refs.viewbufen.state.arr.map(item => item.serverfilename),
                                inner: this.refs.s3.refs.innerbufen.state.arr.map(item => item.serverfilename),
                                engine: this.refs.s3.refs.enginebufen.state.arr.map(item => item.serverfilename),
                                more: this.refs.s3.refs.morebufen.state.arr.map(item => item.serverfilename)
                            }
                        }).then(data => data.data);
                    }
                }}>下一步</Button>

                <Modal
                    title="正在上传身份证照片"
                    visible={this.state.visible}
                    onCancel={()=>{

                    }}
                    footer={<div>
                        <Button>取消上传</Button>
                    </div>}
                >
                    <ModalInner 
                        zhengmianfile={this.state.zhengmianfile} 
                        beimianfile={this.state.beimianfile} 
                        onAllDone={()=>{
                            this.setState({
                                nowStep: 3,
                                visible: false
                            });
                        }}
                    />
                </Modal>
            </SecondaryLayout>
        )
    }
}
