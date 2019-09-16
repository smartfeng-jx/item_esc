import React, { Component } from 'react';
import {Icon} from 'antd';

export default class Sfz extends Component {
    constructor(){
        super();
        this.state = {
            base64: ''
        };
    }
    render() {
        return (
            <div className='sfzbox' onClick={()=>{
                var evt = document.createEvent('MouseEvents');
                evt.initMouseEvent('click', false, false);
                this.refs.file.dispatchEvent(evt);
            }} style={{
                'backgroundImage': `url(${this.state.base64})`
            }}>
                <div className="tip">
                    请上传身份证{this.props.info}照片
                    
                    <Icon type="plus" className="plus"/>
                </div>

                <input type="file" name="file" hidden ref="file" onChange={e=>{
                    var file = e.target.files[0];
                    // HTML5的新东西
                    var fr = new FileReader();
                    fr.readAsDataURL(file);
                    fr.onload = (_e) => {
                        this.setState({
                            base64: _e.target.result
                        });

                        // 回调父亲文件
                        this.props.onDone(file);
                    };
                }}/>
            </div>
        )
    }
}
