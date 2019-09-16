import React, { Component } from 'react';
import axios from 'axios';
import { Progress } from 'antd';
import { sortable } from 'react-sortable';

@sortable
export default  class OneTu extends Component {
    constructor(){
        super();

        this.state = {
            base64: ''
        };
    }

    componentWillMount(){
        var file = this.props.info.file;
        // console.log(this.props.info.file);
       
        // HTML5的新东西
        var fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = (e) => {
            this.setState({
                base64: e.target.result
            });
        };

        // 上传
        var vform = new FormData();
        // 追加文件
        vform.append('file', file);
        axios({
            'method': 'post',
            'url': '/api/uppic',
            'data': vform,
            'onUploadProgress': (e) => {
                this.setState({
                    percent: e.loaded / e.total * 100
                });
            }
        }).then(data => {
            // 调用父亲的函数改它自己
            this.props.info.changeServerfilenameByKey(this.props.info.key, data.data.filename); 
        });
    }

    render() {
        return (
            <div {...this.props} className="onetubox" style={{
                'backgroundImage': 'url(' + this.state.base64 + ')'
            }}>
                {
                    this.state.percent !== 100
                    ?
                    <div className="cover">
                        正在上传，请稍后
                        <Progress showInfo={false} percent={this.state.percent} status="active" />
                    </div>
                    :
                    null
                }
                
            </div>
        )
    }
}