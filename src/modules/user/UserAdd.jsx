/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button,Upload,message } from 'antd';
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
        imageUrl:''
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleChange = (info) => {
        console.log(info)
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }
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

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;


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

                       <FormItem  {...formItemLayout} label="头像">
                           <Upload
                               name="avatar"
                               listType="picture-card"
                               className="avatar-uploader"
                               showUploadList={false}
                               action="//jsonplaceholder.typicode.com/posts/"
                               beforeUpload={this.beforeUpload}
                               onChange={this.handleChange}
                           >
                               {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
                           </Upload>
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