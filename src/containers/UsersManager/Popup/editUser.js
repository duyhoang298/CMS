import { Modal, Icon, Divider, Row, Col, Input, Checkbox, Select, Popconfirm, message } from 'antd';
import React from 'react'
import UploadAvatar from '../../../components/upload/UploadAvatar';
import { updateUser, deleteUser, saveDeleteUser } from '../../../redux/actions/user'
import { connect } from 'react-redux'

const { Option } = Select

// const initState = {
//     avatar: '',
//     fileAvatar: ''
// }

class EditUser extends React.Component {
    state = {
        visible: false,
        confirmLoading: false,
    }


    componentDidMount() {
        this.setState({ ...this.props.user });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.user !== nextProps.user) this.setState({ ...nextProps.user });
    }



    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        let { id, email, is_active, is_admin, address, fileAvatar, level } = this.state;
        if(!(email && is_active && is_admin && address && level)) return message.warning('Vui lòng nhập đầy đủ thông tin')
        this.setState({
            confirmLoading: true,
        });

        const formData = new FormData();
        formData.append('user[email]', email);
        formData.append('user[address]', address)
        formData.append('user[level]', level)
        if (fileAvatar) formData.append('user[avatar_path]', fileAvatar)
        formData.append('user[admin]', is_admin)
        formData.append('user[active]', is_active)

        this.props.updateUser(this.props.token, id, formData, (err, res) => {
            this.setState({
                confirmLoading: false,
                visible: false
            });
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
            ...this.props.user,
            fileAvatar: ''
        });
    }





    onHandleChange = e => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        }, () => {
            console.log(this.state);
        });
    }


    getAvatar = avatar => {
        this.setState({ fileAvatar: avatar })
    }


    handleChange = value => {
        this.setState({ level: value });
    }

    deleteUser = () => {
        this.props.deleteUser(this.props.token, this.state.id, (err, res) => {
            if (err) {
                return message.error('Xóa thất bại')
            }
            message.success('Xóa thành công');
            this.props.saveDeleteUser(this.state.id)
        })
    }

    render() {
        // const { user } = this.props
        const { visible, confirmLoading, address, is_active, is_admin, email } = this.state;
        return (
            <div>
                <Icon type="edit" onClick={this.showModal} style={{ cursor: 'pointer' }} />
                <Divider type="vertical" />

                <Popconfirm
                    title="Bạn chắc chắn muốn xóa?"
                    onConfirm={this.deleteUser}
                    okText="Yes"
                    cancelText="No"
                    placement="topLeft"
                >
                    <Icon type="close" style={{ cursor: 'pointer' }} />
                </Popconfirm>
                <Modal title="Edit"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Email</Col>
                        <Col span={16}> <Input placeholder="Email" name='email' value={email} onChange={this.onHandleChange} /></Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Địa chỉ</Col>
                        <Col span={16}> <Input placeholder="Address" name='address' value={address} onChange={this.onHandleChange} /></Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Level</Col>
                        <Col span={16}>
                            <Select value={this.state.level} style={{ width: 120 }} onChange={this.handleChange}>
                                <Option value="standard">Standard</Option>
                                <Option value="registered">Registered</Option>
                                <Option value="agent" >Agent</Option>
                                <Option value="staff">Staff</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Quyền Admin</Col>
                        <Col span={16}><Checkbox name='is_admin' onChange={this.onHandleChange} checked={is_admin} /> </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Active</Col>
                        <Col span={16}><Checkbox name='is_active' onChange={this.onHandleChange} checked={is_active} /> </Col>
                    </Row>

                    <UploadAvatar
                        avatar={this.state.avatar}
                        id={this.state.id}
                        getAvatar={this.getAvatar}
                        fileAvatar={this.state.fileAvatar}
                    />
                </Modal>
            </div>
        );
    }
}

export default connect(state => ({
    token: state.auth.token
}), { updateUser, deleteUser, saveDeleteUser })(EditUser)

