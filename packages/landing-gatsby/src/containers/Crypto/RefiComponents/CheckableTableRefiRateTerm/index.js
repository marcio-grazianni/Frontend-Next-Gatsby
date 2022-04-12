import React, { useState } from 'react';
import { Table, Radio, Divider, Space, Tag } from 'antd';
const { Column, ColumnGroup } = Table;

const columns1 = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data1 = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const columns = [
  {
    title: 'Rate/APR',
    dataIndex: 'term',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Points',
    dataIndex: 'APR',
  },
  {
    title: 'Monthly payment',
    dataIndex: 'monthly',
  },
];

const data = [
  {
    key: '1',
    term: '54 year',
    APR: '5.750%',
    monthly: '$405',
  },
  {
    key: '2',
    term: '10 year',
    APR: '6.750%',
    monthly: '$242',
  },
  {
    key: '3',
    term: '15 year',
    APR: '7.390%',
    monthly: '$194',
  },
  {
    key: '4',
    term: '30 year',
    APR: '8.000%',
    monthly: '$154',
  },
];

const CheckableTable = () => {
  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={false} />

      <Table columns={columns1} dataSource={data1} />
    </div>
  );
};

export default CheckableTable;
