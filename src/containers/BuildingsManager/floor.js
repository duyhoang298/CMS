import React, { Component } from 'react';
import { Row, Modal, Icon, Input, message } from 'antd'
import BtnAddCondo from './Popup/Condo/addCondo';
import BtnEditCondo from './Popup/Condo/editCondo';
import { connect } from 'react-redux'
import { editFloor } from '../../redux/actions/building'
class Floor extends Component {

    state = {
        condos: [],
        visible: false,
        confirmLoading: false
    }
    //modal floor
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        if (!(this.state.nameFloor)) return message.warning('Vui lòng nhập đầy đủ thông tin')
        this.setState({ confirmLoading: true });
        this.props.editFloor(this.props.token, this.state.nameFloor, this.props.floor.id, (err, res) => {
            if (!err) this.setState({ nameFloor: res.data.name })
            this.setState({ confirmLoading: false, visible: false })



        })
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            nameFloor: this.props.floor.name
        });
    }

    componentDidMount() {
        this.setState({ condos: this.props.condos, nameFloor: this.props.floor.name })

    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.condos !== this.props.condos) {
            this.setState({ condos: nextProps.condos })
        }
        if (nextProps.floor.name !== this.props.floor.name) {
            this.setState({ nameFloor: nextProps.floor.name });
        }


    }

    onChangeFloor = e => {
        this.setState({
            nameFloor: e.target.value
        })

    }

    showCondo = (floor_id) => {
        let result = null
        if (this.state.condos && this.state.condos.length > 0)
            result = this.state.condos.map((condo, index) => {
                if (condo.floor_id === floor_id)
                    return <BtnEditCondo condo={condo} key={index} floor={this.props.floor} />
                else return null
            })

        return result
    }

    render() {
        return (
            <div className='floor '>
                <h2 style={{ cursor: 'pointer' }} >
                    <div  onClick={this.showModal}>
                        <Icon type="edit" style={{ fontSize: 16 }} ></Icon>
                        {this.props.floor.name}
                    </div>
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        confirmLoading={this.state.confirmLoading}
                    >
                        Tên: <Input onChange={this.onChangeFloor} value={this.state.nameFloor} name='nameFloor' />
                    </Modal>

                    {/* {!this.state.visible && this.state.nameFloor} */}
                </h2>
                <h3 style={{ display: 'flex', justifyContent: 'center' }} >
                    <BtnAddCondo floor={this.props.floor} />

                </h3>

                <Row  >
                    {this.showCondo(this.props.floor.id)}
                </Row>
            </div>
        );
    }
}

export default connect(state => ({
    token: state.auth.token,
    condos: state.Building.condos
}), { editFloor })(Floor)