import React, {useState} from 'react';
import 'antd/dist/antd.css';
import './Holiday.css';
import {Table, DatePicker, Popconfirm, Form, Button, message} from 'antd';
import moment from "moment";
import {getHoliday, addHoliday, updateHoliday, removeHoliday} from "../mockData/Holiday";

const {RangePicker} = DatePicker;

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    let inputNode = <input/>;
    let newchild = children
    if (dataIndex === "date") {
        newchild = children[1][0] + '  -  ' + children[1][1]
        inputNode = <RangePicker/>
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
            let newDay = row.date[0].format('dddd') + ' - ' + row.date[1].format('dddd');
            if (row.date[0].format('dddd') === row.date[1].format('dddd')) {
                newDay = row.date[0].format('dddd')
            }
            let newData = {
                name: row.name,
                date: [row.date[0].format('YYYY-MM-DD'), row.date[1].format('YYYY-MM-DD')],
                day: newDay,
                key: index
            };
            let data = updateHoliday(index, newData);
            setData(data);
            setEditingKey('');
            message.success("Holiday updated");

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const add = () => {
        let newRow = {
            name: 'new holiday',
            date: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
            day: moment().format('dddd')
        };
        let newData = addHoliday(newRow);
        setData(newData);
        message.success("New holiday added")
    };

    const remove = index => {
        let data = removeHoliday(index);
        setData(data)
        message.success("Holiday removed")
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            width: '25%',
            editable: true,
        },
        {
            title: 'Day',
            dataIndex: 'day',
            width: '25%',
            editable: true,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {
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
                        <a style={{marginRight: 16}} disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </a>
                        <a disabled={editingKey !== ''} onClick={() => remove(record.key)}>
                            Delete
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
                dataSource={data.sort((a, b) => b.key - a.key)}
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