/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Table } from 'antd';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
}, {
    title: 'Age',
    dataIndex: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 10; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

class SelectTable extends React.Component {
    state = {
        selectedRowKeys: [],  // Check here to configure the default column
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    /*翻页事件*/
    onShowSizeChange(current, pageSize){
        console.log(current + "==" +pageSize)
    };

    /*分页事件*/
    onChange(current){
        console.log(current)
    };
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [{
                key: 'odd',
                text: '选择奇数列',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }, {
                key: 'even',
                text: '选择偶数列',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }],
            onSelection: this.onSelection,
        };

        const pagination = {
            total: 46,/*这里是所有的数据*/
            showSizeChanger: true,
            //把下面这两个函数变为对象，这样它们的函数里就了this再bind this就没问题了
            onShowSizeChange:this.onShowSizeChange.bind(this),
            onChange:this.onChange.bind(this)
        }

        return (
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={pagination}/>
        );
    }
}

export default SelectTable;