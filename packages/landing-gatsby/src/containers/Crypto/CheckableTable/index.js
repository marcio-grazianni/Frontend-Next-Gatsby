import React, { useState } from 'react';
import { Table, Radio, Divider } from 'antd';
const columns = [
  {
    title: 'Fixed Term',
    dataIndex: 'term',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'APR',
    dataIndex: 'APR',
  },
  {
    title: 'Est. monthly payments',
    dataIndex: 'monthly',
  },
];
const data = [
  {
    key: '1',
    term: '5 year',
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
]; // rowSelection object indicates the need for row selection

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
};

const CheckableTable = () => {
  const [selectionType, setSelectionType] = useState('radio');
  return (
    <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      ></Radio.Group>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};

export default CheckableTable;

//ReactDOM.render(<Demo />, mountNode);
