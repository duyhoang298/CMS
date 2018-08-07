import React, { Component } from 'react';
import { Table, Checkbox, Avatar, Select } from 'antd';
import { getListUsers, updateUser } from '../../redux/actions/user'
import { connect } from 'react-redux'
import './style.css'
import configs from '../../constants/configs'
import EditUser from './Popup/editUser';


class User extends Component {

  state = {
    data: [],
  }

  componentDidMount() {
    this.props.getListUsers(this.props.token)
    this.setState({ data: this.props.users })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.users !== nextProps.users) {
      this.setState({
        data: nextProps.users
      })

    }
  }

  handleChangeLevel = (value,rc) => {
    const formData = new FormData()
    formData.append('user[level]', value)
    this.props.updateUser(this.props.token, rc.id, formData)
  }



  onClick = (rc, type) => {
    const formData = new FormData()
    if (type === 'admin') {
      formData.append('user[admin]', !rc.is_admin)
    }
    if (type === 'active') {
      formData.append('user[active]', !rc.is_active)
    }
    this.props.updateUser(this.props.token, rc.id, formData)
  }


  render() {

    const columns = [{
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width:150,
      render: link => link ? <img src={`${configs.url}/${link}`} alt="avatar" className='avatar' /> : <Avatar shape="square" size="large" icon="user" />,

    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width:250
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 300
    }, {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      width: 150,
      render: (level, record) =>
        <Select value={level} style={{ width: 120 }} onChange={value => this.handleChangeLevel(value, record)}   >
          <Select.Option value="standard">Standard</Select.Option>
          <Select.Option value="registered">Registered</Select.Option>
          <Select.Option value="agent" >Agent</Select.Option>
          <Select.Option value="staff">Staff</Select.Option>
        </Select>
    },
    {
      title: 'Active',
      dataIndex: 'is_active',
      key: 'active',
      width: 150,
      render: (boolean, record) => <Checkbox onClick={() => this.onClick(record, 'active')} checked={boolean} />
    }, {
      title: 'Admin',
      dataIndex: 'is_admin',
      key: 'admin',
      width:150,
      render: (boolean, record) => <Checkbox onClick={() => this.onClick(record, 'admin')} checked={boolean} />
    }, {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (text, record) => (
        <span>
          <EditUser user={record} />
        </span>
      ),

    }
    ];
    return <Table rowKey={record => record.id} columns={columns} scroll={{ x: 768, y: 500 }} dataSource={this.state.data} onChange={this.handleChange} />
  }
}

export default connect(state => ({
  token: state.auth.token,
  users: state.User.users
}), { getListUsers, updateUser })(User)