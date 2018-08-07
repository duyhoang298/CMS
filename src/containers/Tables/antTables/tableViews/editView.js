import React, { Component } from 'react';
import clone from 'clone';
import TableWrapper from '../antTable.style';
import {
  EditableCell,
  DeleteCell
} from '../../../../components/tables/helperCells';

export default class extends Component {
  constructor(props) {
    super(props);
    this.onCellChange = this.onCellChange.bind(this);
    this.onDeleteCell = this.onDeleteCell.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      columns: this.createcolumns(clone(this.props.tableInfo.columns)),
      dataList: this.props.dataList.getAll()
    };
  }
  createcolumns(columns) {
    // const editColumnRender = (text, record, index) => (
    //   <EditableCell
    //     index={index}
    //     columnsKey={columns[0].key}
    //     value={text[columns[0].key]}
    //     onChange={this.onCellChange}
    //   />
    // );
    // columns[0].render = editColumnRender;


    const EditName = (text, record, index) => (
      <EditableCell
        index={index}
        columnsKey={columns[1].key}
        value={text[columns[1].key]}
        onChange={this.onCellChange}
      />
    );
    columns[1].render = EditName;


    const deleteColumn = {
      title: 'Action',
      dataIndex: 'operation',
      render: (text, record, index) => (
        <DeleteCell index={index} onDeleteCell={this.onDeleteCell} />
      )
    };
    const deleteColuman = {
      title: 'Action',
      dataIndex: 'operation',
      render: (text, record, index) => (
        <DeleteCell index={index} onDeleteCell={this.onDeleteCell} />
      )
    };
    columns.push(deleteColumn, deleteColuman);
    return columns;
  }
  onCellChange(value, columnsKey, index) {
    const { dataList } = this.state;
    dataList[index][columnsKey] = value;
    this.setState({ dataList });
  }
  onDeleteCell = index => {
    const { dataList } = this.state;
    dataList.splice(index, 1);
    this.setState({ dataList });
  };
  onChange(pagination, filters, sorter) {
    const { dataList } = this.props;
    if (sorter && sorter.columnKey && sorter.order) {
      if (sorter.order === 'ascend') {
        dataList.getSortAsc(sorter.columnKey);
      } else {
        dataList.getSortDesc(sorter.columnKey);
      }
      this.setState({ dataList: dataList.getAll() });
    }
  }
  render() {
    const { columns, dataList } = this.state;

    return (
      <TableWrapper
        columns={columns}
        dataSource={dataList}
        className="isoEditableTable"
        onChange={this.onChange}
      />
    );
  }
}
