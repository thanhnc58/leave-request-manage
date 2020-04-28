import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Holiday.css';
import { Table, Input, DatePicker, Popconfirm, Form,Button } from 'antd';
import moment from "moment";
import {getHoliday, addHoliday, updateHoliday, removeHoliday} from "../mockData/Holiday";
const {RangePicker} = DatePicker;

const originData = [];

for (let i = 0; i < 15; i++) {
    originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        date: ['2020-02-11', '2020-02-13'],
        day: `London Park no. ${i}`,
    });
}

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    let inputNode =  <input />;
    let newchild = children
    if (dataIndex === "date"){
        console.log(children,'gg');
        newchild = children[1][0] + '  -  ' + children[1][1]
        inputNode = <RangePicker />
    }
    let checking = editing && dataIndex !== "day";
    return (
        <td {...restProps}>
            {checking ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                newchild
            )}
        </td>
    );
};

const Holiday = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(getHoliday());
    const [editingKey, setEditingKey] = useState('');

    const isEditing = record => record.key === editingKey;

    const edit = record => {
        console.log(record);
        let a = {...record};
        a.date = [moment(a.date[0], 'YYYY-MM-DD'), moment(a.date[1], 'YYYY-MM-DD')];
        form.setFieldsValue(a);
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async index => {
        try {
            const row = await form.validateFields();
            console.log(row, "what");
            let newday = row.date[0].format('dddd') + ' - '+row.date[1].format('dddd');
            if (row.date[0].format('dddd') === row.date[1].format('dddd')){
                newday = row.date[0].format('dddd')
            }
            let newdata = {
                name: row.name,
                date: [row.date[0].format('YYYY-MM-DD'),row.date[1].format('YYYY-MM-DD')],
                day: newday,
                key: index
            };
            let data = updateHoliday(index, newdata);
            setData(data);
            setEditingKey('');

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const add = () => {
        let newRow = {
            name : 'new holiday',
            date : [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
            day : moment().format('dddd')
        };
        let newData = addHoliday(newRow);
        setData(newData);
        // let editingData = newData[newData.length-1];
        // editingData.date = [moment(editingData.date[0], 'YYYY-MM-DD'), moment(editingData.date[1], 'YYYY-MM-DD')];
        // form.setFieldsValue(editingData);
        // console.log(editingData.key,'tttt');
        // setEditingKey(editingData.key)
    };

    const remove = index => {
        let data = removeHoliday(index);
        setData(data)

    };

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        },
        {
            title: 'date',
            dataIndex: 'date',
            width: '25%',
            editable: true,
        },
        {
            title: 'day',
            dataIndex: 'day',
            width: '25%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                console.log(record);
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <a
                href="javascript:;"
                onClick={() => save(record.key)}
                style={{
                    marginRight: 8,
                }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <div>
                        <a style={{ marginRight: 16 }} disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </a>
                        <a disabled={editingKey !== ''} onClick={() => remove(record.key)}>
                            delete
                        </a>
                    </div>
                );
            },
        },
    ];
    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    console.log(data,"te");
    return (
        <Form form={form} component={false}>
            <Button
                type="primary"
                onClick={add}
                style={{
                    marginBottom: 16,
                }}
            >
                Add a row
            </Button>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                tableLayout={"fixed"}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                    defaultPageSize: 7
                }}
            />
        </Form>
    );
};

export default Holiday;