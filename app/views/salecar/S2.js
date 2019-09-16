import React, { Component } from 'react'
import { Form, Input, Cascader, Radio, Button, Row, Col } from 'antd';
import axios from 'axios';
import Sfz from './Sfz.js';

var token = '';

@Form.create({
    'name': 's2form'
})
export default class S2 extends Component {
    constructor(){
        super();

        this.state = {
            cutdown: 60,
            type: '1'       //1没发，2已经发了
        }
    }


    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;

        // 布局
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 }
            },
            wrapperCol: {
                xs: { span: 18 },
                sm: { span: 18 }
            },
        };


        // 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
        // 详情查看javascript的数值范围
        function checkIDCard(idcode){
            // 加权因子
            var weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
            // 校验码
            var check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2'];

            var code = idcode + "";
            var last = idcode[17];//最后一位

            var seventeen = code.substring(0,17);

            // ISO 7064:1983.MOD 11-2
            // 判断最后一位校验码是否正确
            var arr = seventeen.split("");
            var len = arr.length;
            var num = 0;
            for(var i = 0; i < len; i++){
                num = num + arr[i] * weight_factor[i];
            }
            
            // 获取余数
            var resisue = num%11;
            var last_no = check_code[resisue];

            // 格式的正则
            // 正则思路
            /*
            第一位不可能是0
            第二位到第六位可以是0-9
            第七位到第十位是年份，所以七八位为19或者20
            十一位和十二位是月份，这两位是01-12之间的数值
            十三位和十四位是日期，是从01-31之间的数值
            十五，十六，十七都是数字0-9
            十八位可能是数字0-9，也可能是X
            */
            var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

            // 判断格式是否正确
            var format = idcard_patter.test(idcode);

            // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
            return last === last_no && format ? true : false;
        }

        return (
 
                <Form {...formItemLayout} className="sbox">
                    <Form.Item label="中文姓名">
                        {
                            getFieldDecorator(
                                'name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '必填此项，大兄弟'
                                        },
                                        {
                                            pattern: /^([\u4e00-\u9fa5]|[a-zA-Z]| |·|-|●|(\（+\）)|(\（[\u4e00-\u9fa5]+\）)|(\（[a-zA-Z]+\）))+$/,
                                            message: '请填写正确的姓名'
                                        }
                                    ]
                                }
                            )(<Input />)
                        }
                    </Form.Item>
                    <Form.Item label="身份证号码">
                        {
                            getFieldDecorator(
                                'idcard', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '必填此项，大兄弟'
                                        },
                                        {
                                            validator(a, b, cb){
                                                var name = getFieldValue('name');
                                                
                                                // 先检查身份证形态是否正确
                                                if(checkIDCard(b)){
                                                    // 再发出Ajax问公安部是否人、号匹配
                                                    axios.get('http://192.168.2.250:9027/check.php?idcard=' + b + '&name=' + name).then((data)=>{
                                                        var mydata = data.data;
                                                        // 字符串，不是对象
                                                        if(mydata.includes('"msg":"匹配"')){
                                                            // 没有内容表示通过
                                                            cb();
                                                        }else{
                                                            cb('经和公安部比对，您的身份证和姓名不符');
                                                        }
                                                    });
                                                }else{
                                                    cb('请输入正确形式的身份证号码');
                                                }
                                            }
                                        }
                                    ]
                                }
                            )(<Input />)
                        }
                    </Form.Item>
                    {/* <Form.Item label="手机号码">
                        <Row>
                            <Col span={14}>
                                {
                                    getFieldDecorator(
                                        'phone', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '必填此项，大兄弟'
                                                },
                                                {
                                                    pattern: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
                                                    message: '请填写正确的手机号码'
                                                }
                                            ]
                                        }
                                    )(<Input />)
                                }
                            </Col>
                            <Col offset={1} span={4}>
                                <Button onClick={()=>{
                                    // 得到手机号码
                                    var phone = getFieldValue('phone');
                                    // 检查正则
                                    if(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(phone)){
                                        this.setState({
                                            type: '2'
                                        });
                                        // 定时器
                                        this.timer = setInterval(() => {
                                            if(this.state.cutdown === 0){
                                                this.setState({
                                                    type: '1'
                                                });
                                                // 清除定时器
                                                clearInterval(this.timer);
                                            }
                                            this.setState({
                                                cutdown: this.state.cutdown - 1
                                            });
                                        }, 1000);
                                        // 发出Ajax请求，要求给用户发出手机短信
                                        axios.get('http://127.0.0.1/a.php?phone=' + phone).then(data => {
                                            token = data.data;
                                        });
                                    }
                                }} disabled={this.state.type === '2'}>
                                    {
                                        this.state.type === '1'
                                        ?
                                        '发送验证码'
                                        :
                                        '已经发送（' + this.state.cutdown + '）'
                                    }
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item label="手机验证码">
                        {
                            getFieldDecorator(
                                'yanzhengma', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '必填此项，大兄弟'
                                        },
                                        {
                                            validator(a, b, cb){
                                                axios.get('http://192.168.2.250:9027/b.php?yanzhengma=' + b + '&token=' + token).then((data)=>{
                                                    var info = data.data;
                                                    if(info === 'ok'){
                                                        cb();
                                                    }else{
                                                        cb('请输入正确的验证码');
                                                    }
                                                });
                                            }
                                        }
                                    ]
                                }
                            )(<Input />)
                        }
                    </Form.Item> */}
                    <Form.Item label="*上传身份证">
                        <Row>
                            <Col span={11}>
                                <Sfz info='人像面' ref="zhengmian" onDone={this.props.changeZhengmianfile}/>
                            </Col>
                            <Col span={11} offset={1}>
                                <Sfz info='国徽面' ref="beimian" onDone={this.props.changeBeimianfile}/>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
             
        )
    }
}
