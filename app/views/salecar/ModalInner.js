import React, { Component } from 'react';
import { Progress } from 'antd';
import axios from 'axios';

export default class ModalInner extends Component {
    constructor(){
        super();

        this.state = {
            percent1: 0,
            percent2: 0,
            base641: '',
            base642: '',
        };
    }

    componentWillMount(){
        // 筹备base64
        var file1 = this.props.zhengmianfile;
        var file2 = this.props.beimianfile;
        // HTML5的新东西
        var fr1 = new FileReader();
        fr1.readAsDataURL(file1);
        fr1.onload = (_e) => {
            this.setState({
                base641: _e.target.result
            });
        };
        var fr2 = new FileReader();
        fr2.readAsDataURL(file2);
        fr2.onload = (_e) => {
            this.setState({
                base642: _e.target.result
            });
        };

        // 实现上传
        // 创建虚拟表单
        var vform1 = new FormData();
        // 追加文件
        vform1.append('file', file1);
        axios({
            'method': 'post',
            'url': '/api/uppic',
            'data': vform1,
            'onUploadProgress': (e) => {
                this.setState({
                    percent1: e.loaded / e.total * 100
                }, () => {
                    if(this.state.percent1 === 100 && this.state.percent2 === 100){
                        this.props.onAllDone();
                    }
                });

                
            }
        });

        var vform2 = new FormData();
        // 追加文件
        vform2.append('file', file2);
        axios({
            'method': 'post',
            'url': '/api/uppic',
            'data': vform2,
            'onUploadProgress': (e) => {
                this.setState({
                    percent2: e.loaded / e.total * 100
                }, () => {
                    
                    if(this.state.percent1 === 100 && this.state.percent2 === 100){
                         
                        this.props.onAllDone();
                    }
                });
            }
        });
    }


    render() {
        return (
            <div>
                <div>
                    <img src={this.state.base641} width="80" />
                    <Progress percent={this.state.percent1} status="active" />
                </div>
                <div>
                    <img src={this.state.base642} width="80" />
                    <Progress percent={this.state.percent2} status="active" />
                </div>
            </div>
        )
    }
}
