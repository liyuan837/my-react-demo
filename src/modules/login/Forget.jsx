import React from 'react';
import { Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as type from '@/action/type';
import { changeState, sendMsg, submitPwd } from '@/action';

const FormItem = Form.Item;

class Forget extends React.Component {
    render() {
        let that = this;
        console.log(that.props.forgetStore.forgetInfo.phone);
        return (
            <div className="forget">
                <div>
                    <div>
                        <Row gutter={16}>
                            <Col span={10}>
                                <div className="ant-form-item-control">
                                    <Input
                                        name="phone"
                                        prefix={<Icon type="phone" style={{ fontSize: 13 }} />}
                                        style={{ fontSize: 13 }}
                                        placeholder="手机号"
                                        onChange={e => that._handleChangeDUserCode(e, 'phone')}
                                    />
                                </div>
                            </Col>
                            <Col span={5}>{/*表单验证信息提示*/}</Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <div className="ant-form-item-control">
                                    <Input
                                        name="code"
                                        placeholder="验证码"
                                        value={that.props.forgetStore.forgetInfo.code}
                                        onChange={e => that._handleChangeDUserCode(e, 'code')}
                                    />
                                </div>
                            </Col>
                            <Col span={6}>
                                <Button className="sendCode" onClick={() => that.enterIconLoading()}>
                                    发送
                                </Button>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={10}>
                                <div className="ant-form-item-control">
                                    <Input
                                        prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                        type="password"
                                        size="large"
                                        placeholder="请输入新密码"
                                        name="password"
                                        maxLength="20"
                                        /* value={that.props.forgetStore.forgetInfo.password}*/
                                        onChange={e => that._handleChangeDUserCode(e, 'password')}
                                    />
                                </div>
                            </Col>

                            <Col span={5}>{/*表单验证信息提示*/}</Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={10}>
                                <div className="ant-form-item-control">
                                    <Input
                                        prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                        type="password"
                                        size="large"
                                        placeholder="请确认新密码"
                                        name="confirm"
                                        maxLength="20"
                                        /* value={that.props.forgetStore.forgetInfo.newPwd}*/
                                        onChange={e => that._handleChangeDUserCode(e, 'confirm')}
                                    />
                                </div>
                            </Col>
                            <Col span={5} />
                        </Row>
                        <Row gutter={16}>
                            <Col span={3}>&nbsp;</Col>
                            <Col span={5}>
                                <Button size="large" type="primary" onClick={() => that._submit()}>
                                    保存
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }

    enterIconLoading() {
        let that = this;
        let phone = that.props.forgetStore.forgetInfo.phone;
        let sendMsg = that.props.sendMsg;
        sendMsg(phone);
    }

    _handleChangeDUserCode(e, name) {
        let that = this;
        let forgetInfo = that.props.forgetStore.forgetInfo;
        console.log(forgetInfo);
        forgetInfo[name] = e.target.value;
        let changeState = that.props.changeState;
        changeState(type.FORGET_CHANGE_TEXT, 'forgetInfo', forgetInfo);
    }

    _submit() {
        alert(2);
        let that = this;
        let phone = that.props.forgetStore.forgetInfo.phone;
        let code = that.props.forgetStore.forgetInfo.code;
        let password = that.props.forgetStore.forgetInfo.password;
        let confirm = that.props.forgetStore.forgetInfo.confirm;

        if (password && confirm && password == confirm) {
            /*   ModalTip.warningTip('新密码和旧密码一样');*/
            return;
        }
        let submitPwd = that.props.submitPwd;
        console.log('submitPwd  ' + submitPwd);
        submitPwd(that.props.forgetStore.forgetInfo);
    }
}

const mapStateToPorps = state => {
    return {
        forgetStore: state.forget
    };
};
const mapDispatchToProps = dispatch => ({
    changeState: bindActionCreators(changeState, dispatch),
    sendMsg: bindActionCreators(sendMsg, dispatch),
    submitPwd: bindActionCreators(submitPwd, dispatch)
});

export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Forget));
