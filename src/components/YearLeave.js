import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './Holiday.css';
import { Table, InputNumber, Popconfirm, Form,Button } from 'antd';
import {addYearLeave, deleteYearLeave, editYearLeave, getYearLeave} from "../mockData/YearLeave";

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
    if (editing && dataIndex === "year") {
        console.log(record)
    }
    return (
        <td {...restProps}>
            {editing ? (
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
                    <InputNumber />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const YearLeave = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(getYearLeave());
    const [editingKey, setEditingKey] = useState('');

    const isEditing = record => record.year === editingKey;

    const edit = record => {
        form.setFieldsValue(record);
        setEditingKey(record.year);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async record => {
        try {
            const row = await form.validateFields();
            let edit = {
                year : row.year.toString(),
                total : row.total,
            };
            let data = editYearLeave(record.year.toString(), row.year.toString(), edit);
            setData(data);
            setEditingKey('');

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const add = () => {
        let newRow = {
            year : -1,
            total : 15,
        };
        let newData = addYearLeave(newRow.year, newRow);
        setData(newData);
    };

    const remove = record => {
        let data = deleteYearLeave(record.year);
        setData(data)

    };

    const columns = [
        {
            title: 'Year',
            dataIndex: 'year',
            width: '30%',
            editable: true,
        },
        {
            title: 'Total',
            dataIndex: 'total',
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
                onClick={() => save(record)}
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
                        <a disabled={editingKey !== ''} onClick={() => remove(record)}>
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

    const preparedData = Object.keys(data).map( key => data[key]);

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
                dataSource={preparedData}
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

export default YearLeave;