import React, { Component } from 'react';
import { Form, Input, Cascader, Radio  } from 'antd';
import {connect} from 'react-redux';

@Form.create({
    'name': 's1form'
})
@connect(
    ({bsReducer}) => ({
        bsReducer
    }),
    (dispatch) => ({
        dispatch
    })
)
export default class S1 extends Component {
    componentWillMount(){
        this.props.dispatch({'type': 'LOADALLBS'});
    }
    render() {
        const { getFieldDecorator } = this.props.form;

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

        // 级联菜单的选项
        const options = Object.keys(this.props.bsReducer.allbs).map(item => ({
            'value': item,
            'label': item,
            'children': Object.keys(this.props.bsReducer.allbs[item]).map(_item => ({
                'value': _item,
                'label': _item,
                'children': this.props.bsReducer.allbs[item][_item].map(__item => ({
                    'value': __item,
                    'label': __item
                }))
            }))
        }));

        return (
            <div className="sbox">
                <Form {...formItemLayout}>
                    <Form.Item label="车架号">
                        {
                            getFieldDecorator(
                                'vin', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '必填此项，大兄弟'
                                        },
                                        {
                                            pattern: /^\w{17}$/,
                                            message: '必须为17位，大兄弟'
                                        }
                                    ]
                                }
                            )(<Input />)
                        }
                    </Form.Item>
                    <Form.Item label="品牌和车系">
                        {
                            getFieldDecorator(
                                'bs', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '必填此项，大兄弟'
                                        }
                                    ]
                                }
                            )(<Cascader options={options} />)
                        }
                    </Form.Item>
                    <Form.Item label="里程表读数">
                        {
                            getFieldDecorator(
                                'km', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '必填此项，大兄弟'
                                        },
                                        {
                                            pattern: /^\d{1,6}$/,
                                            message: '必须1位到6位的数字啊，大兄弟'
                                        }
                                    ]
                                }
                            )(<Input />)
                        }
                    </Form.Item>
                    <Form.Item label="售价">
                        {
                            getFieldDecorator(
                                'price', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '必填此项，大兄弟'
                                        }
                                    ]
                                }
                            )(<Input />)
                        }
                    </Form.Item>
                    <Form.Item label="排放">
                        {
                            getFieldDecorator(
                                'exhaust', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '必填此项，大兄弟'
                                        }
                                    ]
                                }
                            )(
                                <Radio.Group>
                                    {
                                        ['国一', '国二', '国三', '国四', '国五'].map(item =>  <Radio key={item} value={item}>
                                            {item}
                                        </Radio>)
                                    }                 
                                </Radio.Group>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="颜色">
                        {
                            getFieldDecorator(
                                'color', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '必填此项，大兄弟'
                                        }
                                    ]
                                }
                            )(
                                <Radio.Group>
                                    {
                                        ['黑','白','红','灰','蓝','黄','银灰','橙','绿','紫','香槟','咖啡','其他'].map(item =>  <Radio key={item} value={item}>
                                            {item}
                                        </Radio>)
                                    }                 
                                </Radio.Group>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="排量">
                        {
                            getFieldDecorator(
                                'engine', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '必填此项，大兄弟'
                                        }
                                    ]
                                }
                            )(
                                <Radio.Group>
                                    {
                                        ['1.0L', '1.2L', '1.4L', '1.4T', '1.6L', '1.6T'].map(item =>  <Radio key={item} value={item}>
                                            {item}
                                        </Radio>)
                                    }                 
                                </Radio.Group>
                            )
                        }
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
