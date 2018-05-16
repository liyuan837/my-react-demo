/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
const FormItem = Form.Item;
const Option = Select.Option;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class UserAdds extends Component {
    state = {
        confirmDirty: false,
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select className="icp-selector" style={{width: '60px'}}>
                <Option value="86">+86</Option>
            </Select>
        );
        return (
        <div className="gutter-example">
            <BreadcrumbCustom first="用戶管理" second="用戶添加" />
               <div style={{background:"white"}}>
                   <Form onSubmit={this.handleSubmit} style={{width:'30%',margin:'0px auto',background:'white',padding:"20px"}}>
                       <FormItem
                           {...formItemLayout}
                           label="姓名"
                           hasFeedback
                       >
                           {getFieldDecorator('name', {
                               rules: [{
                                   required: true, message: '请输入姓名!',
                               }],
                           })(
                               <Input />
                           )}
                       </FormItem>


                       <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                           {getFieldDecorator('agreement', {
                               valuePropName: 'checked',
                           })(
                               <Checkbox>我已经阅读过 <a href="">协议</a></Checkbox>
                           )}
                       </FormItem>
                       <FormItem {...tailFormItemLayout}>
                           <Button type="primary" htmlType="submit" size="large">添加</Button>
                       </FormItem>
                   </Form>
               </div>
        </div>
        )
    }
}

const UserAdd = Form.create()(UserAdds);

export default UserAdd;