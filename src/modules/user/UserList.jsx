/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Table ,Card} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import axios from 'axios';
import { Popconfirm, message } from 'antd';

class UserList extends React.Component {
    constructor(props){
        super(props)
        this.state={
            data:null,
            totalCount:0
        }
        this.columns = [{
            title: '用户名',
            dataIndex: 'name',
            fixed: 'left'
        }, {
            title:'头像',
            dataIndex:"header",
            render:(text,record) => (
                <img style={{width:"40px"}} src={record.header}/>
            )
        }, {
            title: '类型',
            dataIndex: 'type',
        }, {
            title: '注册时间',
            dataIndex: 'createtime',
        },{
            title:'技能',
            dataIndex:'skill',
        },{
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width:"80",
            render: (text, record) => (  //塞入内容
                <span>

                    <a onClick={this.edit.bind(this,record)}>编辑</a>
                     <Popconfirm  title="确定要删除这条记录吗？" onConfirm={this.confirm.bind(this,record)} onCancel={this.cancel.bind(this)}>
                        <a style={{marginLeft:'8px'}} href="#">删除</a>
                      </Popconfirm>
                    {/*　　<Link className="topo-data" to={{pathname:'/a',query:{id:text.id}}}>数据拓扑</Link>*/}
                </span>
            ),
        }];
    }
    confirm(record) {
        message.success('已删除'+record.id+"记录");
    }

    cancel() {
        message.error('点击了取消');
    }
    componentDidMount(){
        this.requestPageData(1,10)
    }

    edit(record){
        console.log(record)
    }

    delete(record){
        console.log(record)

    }

    /*翻页事件*/
    onShowSizeChange(current, pageSize){
        console.log(current + "==" +pageSize)
    };

    /*分页事件*/
    onChange(current){
        console.log(current)
        this.requestPageData(current,10)
    };
    /*行选中事件*/
    onRowClick(record,index){
        console.log(record)
        console.log(index)
    }
    /*显示总条数*/
    showTotal(){
        return '共 ' + this.state.totalCount + ' 条数据';
    }
    /*请求分页数据*/
    requestPageData(pageNum,pageSize){
        var _this = this
        axios.post("http://localhost:8080/hero/queryPageList",{pageNum:pageNum,pageSize:pageSize},null).then(res => {
            console.log(res.data.data);
            var resData = res.data.data.dataList;
            for(var i=0;i<resData.length;i++){
                if(resData[i].createtime != null && resData[i].createtime != ""){
                    resData[i].createtime = resData[i].createtime.substring(0,19).replace("T"," ");
                }
                resData[i].header = "http://www.dyjkglass.com/qiangu.png"
            }
            _this.setState({
                data:resData,
                totalCount:res.data.data.totalCount
            })
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
       const pagination = {
            total: this.state.totalCount,/*这里是所有的数据*/
            showSizeChanger: false,
            //把下面这两个函数变为对象，这样它们的函数里就了this再bind this就没问题了
            onShowSizeChange:this.onShowSizeChange.bind(this),
            onChange:this.onChange.bind(this),

           showTotal:this.showTotal.bind(this)
        }

        const rowKey = function(record) {
            return record.id;  // 比如你的数据主键是 id
        };

        return (
            <div>
                <BreadcrumbCustom first="用管理户" second="用户列表" />
                {/*<Card title="用户列表">*/}
                    <Table style={{background:"white"}} columns={this.columns} dataSource={this.state.data} pagination={pagination} size={"middle"}
                           rowKey={rowKey} scroll={{ x: 1300 }}/>
                {/*</Card>*/}
            </div>

        );
    }
}

export default UserList;