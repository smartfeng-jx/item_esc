import React, { Component } from 'react';
import {Button} from 'antd';
import OneTu from './OneTu.js';

export default class Bufen extends Component {
    constructor(){
        super();

        this.state = {
            // 文件数组
            arr: []
        };
    }

    componentDidMount(){
        // 阻止浏览器默认拖拽事件
        document.addEventListener('dragover', function(e){
            e.preventDefault();
        });

        document.addEventListener('drop', function(e){
            e.preventDefault();
        });
    }

    // 改变key这项的serverfilename
    changeServerfilenameByKey(key, serverfilename){
        console.log('我是changeServerfilenameByKey', key, serverfilename)
        this.setState({
            arr: this.state.arr.map(item => {
                if(item.key == key){
                    return {
                        ...item,
                        serverfilename
                    };
                }
                return item;
            })
        });
    }

    render() {
        return (
            <div>
                <h3>
                    请上传{this.props.info}的照片： 
                    <Button type="primary" onClick={()=>{
                        var evt = document.createEvent('MouseEvents');
                        evt.initMouseEvent('click', false, false);
                        this.refs.file.dispatchEvent(evt);
                    }}>添加</Button>
                </h3>
                <input type="file" name="file" ref="file" hidden multiple onChange={(e)=>{
                    // console.log(e.target.files);
                    var __arr = [];
                    for(let i = 0 ; i < e.target.files.length ; i++){
                        __arr.push({
                            file: e.target.files[i],
                            key: Math.random(),
                            serverfilename: ''
                        })
                    }

                    this.setState({
                        arr: [...this.state.arr, ...__arr]
                    });
                }} />

                <div className="bufenkuang" onDrop={(e)=>{
                    var __arr = [];
                    for(let i = 0 ; i < e.dataTransfer.files.length ; i++){
                        __arr.push({
                            file: e.dataTransfer.files[i],
                            key: Math.random(),
                            serverfilename: ''
                        })
                    }

                    this.setState({
                        arr: [...this.state.arr, ...__arr]
                    });
                }}>
                    {
                        this.state.arr.map((item, index) => {
                            // console.log(item);
                            // // 随机起名，Vue有缺点，最大的缺点就是写程序的地方少
                            // var key = Math.random();
                            return <OneTu 
                                info={{
                                    'key': item.key,
                                    'file': item.file,
                                    'changeServerfilenameByKey': this.changeServerfilenameByKey.bind(this)
                                }}
                                key={item.key}
                                items={this.state.arr}
                                sortId={index}
                                onSortItems={(arr)=>{
                                    this.setState({
                                        arr
                                    });
                                }}
                            />
                        })
                    }
                </div>
            </div>
        )
    }
}
